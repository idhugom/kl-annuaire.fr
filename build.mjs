// KL-Annuaire static site generator. Pure Node — no runtime dependencies.
import fs from 'node:fs/promises';
import fss from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {
  SITE, layout, home, article, simplePage, indexPage, rubriquesPage,
  categoryPage, notFound, esc, frDate, isoDate,
} from './src/templates.mjs';

const ROOT = import.meta.dirname;
const DIST = path.join(ROOT, 'dist');
const t0 = Date.now();

const slugify = (s) =>
  s.toString().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const readJSON = (p, d = null) => { try { return JSON.parse(fss.readFileSync(p, 'utf8')); } catch { return d; } };
const write = async (rel, content) => {
  const full = path.join(DIST, rel);
  await fs.mkdir(path.dirname(full), { recursive: true });
  await fs.writeFile(full, content);
};
const writePage = (slug, content) => write(path.join(slug, 'index.html'), content);

// Recursively copy a directory (Node built-in cp).
async function copyDir(from, to) {
  if (!fss.existsSync(from)) return;
  await fs.cp(from, to, { recursive: true });
}

/* ---- Category blurbs (editorial) ---------------------------------------- */
const CAT_BLURBS = {
  Cuisine: 'Recettes décryptées, techniques et astuces pour réussir à tous les coups.',
  Maison: 'Aménager, entretenir, optimiser : le guide complet de votre intérieur.',
  Animaux: 'Comprendre, soigner et vivre mieux avec vos compagnons.',
  Entreprise: 'Créer, gérer et développer : les clés d’une activité qui tourne.',
  'Bien-être': 'Santé, équilibre et habitudes qui changent le quotidien.',
  Culture: 'Idées, tendances et regards pour nourrir la curiosité.',
  Technologie: 'Outils, usages et innovations expliqués simplement.',
  Finance: 'Argent, crédit et gestion : décider en connaissance de cause.',
  Voyage: 'Destinations, conseils pratiques et inspirations.',
  Mode: 'Style, matières et tendances décryptés.',
  Jardin: 'Cultiver, entretenir et profiter de vos espaces verts.',
  Loisirs: 'Passions, hobbies et bonnes idées pour le temps libre.',
  Pratique: 'Réponses concrètes aux questions du quotidien.',
};

