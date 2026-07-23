// One-off: generate featured images via OpenAI (gpt-image-2, quality medium) as webp.
// Writes public/images/featured/<slug>-1600.webp and -800.webp.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) throw new Error('OPENAI_API_KEY missing');
const OUT = path.join(ROOT, 'public/images/featured');
fs.mkdirSync(OUT, { recursive: true });

const JOBS = [
  {
    slug: 'comment-enlever-une-tache-de-vin-rouge-sechee-sur-un-tapis-en-laine',
    prompt: `Photo généraliste sur le thème du nettoyage d'une tache de vin rouge sur un tapis en laine, ultra réaliste, style éditorial magazine.
Gros plan sur un tapis en laine texturé de couleur claire avec une tache de vin rouge, une main tenant un chiffon blanc en train de tamponner délicatement la tache, un petit bol d'eau à proximité. Lumière naturelle douce et chaleureuse, ambiance domestique soignée, cadrage paysage 3:2, faible profondeur de champ.
Aucun texte, aucun mot, aucune lettre, aucun logo, aucun chiffre lisible dans l'image.`,
  },
  {
    slug: 'pourquoi-mon-chat-refuse-t-il-de-manger-ses-nouvelles-croquettes',
    prompt: `Photo généraliste sur le thème d'un chat hésitant devant sa gamelle de croquettes, ultra réaliste, style éditorial magazine.
Un chat domestique assis devant une gamelle remplie de croquettes posée sur le sol d'une cuisine lumineuse, l'air méfiant ou hésitant, reniflant la gamelle sans manger. Lumière naturelle douce, ambiance chaleureuse et calme, cadrage paysage 3:2, faible profondeur de champ.
Aucun texte, aucun mot, aucune lettre, aucun logo, aucun chiffre lisible dans l'image.`,
  },
];

async function genOne(job) {
  const body = {
    model: 'gpt-image-2',
    prompt: job.prompt,
    size: '1536x1024',
    quality: 'medium',
    output_format: 'webp',
    n: 1,
  };
  const r = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  if (data.error) throw new Error(JSON.stringify(data.error));
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error('no image returned: ' + JSON.stringify(data).slice(0, 500));
  const buf = Buffer.from(b64, 'base64');
  const big = path.join(OUT, `${job.slug}-1600.webp`);
  const small = path.join(OUT, `${job.slug}-800.webp`);
  fs.writeFileSync(big, buf);
  fs.writeFileSync(small, buf);
  console.log('OK', big, buf.length, 'bytes');
}

async function main() {
  for (const job of JOBS) {
    await genOne(job);
  }
}
main().catch((e) => { console.error('FAIL', e.message || e); process.exit(1); });
