// One-off: generate featured images for the 2 new articles via OpenAI (gpt-image-2, quality medium).
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
    slug: 'pourquoi-les-mains-gonflent-elles-en-fin-de-journee',
    prompt: `Photographie éditoriale haut de gamme, lumineuse et chaleureuse, dans un intérieur moderne en France en fin de journée.
Gros plan sur des mains d'une personne assise à une table en bois clair, l'une des mains massant doucement l'autre au niveau du poignet, lumière dorée de fin d'après-midi venant d'une fenêtre. Ambiance calme, douce, rassurante, évoquant le bien-être et la détente après une journée.
Style magazine, réaliste, épuré. AUCUN texte, aucun mot, aucune lettre, aucun logo, aucun chiffre lisible dans l'image. Cadrage paysage 3:2.`,
  },
  {
    slug: 'pourquoi-les-vitres-de-la-voiture-sembuent-elles-a-linterieur-en-hiver',
    prompt: `Photographie éditoriale haut de gamme, réaliste, dans une voiture par un matin d'hiver froid en France.
Vue depuis l'intérieur de l'habitacle sur le pare-brise et les vitres avant partiellement couvertes de buée, avec une lumière matinale douce et froide filtrant à travers, quelques gouttelettes de condensation visibles sur le verre. Ambiance hivernale, atmosphère calme et authentique.
Style magazine, réaliste, épuré. AUCUN texte, aucun mot, aucune lettre, aucun logo, aucun chiffre lisible dans l'image. Cadrage paysage 3:2.`,
  },
];

async function genOne(job) {
  const body = {
    model: 'gpt-image-2',
    prompt: job.prompt,
    size: '1536x1024',
    quality: 'medium',
    output_format: 'webp',
    output_compression: 82,
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
