/**
 * Запускает dev-сервер и открывает localhost:3000 в браузере через 6 сек.
 * Запуск: node scripts/dev-with-open.js
 */
const { spawn } = require("child_process");
const { platform } = require("os");
const path = require("path");

const projectDir = path.resolve(__dirname, "..");

const dev = spawn("npx", ["next", "dev"], {
  stdio: "inherit",
  shell: true,
  cwd: projectDir,
});

setTimeout(() => {
  const url = "http://localhost:3000";
  if (platform() === "win32") {
    spawn("cmd", ["/c", "start", "", url], { shell: false, stdio: "ignore" });
  } else {
    spawn("open", [url], { stdio: "ignore" });
  }
  console.log("\nОткрываю", url, "в браузере...\n");
}, 6000);
