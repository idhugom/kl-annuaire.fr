// Generate premium article content with OpenAI (Responses API, gpt-5.6-terra).
// Rewrites every post from scratch — the WP original is only a topical hint.
// Usage: node scripts/gen-content.mjs [--limit N] [--conc N] [--slug S] [--force]
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'content/articles');
const KEY = process.env.OPENAI_API_KEY;
const MODEL = 'gpt-5.6-terra';

const argv = process.argv.slice(2);
const arg = (name, def) => { const i = argv.indexOf('--' + name); return i >= 0 ? argv[i + 1] : def; };
const has = (name) => argv.includes('--' + name);
const LIMIT = parseInt(arg('limit', '999'), 10);
const CONC = parseInt(arg('conc', '16'), 10);
const ONLY_SLUG = arg('slug', null);
const FORCE = has('force');

const CATEGORIES = [
  'Cuisine', 'Maison', 'Jardin', 'Animaux', 'Entreprise', 'Finance', 'Bien-être',
  'Santé', 'Technologie', 'Culture', 'Voyage', 'Mode', 'Famille', 'Auto', 'Sport', 'Loisirs', 'Pratique',
];

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['dek', 'meta_description', 'category', 'tags', 'image_caption', 'key_takeaways', 'lead_html', 'body_html', 'faq'],
  properties: {
    dek: { type: 'string', description: 'Chapô accrocheur en 1 phrase (120-170 caractères).' },
    meta_description: { type: 'string', description: 'Meta description SEO, 150-160 caractères.' },
    category: { type: 'string', enum: CATEGORIES },
    tags: { type: 'array', minItems: 3, maxItems: 6, items: { type: 'string' } },
    image_caption: { type: 'string', description: 'Légende courte et pertinente pour la photo à la une.' },
    key_takeaways: { type: 'array', minItems: 3, maxItems: 6, items: { type: 'string' } },
    lead_html: { type: 'string', description: 'Introduction en HTML. Le 1er paragraphe DOIT être <p class="lead">…</p>.' },
    body_html: { type: 'string', description: 'Corps complet de l’article en HTML (voir contrat de composants).' },
    faq: {
      type: 'array', minItems: 4, maxItems: 6,
      items: {
        type: 'object', additionalProperties: false, required: ['q', 'a_html'],
        properties: { q: { type: 'string' }, a_html: { type: 'string', description: 'Réponse en HTML (1-3 paragraphes).' } },
      },
    },
  },
};

const SYSTEM = `Tu es rédacteur ou rédactrice en chef d'un média éditorial français haut de gamme (KL-Annuaire) et expert(e) SEO. Tu écris des articles de référence : complets, fiables, agréables à lire, qui répondent TOTALEMENT à l'intention de recherche et apportent une réelle valeur ajoutée.

RÈGLES ABSOLUES
- Écris en français impeccable, vivant, précis, sans remplissage ni généralités creuses.
- RÉÉCRIS INTÉGRALEMENT le sujet à partir de zéro. Le texte source fourni n'est qu'un indice thématique : ne le copie jamais, tu peux (et dois) le surpasser largement en profondeur et en utilité.
- Ne modifie pas le sujet : reste fidèle au titre exact fourni.
- Traite le sujet dans son intégralité : contexte, méthode/étapes, cas particuliers, erreurs fréquentes, conseils d'expert, et réponses aux questions sous-jacentes.
- Sois exact. N'invente JAMAIS de chiffres précis, prix, dates, marques, études ou citations. Reste sur des ordres de grandeur et des faits de connaissance générale quand tu n'es pas certain.
- Longueur cible du corps : 1400 à 2200 mots, structurés en 4 à 7 sections H2 (avec sous-sections H3 si utile).

CONTRAT DE COMPOSANTS HTML (à utiliser à bon escient, PAS de manière forcée)
- Titres : <h2 id="slug-court">…</h2> et <h3>…</h3>. CHAQUE h2 doit avoir un attribut id unique (slug court en minuscules).
- Encadré de mise en avant : <div class="kl-callout is-tip"><span class="kl-callout__label">Astuce</span><p>…</p></div>. Variantes de classe : (défaut) info, is-warning (avertissement), is-tip (astuce), is-key (à retenir). Change aussi le libellé du label en conséquence.
- Tableau (dès qu'une comparaison chiffrée/critères aide le lecteur) :
  <div class="kl-table-wrap"><table class="kl-table"><thead><tr><th>…</th><th>…</th></tr></thead><tbody><tr><td>…</td><td>…</td></tr></tbody></table></div>
- Comparaison en 2 colonnes (quand un « pour / contre » ou « option A / option B » est naturel) :
  <div class="kl-compare"><div class="kl-compare__col is-pro"><h4>Avantages</h4><ul><li>…</li></ul></div><div class="kl-compare__col is-con"><h4>Limites</h4><ul><li>…</li></ul></div></div>
- Citation forte / idée-clé : <blockquote class="kl-quote">…<cite>— …</cite></blockquote>
- Statistiques marquantes (facultatif) : <div class="kl-stat-row"><div class="kl-stat"><b>3×</b><span>libellé</span></div>…</div>
- Listes : <ul>/<ol>/<li>. Emphase : <strong>, <em>.
- N'utilise PAS de <h1> (déjà présent), pas de styles inline, pas de <script>, pas d'images.

EXIGENCES DE STRUCTURE
- Au moins UN tableau OU une comparaison 2 colonnes quand le sujet s'y prête (comparatif, critères de choix, avant/après, étapes chiffrées).
- Au moins un ou deux encadrés kl-callout pertinents.
- lead_html : commence par <p class="lead">…</p> (accroche forte qui pose l'intérêt), puis éventuellement un 2e paragraphe.
- Une FAQ de 4 à 6 vraies questions que se posent les internautes, avec réponses concrètes.
- key_takeaways : 3 à 6 points essentiels et actionnables.

Réponds UNIQUEMENT via le format JSON structuré imposé.`;

