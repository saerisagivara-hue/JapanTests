const fs = require("fs");
const path = require("path");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
if (!basePath) {
  console.log("No NEXT_PUBLIC_BASE_PATH set, skipping path fixes.");
  process.exit(0);
}

const outDir = path.join(__dirname, "..", "out");

function walkDir(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, callback);
    else callback(full);
  }
}

let fixedFiles = 0;

walkDir(outDir, (filePath) => {
  if (!filePath.endsWith(".html")) return;

  let content = fs.readFileSync(filePath, "utf-8");
  const original = content;

  content = content.replace(/(src)="\/(?!\/)/g, `$1="${basePath}/`);
  content = content.replace(/srcSet="\/(?!\/)/g, `srcSet="${basePath}/`);

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    fixedFiles++;
  }
});

console.log(`Fixed asset paths in ${fixedFiles} HTML files (basePath=${basePath}).`);
