/**
 * Apply transcribed subtitles from transcriptions.json to lesson files.
 * 
 * Usage: node scripts/apply-subtitles.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TMP_DIR = path.join(__dirname, "..", ".transcribe-tmp");
const LIB_DIR = path.join(__dirname, "..", "lib");

const transcriptionsPath = path.join(TMP_DIR, "transcriptions.json");
if (!fs.existsSync(transcriptionsPath)) {
  console.error("transcriptions.json not found. Run transcribe-videos.mjs first.");
  process.exit(1);
}

const transcriptions = JSON.parse(fs.readFileSync(transcriptionsPath, "utf-8"));

const LESSON_FILES = {
  "n5-hiragana-song": "content.ts",
  "n5-katakana-song": "content.ts",
  "n5-narezki-mini-dialogue": "narezki-new-lessons.ts",
  "n5-narezki-everyday-words": "narezki-new-lessons.ts",
  "n4-narezki-short-story": "narezki-new-lessons.ts",
  "n4-narezki-daily-life": "narezki-new-lessons.ts",
  "n4-narezki-conversation": "narezki-new-lessons.ts",
  "n3-narezki-interview": "narezki-new-lessons.ts",
  "n3-narezki-discussion": "narezki-new-lessons.ts",
  "n3-narezki-long-story": "narezki-new-lessons.ts",
  "n2-narezki-advanced-talk": "narezki-new-lessons.ts",
  "n2-narezki-long-listening": "narezki-new-lessons.ts",
};

function formatSubtitles(subs) {
  return subs
    .map(
      (s) =>
        `      { startSec: ${s.startSec}, endSec: ${s.endSec}, ja: ${JSON.stringify(s.ja)}, furigana: ${JSON.stringify(s.furigana)} },`
    )
    .join("\n");
}

const filesModified = new Set();

for (const [lessonId, subs] of Object.entries(transcriptions)) {
  const fileName = LESSON_FILES[lessonId];
  if (!fileName) {
    console.log(`Skip ${lessonId}: no mapping`);
    continue;
  }

  const filePath = path.join(LIB_DIR, fileName);
  let content = fs.readFileSync(filePath, "utf-8");

  const idPattern = `id: "${lessonId}"`;
  const idIdx = content.indexOf(idPattern);
  if (idIdx === -1) {
    console.log(`Skip ${lessonId}: id not found in ${fileName}`);
    continue;
  }

  const afterId = content.substring(idIdx);
  const emptySubsMatch = afterId.match(/subtitles:\s*\[\s*\]/);
  if (!emptySubsMatch) {
    console.log(`Skip ${lessonId}: subtitles not empty in ${fileName}`);
    continue;
  }

  const absPos = idIdx + emptySubsMatch.index;
  const matchLen = emptySubsMatch[0].length;
  const replacement = `subtitles: [\n${formatSubtitles(subs)}\n    ]`;

  content = content.substring(0, absPos) + replacement + content.substring(absPos + matchLen);
  fs.writeFileSync(filePath, content, "utf-8");
  filesModified.add(fileName);
  console.log(`Updated ${lessonId} in ${fileName} (${subs.length} lines)`);
}

console.log(`\nFiles modified: ${[...filesModified].join(", ")}`);
