const { app, BrowserWindow, session, systemPreferences, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const express = require("express");

// ── ffmpeg path ──
function getFFmpegPath() {
  try { return require("ffmpeg-static"); } catch {}
  const builtIn = path.join(process.resourcesPath || "", "ffmpeg.exe");
  if (fs.existsSync(builtIn)) return builtIn;
  return "ffmpeg";
}

// ── Video directories (dynamic — user can add via settings) ──

const videoDirsConfigPath = path.join(app.getPath("userData"), "video-dirs.json");

function loadVideoDirsConfig() {
  try {
    if (fs.existsSync(videoDirsConfigPath)) {
      return JSON.parse(fs.readFileSync(videoDirsConfigPath, "utf-8"));
    }
  } catch { /* ignore */ }
  return [];
}

function saveVideoDirsConfig(dirs) {
  fs.writeFileSync(videoDirsConfigPath, JSON.stringify(dirs, null, 2), "utf-8");
}

function getVideoDirs() {
  const dirs = [];

  // 1. Bundled videos in resources/
  if (process.resourcesPath) {
    const bundledRoot = path.join(process.resourcesPath, "videos");
    for (const sub of ["mha", "beastars", "jjk", "kny"]) {
      const d = path.join(bundledRoot, sub);
      if (fs.existsSync(d)) dirs.push(d);
    }
  }

  // 2. User-configured directories (saved in userData)
  for (const d of loadVideoDirsConfig()) {
    if (!dirs.includes(d) && fs.existsSync(d)) dirs.push(d);
  }

  // 3. Dev fallback from local-video-dirs.cjs
  try {
    const localDirs = require(path.join(__dirname, "..", "scripts", "local-video-dirs.cjs"));
    for (const d of localDirs) {
      if (!dirs.includes(d) && fs.existsSync(d)) dirs.push(d);
    }
  } catch { /* ignore */ }

  return dirs;
}

let VIDEO_DIRS = getVideoDirs();

// ── Fuzzy video file matching ──

function findFileRecursiveGlobal(dir, filename, depth = 3) {
  const direct = path.join(dir, filename);
  if (fs.existsSync(direct)) return direct;
  if (depth <= 0) return null;
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        const found = findFileRecursiveGlobal(path.join(dir, entry.name), filename, depth - 1);
        if (found) return found;
      }
    }
  } catch { /* permission errors */ }
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
  const aEp = a.replace(/^s\d+/, "");
  const bEp = b.replace(/^s\d+/, "");
  return aEp === bEp;
}

function searchForEpisodeInDir(dir, seriesKey, epKey, depth) {
  if (depth <= 0) return null;
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = searchForEpisodeInDir(fullPath, seriesKey, epKey, depth - 1);
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

function findVideoFuzzyGlobal(dirs, filename) {
  for (const dir of dirs) {
    const exact = findFileRecursiveGlobal(dir, filename);
    if (exact) return exact;
  }

  const epKey = extractEpisodeKey(filename);
  const seriesKey = extractSeriesKey(filename);
  if (!epKey) return null;

  for (const dir of dirs) {
    const found = searchForEpisodeInDir(dir, seriesKey, epKey, 3);
    if (found) return found;
  }
  return null;
}

app.commandLine.appendSwitch("autoplay-policy", "no-user-gesture-required");
app.commandLine.appendSwitch("enable-media-stream");
app.commandLine.appendSwitch("use-fake-ui-for-media-stream");
app.commandLine.appendSwitch("enable-features", "PlatformHEVCDecoderSupport,PlatformHEVCEncoderSupport");

let mainWindow;
let server;

// ── Config (whisper key, etc.) ──

const configPath = path.join(app.getPath("userData"), "whisper-config.json");

function loadConfig() {
  try {
    if (fs.existsSync(configPath)) return JSON.parse(fs.readFileSync(configPath, "utf-8"));
  } catch { /* ignore */ }
  return {};
}

function saveConfig(data) {
  const current = loadConfig();
  fs.writeFileSync(configPath, JSON.stringify({ ...current, ...data }), "utf-8");
}

ipcMain.handle("whisper:getKey", () => {
  const cfg = loadConfig();
  return cfg.openaiKey || "";
});

ipcMain.handle("whisper:setKey", (_event, key) => {
  saveConfig({ openaiKey: key });
  return true;
});

ipcMain.handle("whisper:transcribe", async (_event, audioBase64) => {
  const cfg = loadConfig();
  const apiKey = cfg.openaiKey;
  if (!apiKey) return { error: "NO_KEY", text: "" };

  try {
    const audioBuffer = Buffer.from(audioBase64, "base64");

    const boundary = "----WhisperBoundary" + Date.now();
    const disposition = `Content-Disposition: form-data; name="file"; filename="audio.webm"`;
    const fileHeader = `--${boundary}\r\n${disposition}\r\nContent-Type: audio/webm\r\n\r\n`;
    const modelPart = `\r\n--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\nwhisper-1`;
    const langPart = `\r\n--${boundary}\r\nContent-Disposition: form-data; name="language"\r\n\r\nja`;
    const tail = `\r\n--${boundary}--\r\n`;

    const body = Buffer.concat([
      Buffer.from(fileHeader, "utf-8"),
      audioBuffer,
      Buffer.from(modelPart + langPart + tail, "utf-8"),
    ]);

    const resp = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
      body,
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Whisper API error:", resp.status, errText);
      if (resp.status === 401) return { error: "INVALID_KEY", text: "" };
      return { error: "API_ERROR", text: errText };
    }

    const data = await resp.json();
    return { error: null, text: data.text || "" };
  } catch (err) {
    console.error("Whisper transcribe error:", err);
    return { error: "NETWORK", text: "" };
  }
});

