// Minimal static file server for previewing dist/ (dev only).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '../dist');
const PORT = process.env.PORT || 4321;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.xml': 'application/xml',
  '.txt': 'text/plain',
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  let file = path.join(ROOT, p);
  if (!fs.existsSync(file)) {
    if (fs.existsSync(file + '.html')) file += '.html';
    else if (fs.existsSync(path.join(file, 'index.html'))) file = path.join(file, 'index.html');
    else { res.writeHead(404, { 'Content-Type': 'text/html' }); res.end(fs.readFileSync(path.join(ROOT, '404.html'))); return; }
  }
  const ext = path.extname(file);
  res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
}).listen(PORT, () => console.log(`Preview on http://localhost:${PORT}`));
