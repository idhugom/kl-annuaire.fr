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
    slug: 'comment-nettoyer-un-four-tres-encrasse-sans-produits-chimiques-agressifs',
    prompt: `Photographie éditoriale haut de gamme, lumineuse et chaleureuse, dans une cuisine moderne en France.
La porte d'un four ouverte, intérieur propre et brillant après nettoyage, avec une éponge, un chiffon en tissu et un petit bol de pâte blanche (bicarbonate) posés juste devant sur le plan de travail. Lumière naturelle douce venant d'une fenêtre, faible profondeur de champ, ambiance domestique soignée et rassurante, évoquant l'entretien méticuleux de la cuisine.
Style magazine, réaliste, épuré. AUCUN texte, aucun mot, aucune lettre, aucun logo, aucun chiffre lisible. Cadrage paysage 3:2.`,
  },
  {
    slug: 'combien-de-temps-un-accident-reste-t-il-sur-le-releve-d-information-assurance-auto',
    prompt: `Photographie éditoriale haut de gamme, lumineuse et professionnelle, dans un cadre intérieur moderne en France.
Une personne assise à une table en bois clair, en train de consulter un document papier (relevé d'information) posé à côté d'un trousseau de clés de voiture et d'un stylo. Lumière naturelle douce venant d'une fenêtre, faible profondeur de champ, ambiance sérieuse mais rassurante, évoquant une démarche administrative liée à l'assurance automobile.
Style magazine, réaliste, épuré. AUCUN texte, aucun mot, aucune lettre, aucun logo, aucun chiffre lisible sur le document ou ailleurs dans l'image. Cadrage paysage 3:2.`,
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
