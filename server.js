/**
 * HTTPS dev server for Next.js
 * Requires SSL certs in https_cert/ (run: npm run cert)
 */
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const certDir = path.join(__dirname, "https_cert");
const keyPath = path.join(certDir, "localhost-key.pem");
const certPath = path.join(certDir, "localhost.pem");

if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
  console.error(`
⚠️  SSL certificates not found!

Create them with mkcert:

  1. Install mkcert: https://github.com/FiloSottile/mkcert#installation
     Windows: choco install mkcert

  2. Trust the CA:  mkcert -install

  3. Generate certs:  npm run cert

Then run:  npm run dev:https
`);
  process.exit(1);
}

const httpsOptions = {
  key: fs.readFileSync(keyPath),
  cert: fs.readFileSync(certPath),
};

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`\n✓ Ready on https://localhost:${port}\n`);
  });
});