// ── Auto-transcription: extract audio + Groq Whisper ──

const GROQ_WHISPER_URL = "https://api.groq.com/openai/v1/audio/transcriptions";

ipcMain.handle("autoTranscribe:run", async (_event, videoFilePath, groqKey) => {
  if (!groqKey) return { error: "NO_KEY", subtitles: [] };
  if (!fs.existsSync(videoFilePath)) return { error: "FILE_NOT_FOUND", subtitles: [] };

  const ffmpegPath = getFFmpegPath();
  const tmpDir = path.join(app.getPath("temp"), "jt-transcribe");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
  const audioPath = path.join(tmpDir, `audio_${Date.now()}.mp3`);

  try {
    const { execFileSync } = require("child_process");
    execFileSync(ffmpegPath, [
      "-y", "-i", videoFilePath,
      "-vn", "-acodec", "libmp3lame", "-ab", "64k", "-ar", "16000", "-ac", "1",
      "-map", "0:a:0",
      audioPath,
    ], { stdio: "pipe", timeout: 300000 });
  } catch (err) {
    return { error: "FFMPEG_ERROR: " + (err.stderr?.toString()?.slice(0, 200) || err.message), subtitles: [] };
  }

  const audioSizeMB = fs.statSync(audioPath).size / (1024 * 1024);
  const allSubtitles = [];

  try {
    if (audioSizeMB <= 24) {
      const subs = await callGroqWhisper(audioPath, groqKey, 0);
      allSubtitles.push(...subs);
    } else {
      const { execFileSync } = require("child_process");
      let durOut = "";
      try { execFileSync(ffmpegPath, ["-i", audioPath], { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] }); }
      catch (e) { durOut = (e.stderr || "") + (e.stdout || ""); }
      const dm = durOut.match(/Duration:\s*(\d+):(\d+):(\d+)/);
      const totalSec = dm ? parseInt(dm[1]) * 3600 + parseInt(dm[2]) * 60 + parseInt(dm[3]) : 600;
      const segLen = 600;
      const numSegs = Math.ceil(totalSec / segLen);

      for (let i = 0; i < numSegs; i++) {
        const start = i * segLen;
        const segPath = path.join(tmpDir, `seg_${Date.now()}_${i}.mp3`);
        execFileSync(ffmpegPath, [
          "-y", "-ss", String(start), "-i", audioPath, "-t", String(segLen),
          "-acodec", "libmp3lame", "-ab", "64k", "-ar", "16000", "-ac", "1", segPath,
        ], { stdio: "pipe", timeout: 60000 });
        if (i > 0) await new Promise((r) => setTimeout(r, 3500));
        const subs = await callGroqWhisper(segPath, groqKey, start);
        allSubtitles.push(...subs);
        try { fs.unlinkSync(segPath); } catch {}
      }
    }
  } finally {
    try { fs.unlinkSync(audioPath); } catch {}
  }

  return { error: null, subtitles: allSubtitles };
});

async function callGroqWhisper(audioPath, groqKey, offsetSec) {
  const audioData = fs.readFileSync(audioPath);
  const form = new FormData();
  form.append("file", new Blob([audioData], { type: "audio/mpeg" }), path.basename(audioPath));
  form.append("model", "whisper-large-v3");
  form.append("language", "ja");
  form.append("response_format", "verbose_json");
  form.append("timestamp_granularities[]", "segment");

  const resp = await fetch(GROQ_WHISPER_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${groqKey}` },
    body: form,
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Groq API ${resp.status}: ${errText}`);
  }

  const data = await resp.json();
  if (!data.segments) return [];

  return data.segments.map((seg) => ({
    startSec: Math.round((seg.start + offsetSec) * 10) / 10,
    endSec: Math.round((seg.end + offsetSec) * 10) / 10,
    ja: seg.text.trim(),
    furigana: seg.text.trim(),
  }));
}

