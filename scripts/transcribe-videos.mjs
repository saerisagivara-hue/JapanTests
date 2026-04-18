/**
 * Transcribe video files using Groq's free Whisper API.
 * 
 * Usage:
 *   node scripts/transcribe-videos.mjs <GROQ_API_KEY>
 * 
 * Get a free key at https://console.groq.com/keys
 */

import { execFileSync } from "child_process";
import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const FFMPEG = require("ffmpeg-static");

const GROQ_KEY = process.argv[2];
if (!GROQ_KEY) {
  console.error("Usage: node scripts/transcribe-videos.mjs <GROQ_API_KEY>");
  console.error("Get a free key at https://console.groq.com/keys");
  process.exit(1);
}

const PUBLIC_VIDEOS = path.join(__dirname, "..", "public", "videos");
const TMP_DIR = path.join(__dirname, "..", ".transcribe-tmp");

const VIDEOS = [
  { file: "n5-hiragana-song.mp4", lessonId: "n5-hiragana-song" },
  { file: "n5-katakana-song.mp4", lessonId: "n5-katakana-song" },
  { file: "narezki-34.mp4", lessonId: "n5-narezki-mini-dialogue" },
  { file: "narezki-35.mp4", lessonId: "n5-narezki-everyday-words" },
  { file: "narezki-36.mp4", lessonId: "n4-narezki-short-story" },
  { file: "narezki-37.mp4", lessonId: "n4-narezki-daily-life" },
  { file: "narezki-38.mp4", lessonId: "n4-narezki-conversation" },
  { file: "narezki-39.mp4", lessonId: "n3-narezki-interview" },
  { file: "narezki-40.mp4", lessonId: "n3-narezki-discussion" },
  { file: "narezki-41.mp4", lessonId: "n3-narezki-long-story" },
  { file: "narezki-42.mp4", lessonId: "n2-narezki-advanced-talk" },
  { file: "narezki-43.mp4", lessonId: "n2-narezki-long-listening" },
];

if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

function getDuration(videoPath) {
  try {
    execFileSync(FFMPEG, ["-i", videoPath], { encoding: "utf-8", stdio: ["pipe", "pipe", "pipe"] });
  } catch (e) {
    const out = (e.stderr || "") + (e.stdout || "");
    const m = out.match(/Duration:\s*(\d+):(\d+):(\d+)\.(\d+)/);
    if (!m) return 0;
    return parseInt(m[1]) * 3600 + parseInt(m[2]) * 60 + parseInt(m[3]) + parseInt(m[4]) / 100;
  }
  return 0;
}

function extractAudio(videoPath, outPath, startSec, durationSec) {
  const args = ["-y", "-ss", String(startSec), "-i", videoPath];
  if (durationSec) args.push("-t", String(durationSec));
  args.push("-vn", "-acodec", "libmp3lame", "-ab", "64k", "-ar", "16000", "-ac", "1", outPath);
  execFileSync(FFMPEG, args, { stdio: "pipe" });
}

async function transcribeFile(audioPath) {
  const form = new FormData();
  const audioData = fs.readFileSync(audioPath);
  form.append("file", new Blob([audioData], { type: "audio/mpeg" }), path.basename(audioPath));
  form.append("model", "whisper-large-v3");
  form.append("language", "ja");
  form.append("response_format", "verbose_json");
  form.append("timestamp_granularities[]", "segment");

  const resp = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
    method: "POST",
    headers: { Authorization: `Bearer ${GROQ_KEY}` },
    body: form,
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Groq API error ${resp.status}: ${errText}`);
  }

  return resp.json();
}

function segmentsToSubtitles(segments, offsetSec = 0) {
  return segments.map((seg) => ({
    startSec: Math.round((seg.start + offsetSec) * 10) / 10,
    endSec: Math.round((seg.end + offsetSec) * 10) / 10,
    ja: seg.text.trim(),
    furigana: seg.text.trim(),
  }));
}

async function processVideo(video) {
  const videoPath = path.join(PUBLIC_VIDEOS, video.file);
  if (!fs.existsSync(videoPath)) {
    console.error(`  SKIP: ${video.file} not found`);
    return null;
  }

  const duration = getDuration(videoPath);
  console.log(`  Duration: ${Math.round(duration)}s`);

  const fileSizeMB = fs.statSync(videoPath).size / (1024 * 1024);
  const SEGMENT_DURATION = 600; // 10 minutes
  const MAX_AUDIO_SIZE_MB = 24;

  let allSubtitles = [];

  if (fileSizeMB <= MAX_AUDIO_SIZE_MB && duration <= SEGMENT_DURATION) {
    const audioPath = path.join(TMP_DIR, video.file.replace(/\.\w+$/, ".mp3"));
    console.log(`  Extracting audio...`);
    extractAudio(videoPath, audioPath, 0, null);
    
    const audioSize = fs.statSync(audioPath).size / (1024 * 1024);
    console.log(`  Audio size: ${audioSize.toFixed(1)} MB`);
    
    console.log(`  Transcribing...`);
    const result = await transcribeFile(audioPath);
    if (result.segments) {
      allSubtitles = segmentsToSubtitles(result.segments);
    }
  } else {
    const numSegments = Math.ceil(duration / SEGMENT_DURATION);
    console.log(`  Splitting into ${numSegments} segments...`);

    for (let i = 0; i < numSegments; i++) {
      const startSec = i * SEGMENT_DURATION;
      const segDuration = Math.min(SEGMENT_DURATION, duration - startSec);
      const audioPath = path.join(TMP_DIR, video.file.replace(/\.\w+$/, `_part${i}.mp3`));

      console.log(`  Segment ${i + 1}/${numSegments}: ${startSec}s - ${startSec + segDuration}s`);
      extractAudio(videoPath, audioPath, startSec, segDuration);

      const audioSize = fs.statSync(audioPath).size / (1024 * 1024);
      console.log(`    Audio size: ${audioSize.toFixed(1)} MB`);

      console.log(`    Transcribing...`);
      await new Promise((r) => setTimeout(r, 3500));
      const result = await transcribeFile(audioPath);
      if (result.segments) {
        allSubtitles.push(...segmentsToSubtitles(result.segments, startSec));
      }
    }
  }

  console.log(`  Got ${allSubtitles.length} subtitle lines`);
  return allSubtitles;
}

async function main() {
  const results = {};

  for (const video of VIDEOS) {
    console.log(`\n=== ${video.file} (${video.lessonId}) ===`);
    try {
      const subs = await processVideo(video);
      if (subs && subs.length > 0) {
        results[video.lessonId] = subs;
      }
      await new Promise((r) => setTimeout(r, 3500));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
    }
  }

  const outPath = path.join(TMP_DIR, "transcriptions.json");
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\nSaved transcriptions to ${outPath}`);
  console.log(`Total lessons transcribed: ${Object.keys(results).length}`);

  // Cleanup tmp audio files
  for (const f of fs.readdirSync(TMP_DIR)) {
    if (f.endsWith(".mp3")) fs.unlinkSync(path.join(TMP_DIR, f));
  }
}

main().catch(console.error);