async function generate(post) {
  const userPrompt = `TITRE EXACT (à conserver) : « ${post.title} »

RUBRIQUE PROBABLE : choisis la plus adaptée dans la liste imposée.

INDICE THÉMATIQUE (extrait du contenu source à NE PAS copier, seulement pour cerner le sujet) :
"""
${(post.original_text || post.excerpt || '').slice(0, 2500)}
"""

Rédige maintenant l'article de référence complet correspondant à ce titre, en respectant scrupuleusement le contrat de composants et les exigences de structure.`;

  const body = {
    model: MODEL,
    input: [
      { role: 'developer', content: SYSTEM },
      { role: 'user', content: userPrompt },
    ],
    reasoning: { effort: 'high' },
    text: {
      verbosity: 'high',
      format: { type: 'json_schema', name: 'kl_article', strict: true, schema: SCHEMA },
    },
    max_output_tokens: 30000,
  };

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const r = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (r.status === 429 || r.status >= 500) {
        const wait = Math.min(60000, 2000 * 2 ** attempt);
        await new Promise((res) => setTimeout(res, wait));
        continue;
      }
      const data = await r.json();
      if (data.error) throw new Error(data.error.message);
      if (data.status === 'incomplete' && data.incomplete_details?.reason === 'max_output_tokens') {
        // Accept if we have a parseable JSON already; else retry once with same budget.
      }
      let text = '';
      for (const item of data.output || []) {
        if (item.type === 'message') for (const c of item.content || []) if (c.type === 'output_text') text += c.text;
      }
      if (!text) throw new Error('empty output (status ' + data.status + ')');
      const parsed = JSON.parse(text);
      return { parsed, usage: data.usage };
    } catch (e) {
      if (attempt === 4) throw e;
      await new Promise((res) => setTimeout(res, 1500 * 2 ** attempt));
    }
  }
}

/* ---- post-processing: ensure H2 ids, derive TOC, reading time ------------ */
const slugify = (s) => s.toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);

function processBody(html) {
  const used = new Set();
  const fixed = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (m, attrs, inner) => {
    let id = (attrs.match(/id=["']([^"']+)["']/) || [])[1];
    if (!id) id = slugify(inner) || 'section';
    let base = id, n = 2;
    while (used.has(id)) id = `${base}-${n++}`;
    used.add(id);
    const cleaned = attrs.replace(/\s*id=["'][^"']*["']/, '');
    return `<h2${cleaned} id="${id}">${inner}</h2>`;
  });
  const toc = [];
  fixed.replace(/<h2[^>]*id=["']([^"']+)["'][^>]*>([\s\S]*?)<\/h2>/gi, (m, id, inner) => {
    toc.push({ id, label: inner.replace(/<[^>]+>/g, '').trim() });
    return m;
  });
  const words = fixed.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return { fixed, toc, reading_time: Math.max(4, Math.round(words / 210)) };
}

async function main() {
  if (!KEY) throw new Error('OPENAI_API_KEY missing');
  await fsp.mkdir(OUT, { recursive: true });
  const posts = JSON.parse(fs.readFileSync(path.join(ROOT, 'content/wp-raw/posts.json'), 'utf8'));

  let todo = posts;
  if (ONLY_SLUG) todo = posts.filter((p) => p.slug === ONLY_SLUG);
  if (!FORCE) todo = todo.filter((p) => !fs.existsSync(path.join(OUT, p.slug + '.json')));
  todo = todo.slice(0, LIMIT);

  console.log(`Generating ${todo.length} articles · model ${MODEL} · concurrency ${CONC}`);
  let done = 0, failed = 0, idx = 0;
  const failures = [];
  const started = Date.now();

  async function worker(wid) {
    while (idx < todo.length) {
      const post = todo[idx++];
      const my = idx;
      try {
        const { parsed, usage } = await generate(post);
        const { fixed, toc, reading_time } = processBody(parsed.body_html || '');
        const record = {
          slug: post.slug,
          title: post.title,
          date: post.date,
          modified: post.modified,
          category: parsed.category,
          tags: parsed.tags,
          dek: parsed.dek,
          meta_description: parsed.meta_description,
          image_caption: parsed.image_caption,
          reading_time,
          key_takeaways: parsed.key_takeaways,
          toc,
          lead_html: parsed.lead_html,
          body_html: fixed,
          faq: parsed.faq,
          _gen: { model: MODEL, at: post.date, out_tokens: usage?.output_tokens },
        };
        await fsp.writeFile(path.join(OUT, post.slug + '.json'), JSON.stringify(record, null, 2));
        done++;
        if (done % 5 === 0 || done <= 5) {
          const rate = done / ((Date.now() - started) / 1000);
          console.log(`  ✓ ${done}/${todo.length} (${(rate * 60).toFixed(1)}/min) — ${post.slug.slice(0, 50)}`);
        }
      } catch (e) {
        failed++; failures.push({ slug: post.slug, error: String(e.message || e) });
        console.log(`  ✗ [${my}] ${post.slug.slice(0, 50)} — ${String(e.message || e).slice(0, 120)}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONC }, (_, i) => worker(i)));
  if (failures.length) fs.writeFileSync(path.join(ROOT, 'content/wp-raw/gen-failures.json'), JSON.stringify(failures, null, 2));
  console.log(`\nDone: ${done} ok, ${failed} failed in ${((Date.now() - started) / 60000).toFixed(1)} min`);
}

main().catch((e) => { console.error(e); process.exit(1); });