// Resolve local video paths for auto-transcription
ipcMain.handle("autoTranscribe:resolveVideoPath", (_event, filename) => {
  return findVideoFuzzyGlobal(VIDEO_DIRS, filename);
});

// Resolve user-uploaded video path by lesson ID
ipcMain.handle("autoTranscribe:resolveUserVideoPath", (_event, lessonId) => {
  const filePath = videoPathMap.get(lessonId);
  if (filePath && fs.existsSync(filePath)) return filePath;
  return null;
});

// Groq key storage (separate from OpenAI)
ipcMain.handle("groqKey:get", () => {
  const cfg = loadConfig();
  return cfg.groqKey || "";
});

ipcMain.handle("groqKey:set", (_event, key) => {
  saveConfig({ groqKey: key });
  return true;
});

// ── User lessons storage ──

const userLessonsPath = path.join(app.getPath("userData"), "user-lessons.json");

function loadUserLessons() {
  try {
    if (fs.existsSync(userLessonsPath)) {
      return JSON.parse(fs.readFileSync(userLessonsPath, "utf-8"));
    }
  } catch { /* ignore */ }
  return [];
}

function saveUserLessons(lessons) {
  fs.writeFileSync(userLessonsPath, JSON.stringify(lessons, null, 2), "utf-8");
}

ipcMain.handle("userLessons:getAll", () => {
  return loadUserLessons();
});

ipcMain.handle("userLessons:save", (_event, lesson) => {
  const lessons = loadUserLessons();
  const idx = lessons.findIndex((l) => l.id === lesson.id);
  if (idx >= 0) {
    lessons[idx] = lesson;
  } else {
    lessons.push(lesson);
  }
  saveUserLessons(lessons);
  return true;
});

ipcMain.handle("userLessons:delete", (_event, lessonId) => {
  const lessons = loadUserLessons();
  const filtered = lessons.filter((l) => l.id !== lessonId);
  saveUserLessons(filtered);
  return true;
});

// ── Video file dialog ──

ipcMain.handle("video:selectFile", async (_event, opts) => {
  const filters = opts?.type === "srt"
    ? [{ name: "Субтитры", extensions: ["srt", "ass", "ssa", "vtt"] }]
    : [{ name: "Видео", extensions: ["mkv", "mp4", "avi", "webm", "mov"] }];

  const result = await dialog.showOpenDialog(mainWindow, {
    title: opts?.type === "srt" ? "Выберите файл субтитров" : "Выберите видеофайл",
    properties: ["openFile"],
    filters,
  });

  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

ipcMain.handle("video:selectMultiple", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Выберите видео и/или субтитры",
    properties: ["openFile", "multiSelections"],
    filters: [
      { name: "Все поддерживаемые", extensions: ["mkv", "mp4", "avi", "webm", "mov", "srt", "ass", "vtt"] },
    ],
  });
  if (result.canceled) return [];
  return result.filePaths;
});

// ── SRT file reading ──

ipcMain.handle("srt:readFile", async (_event, filePath) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return { error: null, content };
  } catch (err) {
    return { error: err.message, content: "" };
  }
});

// ── Anime video directories config (user picks folders) ──

ipcMain.handle("videoDirs:get", () => {
  return loadVideoDirsConfig();
});

ipcMain.handle("videoDirs:getResolved", () => {
  return VIDEO_DIRS;
});

ipcMain.handle("videoDirs:add", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: "Выберите папку с видеофайлами аниме (MKV/MP4)",
    properties: ["openDirectory"],
  });
  if (result.canceled || result.filePaths.length === 0) return null;

  const dir = result.filePaths[0];
  const current = loadVideoDirsConfig();
  if (!current.includes(dir)) {
    current.push(dir);
    saveVideoDirsConfig(current);
    VIDEO_DIRS = getVideoDirs();
  }
  return dir;
});

ipcMain.handle("videoDirs:remove", (_event, dir) => {
  const current = loadVideoDirsConfig().filter((d) => d !== dir);
  saveVideoDirsConfig(current);
  VIDEO_DIRS = getVideoDirs();
  return true;
});

ipcMain.handle("videoDirs:checkFiles", (_event, filenames) => {
  const results = {};
  for (const fn of filenames) {
    results[fn] = !!findVideoFuzzyGlobal(VIDEO_DIRS, fn);
  }
  return results;
});

// Map of registered video paths (for user-uploaded videos)
const videoPathMap = new Map();

ipcMain.handle("video:registerPath", (_event, id, filePath) => {
  videoPathMap.set(id, filePath);
  return true;
});

