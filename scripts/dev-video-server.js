/**
 * Dev video proxy server.
 * Serves MKV/MP4 video files from disk with range-request support.
 * Runs on port 3001 alongside Next.js dev (port 3000).
 */
const express = require("express");
const path = require("path");
const fs = require("fs");

const VIDEO_DIRS = require(path.join(__dirname, "local-video-dirs.cjs"));
const PORT = 3001;

const app = express();

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Range");
  res.setHeader("Access-Control-Expose-Headers", "Content-Range, Content-Length");
  next();
});

function findFileRecursive(dir, filename, depth = 3) {
  const direct = path.join(dir, filename);
  if (fs.existsSync(direct)) return direct;
  if (depth <= 0) return null;
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const found = findFileRecursive(path.join(dir, entry.name), filename, depth - 1);
        if (found) return found;
      }
    }
  } catch { /* ignore */ }
  return null;
}

function extractEpisodeKey(filename) {
  const lower = filename.toLowerCase().replace(/\.[^.]+$/, "");
  const m =
    lower.match(/s(\d+)e(\d+)/) ||
    lower.match(/season\s*(\d+).*?(?:ep?|episode)\s*(\d+)/) ||
    lower.match(/(\d+)x(\d+)/);
  if (m) return `s${m[1].padStart(2, "0")}e${m[2].padStart(2, "0")}`;
  const e = lower.match(/[\s_\-.]e(?:p(?:isode)?)?\s*(\d+)/);
  if (e) return `e${e[1].padStart(2, "0")}`;
  const trailingNum = lower.match(/[\s_\-.](\d{1,3})(?:[\s_\-.\[]|$)/);
  if (trailingNum) return `e${trailingNum[1].padStart(2, "0")}`;
  return null;
}

function extractSeriesKey(filename) {
  const lower = filename.toLowerCase();
  if (/boku.no.hero|hero.academia|boku_no_hero/i.test(lower)) return "mha";
  if (/beastars/i.test(lower)) return "beastars";
  if (/kimetsu|yaiba/i.test(lower)) return "kny";
  if (/jujutsu|kaisen/i.test(lower)) return "jjk";
  return null;
}

function episodeKeysMatch(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  return a.replace(/^s\d+/, "") === b.replace(/^s\d+/, "");
}

function searchForEpisode(dir, seriesKey, epKey, depth) {
  if (depth <= 0) return null;
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = searchForEpisode(fullPath, seriesKey, epKey, depth - 1);
        if (found) return found;
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext !== ".mkv" && ext !== ".mp4") continue;
        const fileEp = extractEpisodeKey(entry.name);
        if (!episodeKeysMatch(fileEp, epKey)) continue;
        if (seriesKey) {
          const fileSeries = extractSeriesKey(entry.name);
          if (fileSeries && fileSeries !== seriesKey) continue;
        }
        return fullPath;
      }
    }
  } catch { /* permission error */ }
  return null;
}

function findVideoFile(filename) {
  for (const dir of VIDEO_DIRS) {
    const exact = findFileRecursive(dir, filename);
    if (exact) return exact;
  }
  const epKey = extractEpisodeKey(filename);
  const seriesKey = extractSeriesKey(filename);
  if (epKey) {
    for (const dir of VIDEO_DIRS) {
      const found = searchForEpisode(dir, seriesKey, epKey, 3);
      if (found) return found;
    }
  }
  return null;
}

function serveVideo(filename, req, res) {
  const filePath = findVideoFile(filename);
  if (!filePath) {
    console.error("Not found:", filename);
    res.status(404).send("Video not found: " + filename);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  const mimeTypes = {
    ".mp4": "video/mp4", ".webm": "video/webm",
    ".mkv": "video/x-matroska", ".avi": "video/x-msvideo",
    ".mov": "video/quicktime", ".wmv": "video/x-ms-wmv",
  };
  const contentType = mimeTypes[ext] || "video/mp4";

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const stream = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": contentType,
    });
    stream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": fileSize,
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
    });
    fs.createReadStream(filePath).pipe(res);
  }
}

app.get("/local-video/:filename", (req, res) => {
  serveVideo(decodeURIComponent(req.params.filename), req, res);
});

app.get("/bs-video/:filename", (req, res) => {
  serveVideo(decodeURIComponent(req.params.filename), req, res);
});

app.get("/jjk-video/:filename", (req, res) => {
  serveVideo(decodeURIComponent(req.params.filename), req, res);
});

app.get("/user-video/:id", (req, res) => {
  res.status(404).send("User videos only available in Electron desktop app.");
});

app.listen(PORT, () => {
  console.log(`Video proxy running on http://localhost:${PORT}`);
  console.log(`Serving from: ${VIDEO_DIRS.join(", ")}`);
  console.log(`ffmpeg: ${FFMPEG_PATH}`);
});
