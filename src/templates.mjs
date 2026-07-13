// KL-Annuaire — HTML templates (pure functions returning strings).

export const SITE = {
  name: 'KL-Annuaire',
  domain: 'www.kl-annuaire.fr',
  url: 'https://www.kl-annuaire.fr',
  tagline: 'Le savoir, référencé.',
  description:
    "KL-Annuaire — le média qui référence, décrypte et met en perspective. Des guides complets et des analyses fouillées sur la cuisine, la maison, l'entreprise, les animaux, la culture et le quotidien.",
  locale: 'fr_FR',
  twitter: '@klannuaire',
};

/* ---- helpers ------------------------------------------------------------- */
export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const MONTHS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
export const frDate = (iso) => {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
};
export const isoDate = (iso) => new Date(iso).toISOString();

const slug2 = (n) => String(n).padStart(2, '0');

/* ---- SVG icons ----------------------------------------------------------- */
const I = {
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.4 22h-7l-5.5-7.2L4.6 22H1.5l8.2-9.3L1 2h7.2l5 6.6zM17.7 20h1.7L7.4 3.9H5.6z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3l.5-3.5H14V3.7c0-1 .3-1.7 1.8-1.7H17.7V-.7C17.4-.8 16.3-1 15.1-1 12.5-1 10.7.6 10.7 3.4V5.5H8V9h2.7v9H14z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.9 21H3.4V9.2h3.5zM5.1 7.6A2 2 0 1 1 5.1 3.5a2 2 0 0 1 0 4.1zM21 21h-3.5v-5.7c0-1.4 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v5.8H10V9.2h3.3v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15l6-6M11 6l1-1a4 4 0 0 1 6 6l-1 1M13 18l-1 1a4 4 0 0 1-6-6l1-1"/></svg>',
};

/* ---- shared chrome ------------------------------------------------------- */
export function masthead(latest = []) {
  const tick = latest.slice(0, 10).map((a) => `<a href="/${esc(a.slug)}/">${esc(a.title)}</a>`).join('');
  return `
<div class="ticker" aria-hidden="true"><div class="ticker__track">${
    latest.slice(0, 8).map((a) => `<span>${esc(a.title)}</span>`).join('')
  }</div></div>
<header class="masthead">
  <div class="wrap--wide masthead__bar">
    <a class="brand" href="/" aria-label="KL-Annuaire, accueil">
      <img src="/images/logo-mark.png" alt="" width="34" height="33" />
      <span class="brand__mark">KL<b>·</b>Annuaire</span>
    </a>
    <nav class="mainnav" aria-label="Navigation principale">
      <a href="/">À la une</a>
      <a href="/rubriques/">Rubriques</a>
      <a href="/index/">L’Index</a>
      <a href="/a-propos/">Le média</a>
    </nav>
    <div class="mast-tools">
      <button class="icon-btn" data-nav-open aria-label="Ouvrir le menu">${I.menu}</button>
      <button class="icon-btn" data-theme-toggle aria-label="Basculer le thème clair/sombre">
        <span class="only-dark">${I.sun}</span><span class="only-light">${I.moon}</span>
      </button>
    </div>
  </div>
</header>
<div class="mobile-nav" aria-hidden="true">
  <div class="mobile-nav__top">
    <span class="brand__mark">KL<b>·</b>Annuaire</span>
    <button class="icon-btn" data-nav-close aria-label="Fermer le menu">${I.close}</button>
  </div>
  <ul>
    <li><a href="/">À la une</a></li>
    <li><a href="/rubriques/">Rubriques</a></li>
    <li><a href="/index/">L’Index</a></li>
    <li><a href="/a-propos/">Le média</a></li>
    <li><a href="/mentions-legales-generales/">Mentions légales</a></li>
  </ul>
</div>`;
}

