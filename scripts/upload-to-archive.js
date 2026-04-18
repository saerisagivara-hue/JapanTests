/**
 * Upload anime videos to Internet Archive.
 *
 * Prerequisites:
 *   1. Create free account at https://archive.org/account/signup
 *   2. Get API keys at https://archive.org/account/s3.php
 *   3. Run: ia configure  (enter your email + S3 keys)
 *   4. Then run this script: node scripts/upload-to-archive.js
 *
 * After upload, run: node scripts/update-video-urls.js
 * to update all lesson files with archive.org URLs.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const IA = "C:\\Users\\saeri\\AppData\\Local\\Python\\pythoncore-3.14-64\\Scripts\\ia.exe";

const SERIES = [
  {
    id: "japanese-trainer-mha-s01",
    title: "Japanese Trainer - MHA S01 (Learning Japanese)",
    dir: "C:\\Users\\saeri\\Downloads\\[FLE] Boku no Hero Academia - S01v2 (BD 1080p HEVC Opus) [Dual Audio]",
    filter: ".mkv",
  },
  {
    id: "japanese-trainer-beastars-s01",
    title: "Japanese Trainer - Beastars S01 (Learning Japanese)",
    dir: "C:\\Users\\saeri\\Downloads\\[Erai-raws] Beastars - 01 ~ 12 [1080p][Multiple Subtitle]",
    filter: ".mkv",
  },
  {
    id: "japanese-trainer-jjk-s01",
    title: "Japanese Trainer - JJK S01 (Learning Japanese)",
    dir: "C:\\Users\\saeri\\Downloads\\[Erai-raws] Jujutsu Kaisen - 01 ~ 24 [1080p][Multiple Subtitle]",
    filter: ".mkv",
  },
  {
    id: "japanese-trainer-kny-s01",
    title: "Japanese Trainer - Kimetsu no Yaiba S01 (Learning Japanese)",
    dir: "C:\\Users\\saeri\\Downloads\\[Erai-raws] Kimetsu no Yaiba - 01 ~ 26 [1080p][HEVC][Multiple Subtitle]",
    filter: ".mkv",
  },
];

for (const series of SERIES) {
  console.log(`\n========================================`);
  console.log(`Uploading: ${series.title}`);
  console.log(`From: ${series.dir}`);
  console.log(`To: https://archive.org/details/${series.id}`);
  console.log(`========================================\n`);

  if (!fs.existsSync(series.dir)) {
    console.log(`SKIP: directory not found`);
    continue;
  }

  const files = fs.readdirSync(series.dir)
    .filter((f) => f.endsWith(series.filter))
    .sort();

  if (files.length === 0) {
    console.log(`SKIP: no ${series.filter} files found`);
    continue;
  }

  console.log(`Found ${files.length} files to upload`);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(series.dir, file);
    const sizeMB = Math.round(fs.statSync(filePath).size / 1024 / 1024);

    console.log(`\n[${i + 1}/${files.length}] ${file} (${sizeMB} MB)`);

    try {
      const cmd = `"${IA}" upload "${series.id}" "${filePath}" --metadata="collection:opensource" --metadata="mediatype:movies" --metadata="title:${series.title}" --metadata="subject:japanese;learning;anime" --no-derive`;
      console.log(`Running: ia upload ...`);
      execSync(cmd, { stdio: "inherit", timeout: 3600000 });
      console.log(`OK: ${file} uploaded`);
    } catch (err) {
      console.error(`FAIL: ${file} — ${err.message}`);
    }
  }

  console.log(`\nDone: ${series.id}`);
  console.log(`URL: https://archive.org/download/${series.id}/`);
}

console.log(`\n\nAll uploads complete!`);
console.log(`\nNext step: run 'node scripts/update-video-urls.js' to update lesson files.`);
