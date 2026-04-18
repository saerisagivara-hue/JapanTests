/**
 * Post-dist script: copies out/ to the Electron dist resources folder.
 * electron-builder skips _next/ (leading underscore), so we copy manually.
 *
 * Usage: node scripts/postdist.js
 */

const fs = require("fs");
const path = require("path");

const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "..", "package.json"), "utf-8"));
const distDir = pkg.build?.directories?.output || "dist";
const resourcesDir = path.resolve(distDir, "win-unpacked", "resources");
const outSrc = path.resolve(__dirname, "..", "out");
const outDest = path.join(resourcesDir, "out");

if (!fs.existsSync(outSrc)) {
  console.error("ERROR: out/ folder not found. Run 'npm run build' first.");
  process.exit(1);
}

if (!fs.existsSync(resourcesDir)) {
  console.error("ERROR: dist resources folder not found at", resourcesDir);
  console.error("Run 'npx electron-builder --win --dir' first.");
  process.exit(1);
}

console.log(`Copying out/ -> ${outDest}`);
fs.cpSync(outSrc, outDest, { recursive: true, force: true });

const nextCheck = path.join(outDest, "_next");
if (fs.existsSync(nextCheck)) {
  console.log("_next/ copied successfully - CSS/JS will work!");
} else {
  console.error("WARNING: _next/ still missing after copy!");
}

console.log("Done.");
