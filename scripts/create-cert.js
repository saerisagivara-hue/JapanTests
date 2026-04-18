/**
 * Creates SSL certificates for local HTTPS using mkcert.
 * Run: npm run cert
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const certDir = path.join(__dirname, "..", "https_cert");
const keyPath = path.join(certDir, "localhost-key.pem");
const certPath = path.join(certDir, "localhost.pem");

if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

try {
  execSync(
    `mkcert -key-file "${keyPath}" -cert-file "${certPath}" localhost 127.0.0.1`,
    { stdio: "inherit" }
  );
  console.log("\n✓ Certificates created in https_cert/\nRun: npm run dev:https\n");
} catch (err) {
  console.error(`
mkcert not found. Install it first:

  Windows (Chocolatey):  choco install mkcert
  Windows (Scoop):       scoop install mkcert
  Windows (manual):      https://github.com/FiloSottile/mkcert/releases

Then run:  mkcert -install
Then:      npm run cert
`);
  process.exit(1);
}