async function main() {
  console.log('▸ KL-Annuaire build');
  await fs.rm(DIST, { recursive: true, force: true });
  await fs.mkdir(DIST, { recursive: true });

  // --- assets: hash CSS & JS ---
  const css = await fs.readFile(path.join(ROOT, 'src/styles/main.css'), 'utf8');
  const js = await fs.readFile(path.join(ROOT, 'src/client/app.js'), 'utf8');
  const cssName = `app.${crypto.createHash('sha1').update(css).digest('hex').slice(0, 8)}.css`;
  const jsName = `app.${crypto.createHash('sha1').update(js).digest('hex').slice(0, 8)}.js`;
  await write(`assets/${cssName}`, css);
  await write(`assets/${jsName}`, js);

  // --- data ---
  const posts = readJSON(path.join(ROOT, 'content/wp-raw/posts.json'), []);
  const images = readJSON(path.join(ROOT, 'content/wp-raw/images.json'), {});
  const bySlug = new Map(posts.map((p) => [p.slug, p]));

  // Load generated articles
  const artDir = path.join(ROOT, 'content/articles');
  let genFiles = [];
  try { genFiles = (await fs.readdir(artDir)).filter((f) => f.endsWith('.json')); } catch {}
  const articles = [];
  for (const f of genFiles) {
    const gen = readJSON(path.join(artDir, f));
    if (!gen || !gen.slug) continue;
    const wp = bySlug.get(gen.slug);
    if (!wp) { console.warn('  ! generated slug not in WP set:', gen.slug); }
    const img = images[gen.slug] || null;
    articles.push({
      slug: gen.slug,
      title: (wp && wp.title) || gen.title,
      date: (wp && wp.date) || gen.date || new Date().toISOString(),
      modified: (wp && wp.modified) || gen.date,
      image: img,
      image_alt: (wp && wp.featured_alt) || gen.title,
      image_caption: gen.image_caption || '',
      category: gen.category || 'Pratique',
      tags: gen.tags || [],
      dek: gen.dek || '',
      meta_description: gen.meta_description || gen.dek || '',
      reading_time: gen.reading_time || Math.max(4, Math.round((String(gen.body_html || '').split(/\s+/).length) / 210)),
      lead_html: gen.lead_html || '',
      body_html: gen.body_html || '',
      toc: gen.toc || [],
      key_takeaways: gen.key_takeaways || [],
      faq: gen.faq || [],
    });
  }
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  console.log(`  ${articles.length} generated articles · ${posts.length} WP posts known`);

  // --- categories ---
  const catMap = new Map();
  for (const a of articles) {
    const name = a.category || 'Pratique';
    if (!catMap.has(name)) catMap.set(name, { name, slug: slugify(name), count: 0, articles: [], blurb: CAT_BLURBS[name] || '', cover: null });
    const c = catMap.get(name);
    c.count++; c.articles.push(a);
    if (!c.cover && a.image) c.cover = a;
  }
  const categories = [...catMap.values()].sort((a, b) => b.count - a.count);

  const common = { latest: articles.slice(0, 12), categories, css: cssName, js: jsName };
  const render = (page) => layout({ ...common, ...page });

  // --- home ---
  if (articles.length) {
    await writePage('.', render(home(articles, categories)));
  } else {
    await writePage('.', render({ main: '<section class="nf"><div class="wrap"><h1 class="art-title">Bientôt.</h1><p class="art-dek">Le nouveau KL-Annuaire arrive.</p></div></section>', title: SITE.name, description: SITE.description, canonical: SITE.url + '/' }));
  }

  // --- articles ---
  const related = (a) => {
    const same = articles.filter((x) => x.slug !== a.slug && x.category === a.category);
    const pool = same.length >= 3 ? same : articles.filter((x) => x.slug !== a.slug);
    return pool.slice(0, 3);
  };
  for (const a of articles) {
    const view = article(a, related(a));
    const head = view.faqLd ? `<script type="application/ld+json">${JSON.stringify(view.faqLd)}</script>` : '';
    await writePage(a.slug, render({ ...view, head }));
  }

  // --- index ---
  await writePage('index', render(indexPage(articles, categories)));

  // --- rubriques + category pages ---
  await writePage('rubriques', render(rubriquesPage(categories)));
  for (const c of categories) {
    await writePage(path.join('rubrique', c.slug), render(categoryPage(c, c.articles)));
  }

  // --- about ---
  await writePage('a-propos', render(simplePage({
    eyebrow: 'Le média', title: 'KL-Annuaire, le média qui référence',
    dek: SITE.tagline, canonical: SITE.url + '/a-propos/',
    html: aboutHtml(articles.length),
  })));

  // --- legal (from WP) ---
  const legal = await legalHtml();
  await writePage('mentions-legales-generales', render(simplePage({
    eyebrow: 'Informations légales', title: 'Mentions légales générales',
    canonical: SITE.url + '/mentions-legales-generales/', html: legal,
  })));

  // --- 404 ---
  await write('404.html', render(notFound()));

  // --- feeds / seo files ---
  await write('sitemap.xml', sitemap(articles, categories));
  await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`);
  await write('rss.xml', rss(articles));
  await write('favicon.svg', favicon());
  await write('_redirects', redirects());
  await write('_headers', headers());

  // --- copy public assets (fonts, images, logo, og) ---
  await copyDir(path.join(ROOT, 'public'), DIST);

  const files = countFiles(DIST);
  console.log(`  wrote ${files} files in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  console.log(`  categories: ${categories.map((c) => `${c.name}(${c.count})`).join(', ')}`);
  console.log('✓ build complete → dist/');
}

/* ---- SEO / feeds --------------------------------------------------------- */
function sitemap(articles, categories) {
  const url = (loc, lastmod, prio = '0.6') =>
    `  <url><loc>${loc}</loc>${lastmod ? `<lastmod>${isoDate(lastmod)}</lastmod>` : ''}<priority>${prio}</priority></url>`;
  const rows = [
    url(SITE.url + '/', articles[0]?.date, '1.0'),
    url(SITE.url + '/index/', null, '0.7'),
    url(SITE.url + '/rubriques/', null, '0.6'),
    url(SITE.url + '/a-propos/', null, '0.4'),
    ...categories.map((c) => url(`${SITE.url}/rubrique/${c.slug}/`, null, '0.6')),
    ...articles.map((a) => url(`${SITE.url}/${a.slug}/`, a.modified || a.date, '0.8')),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join('\n')}\n</urlset>\n`;
}

function rss(articles) {
  const items = articles.slice(0, 40).map((a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE.url}/${a.slug}/</link>
      <guid>${SITE.url}/${a.slug}/</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      <description>${esc(a.dek || '')}</description>
      ${a.category ? `<category>${esc(a.category)}</category>` : ''}
    </item>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${esc(SITE.name)}</title>
  <link>${SITE.url}/</link>
  <description>${esc(SITE.description)}</description>
  <language>fr-FR</language>
  <lastBuildDate>${new Date(articles[0]?.date || Date.now()).toUTCString()}</lastBuildDate>
${items}
</channel></rss>\n`;
}