export function footer(categories = []) {
  const catLinks = categories.slice(0, 8).map((c) => `<a href="/rubrique/${esc(c.slug)}/">${esc(c.name)}</a>`).join('');
  const y = 2026;
  return `
<footer class="foot">
  <div class="wrap--wide">
    <div class="foot__wordmark reveal">KL<b>·</b>Annuaire</div>
    <div class="foot__top">
      <div class="foot__brand">
        <span class="brand__mark">KL<b>·</b>Annuaire</span>
        <p>${esc(SITE.description)}</p>
      </div>
      <div class="foot__col">
        <h4>Explorer</h4>
        <a href="/">À la une</a><a href="/index/">L’Index complet</a><a href="/rubriques/">Toutes les rubriques</a><a href="/a-propos/">Le média</a>
      </div>
      <div class="foot__col">
        <h4>Rubriques</h4>
        ${catLinks || '<a href="/index/">L’Index</a>'}
      </div>
      <div class="foot__col">
        <h4>Informations</h4>
        <a href="/mentions-legales-generales/">Mentions légales</a><a href="/rss.xml">Flux RSS</a><a href="/sitemap.xml">Plan du site</a>
      </div>
    </div>
    <div class="foot__bottom">
      <span>© ${y} KL-Annuaire — ${esc(SITE.tagline)}</span>
      <span>Média indépendant · Édité avec passion</span>
    </div>
  </div>
</footer>`;
}

/* ---- document shell ------------------------------------------------------ */
export function layout(o) {
  const {
    title, description, canonical, bodyClass = '', main, head = '',
    ogImage, jsonld, latest = [], categories = [], css, js,
  } = o;
  const desc = description || SITE.description;
  const og = ogImage || `${SITE.url}/images/og-default.png`;
  const ld = jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : '';
  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}" />
