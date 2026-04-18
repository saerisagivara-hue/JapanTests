/**
 * After uploading to archive.org, run this script to update
 * all lesson files — replacing /local-video/ paths with
 * direct archive.org download URLs.
 *
 * Usage: node scripts/update-video-urls.js
 */

const fs = require("fs");
const path = require("path");

const ARCHIVE_MAP = {
  "mha": "japanese-trainer-mha-s01",
  "beastars": "japanese-trainer-beastars-s01",
  "jjk": "japanese-trainer-jjk-s01",
  "kny": "japanese-trainer-kny-s01",
};

const FILES_TO_UPDATE = [
  path.resolve(__dirname, "..", "lib", "mha-lessons.ts"),
  path.resolve(__dirname, "..", "lib", "beastars-lessons.ts"),
  path.resolve(__dirname, "..", "lib", "jjk-lessons.ts"),
  path.resolve(__dirname, "..", "lib", "kny-lessons.ts"),
];

let totalReplacements = 0;

for (const filePath of FILES_TO_UPDATE) {
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${filePath} not found`);
    continue;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  let replacements = 0;

  // Detect which series this file belongs to
  const basename = path.basename(filePath);
  let archiveId = null;
  if (basename.includes("mha")) archiveId = ARCHIVE_MAP.mha;
  else if (basename.includes("beastars")) archiveId = ARCHIVE_MAP.beastars;
  else if (basename.includes("jjk")) archiveId = ARCHIVE_MAP.jjk;
  else if (basename.includes("kny")) archiveId = ARCHIVE_MAP.kny;

  if (!archiveId) {
    console.log(`SKIP: cannot determine series for ${basename}`);
    continue;
  }

  // Replace /local-video/ENCODED_FILENAME with archive.org URL
  content = content.replace(
    /\/local-video\/([^"]+)/g,
    (match, encodedFilename) => {
      const filename = decodeURIComponent(encodedFilename);
      const archiveUrl = `https://archive.org/download/${archiveId}/${encodeURIComponent(filename)}`;
      replacements++;
      return archiveUrl;
    }
  );

  if (replacements > 0) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Updated ${basename}: ${replacements} URLs replaced`);
    totalReplacements += replacements;
  } else {
    console.log(`No changes needed in ${basename}`);
  }
}

console.log(`\nTotal: ${totalReplacements} video URLs updated to archive.org`);
console.log(`\nNow run 'npm run build' to rebuild the app.`);