function favicon() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#1f35ff"/><text x="50" y="52" font-family="Georgia,serif" font-size="52" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="central" letter-spacing="-2">KL</text></svg>`;
}

/* Path-based redirects. Apex→www is host-based and handled by the Pages
   Function (functions/_middleware.js), since _redirects sources are paths only. */
function redirects() {
  return `# Legacy WordPress paths → clean equivalents
/category/date/*  /index/   301
/category/*       /index/   301
/wp-admin/*       /         301
/wp-login.php     /         301
/feed             /rss.xml  301
/feed/            /rss.xml  301
/author/*         /         301

# 404 fallback (static assets are served first; only unmatched paths hit this)
/*  /404.html  404
`;
}

function headers() {
  return `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: SAMEORIGIN
  Permissions-Policy: interest-cohort=()

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=31536000, immutable
`;
}

/* ---- content pages ------------------------------------------------------- */
function aboutHtml(n) {
  return `
<p class="lead">KL-Annuaire n’est pas un annuaire de plus. C’est un <strong>média éditorial</strong> qui référence, décrypte et met en perspective — pour transformer une simple recherche en véritable compréhension.</p>
<h2 id="mission">Notre mission</h2>
<p>Sur le web, l’information ne manque pas : c’est la <em>qualité</em> qui se fait rare. Nous produisons des guides complets, vérifiés et agréables à lire, pensés pour répondre réellement à votre intention de recherche — pas pour remplir une page.</p>
<div class="kl-callout is-key"><span class="kl-callout__label">Notre promesse</span><p>Chaque article vise un seul objectif : que vous repartiez avec une réponse claire, actionnable, et une longueur d’avance.</p></div>
<h2 id="methode">Notre méthode</h2>
<ul>
<li><strong>Profondeur.</strong> Nous traitons chaque sujet dans son intégralité : contexte, réponses concrètes, cas particuliers et questions fréquentes.</li>
<li><strong>Clarté.</strong> Tableaux comparatifs, encadrés, points-clés : l’information est structurée pour aller à l’essentiel.</li>
<li><strong>Indépendance.</strong> ${n} articles et un seul juge de paix : l’utilité pour le lecteur.</li>
</ul>
<h2 id="rubriques">Ce que vous trouverez</h2>
<p>De la cuisine à l’entreprise, de la maison aux animaux : KL-Annuaire couvre les sujets du quotidien avec la même exigence. <a href="/index/">Parcourez l’index complet</a> ou <a href="/rubriques/">explorez par rubrique</a>.</p>`;
}

async function legalHtml() {
  // Pull the WordPress legal page if we captured it; else a sensible default.
  const raw = readJSON(path.join(ROOT, 'content/wp-raw/legal.json'));
  if (raw && raw.content_html) return raw.content_html;
  return `
<p class="lead">Informations légales relatives au site KL-Annuaire.</p>
<h2 id="editeur">Éditeur du site</h2>
<p>Le site <strong>kl-annuaire.fr</strong> est un média éditorial indépendant. Pour toute demande, contactez la rédaction via les coordonnées communiquées sur demande.</p>
<h2 id="hebergement">Hébergement</h2>
<p>Ce site est hébergé sur l’infrastructure <strong>Cloudflare Pages</strong> (Cloudflare, Inc.), réseau de diffusion de contenu mondial.</p>
<h2 id="propriete">Propriété intellectuelle</h2>
<p>L’ensemble des contenus (textes, mises en page, éléments graphiques) est protégé par le droit d’auteur. Toute reproduction sans autorisation est interdite.</p>
<h2 id="donnees">Données personnelles</h2>
<p>KL-Annuaire respecte votre vie privée et le RGPD. Le site ne collecte aucune donnée personnelle sans votre consentement explicite.</p>
<h2 id="cookies">Cookies</h2>
<p>Seuls des cookies strictement nécessaires au fonctionnement et à la mesure d’audience anonymisée peuvent être déposés.</p>`;
}

/* ---- utils --------------------------------------------------------------- */
function countFiles(dir) {
  let n = 0;
  for (const e of fss.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) n += countFiles(path.join(dir, e.name));
    else n++;
  }
  return n;
}

main().catch((e) => { console.error(e); process.exit(1); });
