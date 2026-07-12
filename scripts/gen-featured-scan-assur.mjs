// One-off: generate a featured image via OpenAI (gpt-image-1) as webp.
// Writes public/images/featured/<slug>-1600.webp and -800.webp.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) throw new Error('OPENAI_API_KEY missing');

const SLUG = process.argv[2] || 'doublons-d-assurance-comment-reperer-les-garanties-payees-en-double';
const OUT = path.join(ROOT, 'public/images/featured');
fs.mkdirSync(OUT, { recursive: true });

const PROMPT = `Photographie éditoriale haut de gamme, lumineuse et rassurante, sur un bureau en bois clair en France.
Sur le bureau : plusieurs documents papier de type contrats et dossiers, soigneusement empilés et en partie étalés, une loupe posée dessus, un stylo, une tasse de café et une petite plante verte. Une main adulte survole les documents comme si elle passait en revue des garanties. Lumière naturelle douce venant d'une fenêtre, faible profondeur de champ, ambiance calme, ordonnée et professionnelle, évoquant l'audit méthodique de contrats d'assurance pour y repérer les doublons.
Style magazine, réaliste, épuré, palette chaleureuse avec des touches de bleu doux. AUCUN texte lisible, aucun mot, aucune lettre, aucun logo, aucun chiffre, aucune marque. Cadrage paysage 3:2.`;

async function main() {
  const body = {
    model: 'gpt-image-1',
    prompt: PROMPT,
    size: '1536x1024',
    quality: 'high',
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
  const big = path.join(OUT, `${SLUG}-1600.webp`);
  const small = path.join(OUT, `${SLUG}-800.webp`);
  fs.writeFileSync(big, buf);
  fs.writeFileSync(small, buf); // same asset served for both srcset targets
  console.log('OK', big, buf.length, 'bytes');
}
main().catch((e) => { console.error('FAIL', e.message || e); process.exit(1); });