<link rel="canonical" href="${esc(canonical)}" />
<meta name="theme-color" content="#1f35ff" media="(prefers-color-scheme: light)" />
<meta name="theme-color" content="#0b0b11" media="(prefers-color-scheme: dark)" />
<meta property="og:site_name" content="${esc(SITE.name)}" />
<meta property="og:locale" content="${SITE.locale}" />
<meta property="og:type" content="${o.ogType || 'website'}" />
<meta property="og:title" content="${esc(o.ogTitle || title)}" />
<meta property="og:description" content="${esc(desc)}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:image" content="${esc(og)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(o.ogTitle || title)}" />
<meta name="twitter:description" content="${esc(desc)}" />
<meta name="twitter:image" content="${esc(og)}" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="apple-touch-icon" href="/images/logo-mark@2x.png" />
<link rel="alternate" type="application/rss+xml" title="KL-Annuaire" href="/rss.xml" />
<link rel="preload" href="/fonts/fraunces-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="/assets/${css}" />
<style>
.only-dark{display:none}.only-light{display:inline-flex}
@media (prefers-color-scheme: dark){:root:not([data-theme]) .only-dark{display:inline-flex}:root:not([data-theme]) .only-light{display:none}}
:root[data-theme='dark'] .only-dark{display:inline-flex}:root[data-theme='dark'] .only-light{display:none}
:root[data-theme='light'] .only-dark{display:none}:root[data-theme='light'] .only-light{display:inline-flex}
</style>
<script>try{var t=localStorage.getItem('kl-theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}</script>
${head}
${ld}
</head>
<body class="${bodyClass}">
${masthead(latest)}
<main id="main">
${main}
</main>
${footer(categories)}
<script src="/assets/${js}" defer></script>
</body>
</html>`;
}

/* ---- components ---------------------------------------------------------- */
function pic(a, size = '800', cls = '', sizes = '(max-width:720px) 100vw, 400px', eager = false) {
  const img = a.image || {};
  const src = size === '1600' ? img.w1600 : img.w800;
  if (!src) return `<div class="ph"></div>`;
  const srcset = `${img.w800} 800w, ${img.w1600} 1600w`;
  return `<img class="${cls}" src="${esc(src)}" srcset="${esc(srcset)}" sizes="${sizes}" alt="${esc(a.image_alt || a.title)}" loading="${eager ? 'eager' : 'lazy'}" ${eager ? 'fetchpriority="high"' : ''} decoding="async" width="800" height="600" />`;
}

function card(a, i, variant = '') {
  return `
<article class="card ${variant} reveal" data-d="${(i % 3) + 1}">
  <a href="/${esc(a.slug)}/" class="card__media">
    <span class="card__num">${slug2(i + 1)}</span>
    ${pic(a, variant.includes('wide') ? '1600' : '800', '', '(max-width:720px) 100vw, 420px')}
    ${a.category ? `<span class="card__cat">${esc(a.category)}</span>` : ''}
  </a>
  <div class="card__body">
    <h3 class="card__title"><a href="/${esc(a.slug)}/">${esc(a.title)}</a></h3>
    ${a.dek ? `<p class="card__dek">${esc(a.dek)}</p>` : ''}
    <div class="card__meta"><span>${frDate(a.date)}</span><span class="dot"></span><span>${a.reading_time || 6} min</span></div>
  </div>
</article>`;
}

/* ---- home ---------------------------------------------------------------- */
export function home(articles, categories) {
  const [lead, ...rest] = articles;
  const side = rest.slice(0, 6);
  const grid = rest.slice(6, 15);
  const indexItems = articles.slice(0, 46);
  const cats = categories.slice(0, 9);

  const gridHtml = grid
    .map((a, i) => card(a, i + side.length + 1, i === 0 ? 'card--wide' : i === 5 ? 'card--wide' : ''))
    .join('');

  const chips = `<button class="chip" data-cat="all" aria-pressed="true">Tout</button>` +
    cats.map((c) => `<button class="chip" data-cat="${esc(c.name)}">${esc(c.name)}</button>`).join('');

  const rows = indexItems
    .map((a, i) => `
<a class="index-row" href="/${esc(a.slug)}/" data-cat="${esc(a.category || '')}">
  <span class="index-row__num">${slug2(i + 1)}</span>
  <span class="index-row__title"><span class="t-cat">${esc(a.category || 'Article')}</span>${esc(a.title)}</span>
  <span class="index-row__meta">${frDate(a.date)} · ${a.reading_time || 6} min</span>
</a>`).join('');

  const main = `
<section class="cover">
  <div class="wrap--wide">
    <p class="eyebrow reveal">Édition du jour · ${frDate(lead?.date || new Date())}</p>
    <div class="cover__grid" style="margin-top:1.2rem">
      <div class="cover__lead reveal" data-d="1">
        <a href="/${esc(lead?.slug || '')}/" class="cover__media clip-reveal">
          <span class="cover__badge">À la une</span>
          ${lead ? pic(lead, '1600', '', '(max-width:900px) 100vw, 760px', true) : ''}
        </a>
        <div class="cover__body">
          <p class="eyebrow eyebrow--flame">${esc(lead?.category || 'Le grand format')}</p>
          <h1 class="cover__title" style="margin-top:.7rem"><a href="/${esc(lead?.slug || '')}/">${esc(lead?.title || '')}</a></h1>
          ${lead?.dek ? `<p class="cover__dek">${esc(lead.dek)}</p>` : ''}
          <div class="cover__meta"><span>${frDate(lead?.date)}</span> · <span>${lead?.reading_time || 8} min de lecture</span></div>
        </div>
      </div>
      <div class="cover__side">
        ${side.map((a, i) => `
        <a href="/${esc(a.slug)}/" class="side-story reveal" data-d="${i + 1}">
          <div class="side-story__media">${pic(a, '800', '', '96px')}</div>
          <div>
            <p class="eyebrow">${esc(a.category || 'Article')}</p>
            <h3>${esc(a.title)}</h3>
          </div>
        </a>`).join('')}
      </div>
    </div>
  </div>
</section>

<div class="wrap--wide"><hr class="rule" /></div>

<section class="mag">
  <div class="wrap--wide">
    <div class="section-head reveal">
      <div><p class="eyebrow">La sélection</p><h2>Ce qu’il faut lire</h2></div>
      <a class="more" href="/index/">Tout l’index ${I.arrow}</a>
    </div>
    <div class="mag-grid">${gridHtml}</div>
  </div>
</section>

<section class="index-sec">
  <div class="wrap--wide">
    <div class="section-head reveal">
      <div><p class="eyebrow">L’annuaire éditorial</p><h2>L’Index</h2></div>
    </div>
    <div class="index-filter reveal">${chips}</div>
    <div class="index-list">${rows}</div>
    <div class="index-more"><a class="btn btn--ghost" href="/index/">Voir les ${articles.length} articles ${I.arrow}</a></div>
  </div>
</section>

<section class="band">
  <div class="wrap--wide band__inner">
    <div class="reveal">
      <h2>Un média qui <em>référence</em> le meilleur du web.</h2>
      <p>Chaque semaine, nos guides les plus complets et nos décryptages directement dans votre boîte mail. Zéro bruit, que du signal.</p>
    </div>
    <form class="band__form reveal" data-d="1" onsubmit="return false">
      <input type="email" placeholder="votre@email.fr" aria-label="Votre email" required />
      <button class="btn" type="submit">S’abonner</button>
    </form>
  </div>
  <div class="band__deco" aria-hidden="true">KL</div>
</section>`;

  return {
    main,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    canonical: SITE.url + '/',
    ogImage: lead?.image?.w1600 ? SITE.url + lead.image.w1600 : undefined,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.name,
      url: SITE.url + '/',
      description: SITE.description,
      inLanguage: 'fr-FR',
      potentialAction: {
        '@type': 'SearchAction',
        target: SITE.url + '/index/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  };
}

/* ---- article ------------------------------------------------------------- */
export function article(a, related) {
  const toc = (a.toc || []).length
    ? `<div class="art-toc"><h4>Au sommaire</h4><nav>${a.toc.map((t) => `<a href="#${esc(t.id)}">${esc(t.label)}</a>`).join('')}</nav>
       <div class="art-share">
         <button data-share="copy" aria-label="Copier le lien" title="Copier le lien">${I.link}</button>
         <button data-share="x" aria-label="Partager sur X">${I.x}</button>
         <button data-share="linkedin" aria-label="Partager sur LinkedIn">${I.linkedin}</button>
       </div></div>`
    : '';

  const takeaways = (a.key_takeaways || []).length
    ? `<aside class="takeaways reveal"><h3>${I.arrow} L’essentiel</h3><ul>${a.key_takeaways.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></aside>`
    : '';

  const faq = (a.faq || []).length
    ? `<section class="art-faq" style="grid-column:2;margin-top:3.5rem">
        <div class="section-head"><div><p class="eyebrow">Questions fréquentes</p><h2 style="font-size:clamp(1.6rem,3.4vw,2.3rem)">On vous répond</h2></div></div>
        <div class="faq">${a.faq.map((f) => `
          <details class="faq__item">
            <summary class="faq__q">${esc(f.q)}<span class="plus" aria-hidden="true"></span></summary>
            <div class="faq__a"><div class="faq__a-inner">${f.a_html || `<p>${esc(f.a)}</p>`}</div></div>
          </details>`).join('')}</div>
      </section>`
    : '';

  const tags = (a.tags || []).length
    ? `<div class="art-tags" style="grid-column:2">${a.tags.map((t) => `<span class="tag">#${esc(t)}</span>`).join('')}</div>`
    : '';

  const relatedHtml = related.length
    ? `<section class="related"><div class="wrap--wide">
        <div class="section-head reveal"><div><p class="eyebrow">À lire aussi</p><h2>Dans la même veine</h2></div><a class="more" href="/index/">Tout l’index ${I.arrow}</a></div>
        <div class="mag-grid">${related.slice(0, 3).map((r, i) => card(r, i)).join('')}</div>
      </div></section>`
    : '';

  const main = `
<div class="readbar" aria-hidden="true"></div>
<article>
  <header class="art-hero"><div class="wrap">
    <div class="art-hero__head reveal">
      <p class="eyebrow">${esc(a.category || 'Article')}</p>
      <h1 class="art-title">${esc(a.title)}</h1>
      ${a.dek ? `<p class="art-dek">${esc(a.dek)}</p>` : ''}
      <div class="art-meta">
        <span>Par la rédaction KL-Annuaire</span><span class="dot"></span>
        <span>${frDate(a.date)}</span><span class="dot"></span>
        <span>${a.reading_time || 8} min de lecture</span>
      </div>
    </div>
  </div></header>

  <div class="wrap">
    <figure class="art-figure reveal">${pic(a, '1600', '', '(max-width:1100px) 100vw, 1000px', true)}
      ${a.image_caption ? `<figcaption>${esc(a.image_caption)}</figcaption>` : ''}
    </figure>
  </div>

  <div class="wrap art-layout">
    <aside class="art-aside">${toc}</aside>
    <div class="prose">
      ${takeaways}
      ${a.lead_html || ''}
      ${a.body_html || ''}
    </div>
    ${faq}
    ${tags}
  </div>
</article>
${relatedHtml}`;

  const canonical = `${SITE.url}/${a.slug}/`;
  const ogImage = a.image?.w1600 ? SITE.url + a.image.w1600 : undefined;
  return {
    main,
    bodyClass: 'is-article',
    title: `${a.title} — ${SITE.name}`,
    description: a.dek || a.meta_description || '',
    canonical,
    ogType: 'article',
    ogImage,
    jsonld: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: a.title,
      description: a.dek || a.meta_description || '',
      image: ogImage ? [ogImage] : undefined,
      datePublished: isoDate(a.date),
      dateModified: isoDate(a.modified || a.date),
      author: { '@type': 'Organization', name: SITE.name },
      publisher: { '@type': 'Organization', name: SITE.name, logo: { '@type': 'ImageObject', url: SITE.url + '/images/logo.png' } },
      mainEntityOfPage: canonical,
      articleSection: a.category,
      ...( (a.faq||[]).length ? {} : {} ),
    },
    faqLd: (a.faq || []).length
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: a.faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a || String(f.a_html || '').replace(/<[^>]+>/g, ' ').trim() },
          })),
        }
      : null,
  };
}

/* ---- generic page (legal / about) --------------------------------------- */
export function simplePage(o) {
  const main = `
<header class="page-head"><div class="wrap">
  <p class="eyebrow reveal">${esc(o.eyebrow || 'KL-Annuaire')}</p>
  <h1 class="reveal" data-d="1">${esc(o.title)}</h1>
  ${o.dek ? `<p class="art-dek reveal" data-d="2" style="margin-inline:0;max-width:60ch">${esc(o.dek)}</p>` : ''}
</div></header>
<div class="wrap art-layout">
  <div class="art-aside"></div>
  <div class="prose">${o.html}</div>
</div>`;
  return { main, title: `${o.title} — ${SITE.name}`, description: o.dek || o.title, canonical: o.canonical };
}

/* ---- index (full listing) ------------------------------------------------ */
export function indexPage(articles, categories) {
  const cats = categories.slice(0, 14);
  const chips = `<button class="chip" data-cat="all" aria-pressed="true">Tout (${articles.length})</button>` +
    cats.map((c) => `<button class="chip" data-cat="${esc(c.name)}">${esc(c.name)} (${c.count})</button>`).join('');
  const rows = articles.map((a, i) => `
<a class="index-row" href="/${esc(a.slug)}/" data-cat="${esc(a.category || '')}">
  <span class="index-row__num">${slug2(i + 1)}</span>
  <span class="index-row__title"><span class="t-cat">${esc(a.category || 'Article')}</span>${esc(a.title)}</span>
  <span class="index-row__meta">${frDate(a.date)} · ${a.reading_time || 6} min</span>
</a>`).join('');
  const main = `
<header class="page-head"><div class="wrap--wide">
  <p class="eyebrow reveal">L’annuaire éditorial complet</p>
  <h1 class="reveal" data-d="1">L’Index</h1>
  <p class="art-dek reveal" data-d="2" style="margin-inline:0;max-width:62ch">Les ${articles.length} publications de KL-Annuaire, référencées et classées. Filtrez par rubrique pour trouver exactement ce que vous cherchez.</p>
</div></header>
<section class="index-sec" style="border-top:0">
  <div class="wrap--wide">
    <div class="index-filter reveal">${chips}</div>
    <div class="index-list">${rows}</div>
  </div>
</section>`;
  return { main, title: `L’Index — ${SITE.name}`, description: `Les ${articles.length} articles de KL-Annuaire, classés par rubrique.`, canonical: SITE.url + '/index/' };
}

/* ---- rubriques hub ------------------------------------------------------- */
export function rubriquesPage(categories) {
  const cards = categories.map((c, i) => `
<a class="card reveal" data-d="${(i % 3) + 1}" href="/rubrique/${esc(c.slug)}/" style="grid-column:span 4">
  <div class="card__media">${c.cover ? pic(c.cover, '800') : ''}<span class="card__cat">${c.count} articles</span></div>
  <div class="card__body"><h3 class="card__title">${esc(c.name)}</h3><p class="card__dek">${esc(c.blurb || '')}</p></div>
</a>`).join('');
  const main = `
<header class="page-head"><div class="wrap--wide">
  <p class="eyebrow reveal">Explorer par thème</p>
  <h1 class="reveal" data-d="1">Les rubriques</h1>
</div></header>
<section class="mag"><div class="wrap--wide"><div class="mag-grid">${cards}</div></div></section>`;
  return { main, title: `Rubriques — ${SITE.name}`, description: 'Explorez KL-Annuaire par rubrique thématique.', canonical: SITE.url + '/rubriques/' };
}

export function categoryPage(cat, articles) {
  const [lead, ...rest] = articles;
  const main = `
<header class="page-head"><div class="wrap--wide">
  <p class="eyebrow reveal">Rubrique</p>
  <h1 class="reveal" data-d="1">${esc(cat.name)}</h1>
  <p class="art-dek reveal" data-d="2" style="margin-inline:0">${esc(cat.blurb || '')} · ${articles.length} articles</p>
</div></header>
<section class="mag"><div class="wrap--wide"><div class="mag-grid">${articles.map((a, i) => card(a, i, i === 0 ? 'card--wide' : '')).join('')}</div></div></section>`;
  return { main, title: `${cat.name} — ${SITE.name}`, description: cat.blurb || `Tous les articles de la rubrique ${cat.name}.`, canonical: `${SITE.url}/rubrique/${cat.slug}/` };
}

/* ---- 404 ----------------------------------------------------------------- */
export function notFound() {
  const main = `
<section class="nf"><div class="wrap">
  <div class="nf__code">404</div>
  <p class="eyebrow" style="justify-content:center;margin-top:1rem">Page introuvable</p>
  <h1 class="art-title" style="font-size:clamp(1.6rem,4vw,2.6rem);margin-top:1rem">Cette page n’est pas (ou plus) référencée.</h1>
  <p class="art-dek" style="margin-top:1rem">Elle a peut-être changé d’adresse. Revenez à la une ou explorez l’index complet.</p>
  <div style="margin-top:2rem;display:flex;gap:.7rem;justify-content:center;flex-wrap:wrap">
    <a class="btn" href="/">Retour à la une</a>
    <a class="btn btn--ghost" href="/index/">L’Index</a>
  </div>
</div></section>`;
  return { main, title: `Page introuvable — ${SITE.name}`, description: 'Page introuvable', canonical: SITE.url + '/404/' };
}
