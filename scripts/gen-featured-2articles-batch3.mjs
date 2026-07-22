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
    slug: 'pourquoi-a-t-on-des-courbatures-2-jours-apres-le-sport-et-comment-les-soulager',
    prompt: `Photographie éditoriale haut de gamme, lumineuse et chaleureuse, dans un intérieur moderne en France.
Une personne assise au sol après une séance de sport, tenue de sport simple, en train de se masser doucement le mollet ou la cuisse avec les mains, expression concentrée mais sereine. Lumière naturelle douce venant d'une fenêtre, faible profondeur de champ, ambiance calme et rassurante évoquant la récupération musculaire après l'effort.
Style magazine, réaliste, épuré. AUCUN texte, aucun mot, aucune lettre, aucun logo, aucun chiffre lisible dans l'image. Cadrage paysage 3:2.`,
  },
  {
    slug: 'combien-de-temps-garder-ses-factures-et-papiers-avant-de-les-jeter',
    prompt: `Photographie éditoriale haut de gamme, lumineuse et chaleureuse, dans un salon ou bureau domestique moderne en France.
Une personne triant des documents et enveloppes sur une table en bois clair, avec quelques chemises cartonnées colorées ouvertes devant elle, une tasse de café posée à côté. Lumière naturelle douce venant d'une fenêtre, faible profondeur de champ, ambiance domestique soignée et organisée.
Style magazine, réaliste, épuré. AUCUN texte, aucun mot, aucune lettre, aucun logo, aucun chiffre lisible sur les documents ou ailleurs dans l'image. Cadrage paysage 3:2.`,
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
