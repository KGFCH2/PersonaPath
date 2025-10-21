const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const staticDir = path.join(__dirname, 'static');
const templatesDir = path.join(__dirname, 'templates');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const item of fs.readdirSync(src)) {
    const s = path.join(src, item);
    const d = path.join(dest, item);
    if (fs.statSync(s).isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// Clean public
if (fs.existsSync(publicDir)) {
  fs.rmSync(publicDir, { recursive: true, force: true });
}
fs.mkdirSync(publicDir);

// Copy static and templates
if (fs.existsSync(staticDir)) copyDir(staticDir, path.join(publicDir, 'static'));
if (fs.existsSync(templatesDir)) copyDir(templatesDir, path.join(publicDir));

console.log('Built public/ folder for Vercel');