// ── Window fullscreen ──

ipcMain.handle("window:toggleFullscreen", () => {
  if (!mainWindow) return false;
  const isFs = mainWindow.isFullScreen();
  mainWindow.setFullScreen(!isFs);
  return !isFs;
});

ipcMain.handle("window:isFullscreen", () => {
  if (!mainWindow) return false;
  return mainWindow.isFullScreen();
});

// ── Mic access ──

async function requestSystemMicAccess() {
  if (process.platform === "darwin") {
    const status = systemPreferences.getMediaAccessStatus("microphone");
    if (status !== "granted") {
      await systemPreferences.askForMediaAccess("microphone");
    }
  }
}

// ── Window ──

function createWindow() {
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    const allowed = ["media", "microphone", "geolocation", "audio-capture"];
    callback(allowed.includes(permission));
  });

  session.defaultSession.setPermissionCheckHandler((_webContents, permission) => {
    const allowed = ["media", "microphone", "geolocation", "audio-capture"];
    return allowed.includes(permission);
  });

  let outPath = path.resolve(__dirname, "..", "out");
  if (!fs.existsSync(outPath)) {
    outPath = path.resolve(process.resourcesPath, "out");
  }
  if (!fs.existsSync(outPath)) {
    console.error("Папка out не найдена. Сначала выполните: npm run build");
    app.quit();
    return;
  }

  const nextDir = path.join(outPath, "_next");
  if (!fs.existsSync(nextDir)) {
    console.error("ВНИМАНИЕ: папка _next не найдена в", outPath, "— стили не загрузятся!");
  } else {
    console.log("Папка _next найдена:", nextDir);
  }

  const expressApp = express();

  function serveVideoRaw(filePath, req, res) {
    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      ".mp4": "video/mp4", ".webm": "video/webm",
      ".mkv": "video/x-matroska", ".avi": "video/x-msvideo",
      ".mov": "video/quicktime", ".wmv": "video/x-ms-wmv",
      ".flv": "video/x-flv",
    };
    const contentType = mimeTypes[ext] || "video/mp4";
    const range = req.headers.range;

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

  function serveVideoFromDirs(dirs, filename, req, res) {
    const filePath = findVideoFuzzyGlobal(dirs, filename);
    if (!filePath) {
      console.log("[video] NOT FOUND:", filename, "| searched dirs:", dirs);
      res.status(404).send("Video not found: " + filename);
      return;
    }
    console.log("[video] serving:", filePath);
    serveVideoRaw(filePath, req, res);
  }

  expressApp.get("/local-video/:filename", (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    console.log("[local-video] request:", filename, "| dirs:", VIDEO_DIRS);
    serveVideoFromDirs(VIDEO_DIRS, filename, req, res);
  });

  expressApp.get("/bs-video/:filename", (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    serveVideoFromDirs(VIDEO_DIRS, filename, req, res);
  });

  expressApp.get("/jjk-video/:filename", (req, res) => {
    const filename = decodeURIComponent(req.params.filename);
    serveVideoFromDirs(VIDEO_DIRS, filename, req, res);
  });

  expressApp.get("/user-video/:id", (req, res) => {
    const id = req.params.id;
    const filePath = videoPathMap.get(id);

    if (!filePath || !fs.existsSync(filePath)) {
      res.status(404).send("Video not found");
      return;
    }

    serveVideoRaw(filePath, req, res);
  });

  // Static files (the Next.js build)
  expressApp.use(express.static(outPath));
  expressApp.use((req, res) => {
    const p = req.path.endsWith("/") ? req.path + "index.html" : req.path + "/index.html";
    const filePath = path.join(outPath, p.replace(/^\//, ""));
    res.sendFile(filePath, (err) => {
      if (err) res.sendFile(path.join(outPath, "index.html"));
    });
  });

  server = expressApp.listen(0, "127.0.0.1", () => {
    const port = server.address().port;
    const url = `http://127.0.0.1:${port}/`;

    mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      minWidth: 400,
      minHeight: 500,
      title: "Японский тренажёр",
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
      show: true,
    });

    console.log("Загрузка:", url);
    console.log("Папки видео (local-video):", VIDEO_DIRS.join(" | "));
    mainWindow.loadURL(url).catch((err) => {
      console.error("Ошибка загрузки:", err);
    });

    mainWindow.on("closed", () => {
      mainWindow = null;
      if (server) server.close();
    });
  });

  server.on("error", (err) => {
    console.error("Ошибка сервера:", err);
  });
}

app.whenReady().then(async () => {
  await requestSystemMicAccess();
  createWindow();
});

app.on("window-all-closed", () => {
  if (server) server.close();
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});
