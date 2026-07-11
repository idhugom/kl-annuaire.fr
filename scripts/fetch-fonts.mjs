// Download self-hosted variable fonts (latin + latin-ext subsets) from Google Fonts.
import fs from 'node:fs/promises';
import path from 'node:path';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const OUT = path.resolve(import.meta.dirname, '../public/fonts');

const families = [
  {
    name: 'Fraunces',
    file: 'fraunces',
    css: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,300..900,0..100,0..1&display=swap',
  },
  { name: 'Inter', file: 'inter', css: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap' },
  {
    name: 'SpaceGrotesk',
    file: 'space-grotesk',
    css: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap',
  },
];

async function get(url, bin = false) {
  const r = await fetch(url, { headers: { 'user-agent': UA } });
  if (!r.ok) throw new Error(`HTTP ${r.status} ${url}`);
  return bin ? Buffer.from(await r.arrayBuffer()) : await r.text();
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  for (const fam of families) {
    const css = await get(fam.css);
    // Split into per-subset @font-face blocks preceded by /* subset */ comments
    const blocks = css.split('/*').slice(1);
    for (const b of blocks) {
      const subset = b.slice(0, b.indexOf('*/')).trim();
      if (subset !== 'latin' && subset !== 'latin-ext') continue;
      const m = b.match(/url\((https:[^)]+\.woff2)\)/);
      if (!m) continue;
      const buf = await get(m[1], true);
      const fname = `${fam.file}-${subset}.woff2`;
      await fs.writeFile(path.join(OUT, fname), buf);
      console.log(`${fam.name} ${subset}: ${(buf.length / 1024).toFixed(1)}KB -> ${fname}`);
    }
  }
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
