// Fetch all WordPress posts (metadata + original content for reference) and
// download + optimize their featured images. Zero WP dependency at runtime;
// this runs once locally and commits the resulting JSON + optimized images.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const BASE = 'https://www.kl-annuaire.fr/wp-json/wp/v2';
const ROOT = path.resolve(import.meta.dirname, '..');
const RAW = path.join(ROOT, 'content/wp-raw');
const FEAT = path.join(ROOT, 'public/images/featured');

const decodeEntities = (s = '') =>
  s
    .replace(/&#8217;|&#039;|&#39;/g, '’')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8230;/g, '…')
    .replace(/&#160;|&nbsp;/g, ' ')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

const stripTags = (s = '') => decodeEntities(s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

async function fetchJSON(url, tries = 4) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'kl-annuaire-migrator/1.0' } });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) {
      if (i === tries - 1) throw e;
      await new Promise((res) => setTimeout(res, 1000 * 2 ** i));
    }
  }
}

async function optimizeImage(buf, slug) {
  // Produce a 1600px-wide webp (hero) + 800px webp (card) for responsive srcset.
  const base = sharp(buf, { failOn: 'none' }).rotate();
  const meta = await base.metadata();
  const w = meta.width || 1600;
  await sharp(buf, { failOn: 'none' })
    .rotate()
    .resize({ width: Math.min(1600, w), withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(FEAT, `${slug}-1600.webp`));
  await sharp(buf, { failOn: 'none' })
    .rotate()
    .resize({ width: Math.min(800, w), withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(path.join(FEAT, `${slug}-800.webp`));
  return { w1600: `/images/featured/${slug}-1600.webp`, w800: `/images/featured/${slug}-800.webp`, srcW: meta.width, srcH: meta.height };
}

async function main() {
  await fs.mkdir(RAW, { recursive: true });
  await fs.mkdir(FEAT, { recursive: true });

  const perPage = 100;
  const total = 590;
  const pages = Math.ceil(total / perPage);
  const posts = [];

  for (let p = 1; p <= pages; p++) {
    const url = `${BASE}/posts?per_page=${perPage}&page=${p}&_embed=1&orderby=date&order=desc`;
    process.stdout.write(`Fetching page ${p}/${pages}... `);
    const batch = await fetchJSON(url);
    console.log(`${batch.length} posts`);
    for (const wp of batch) {
      const emb = wp._embedded || {};
      const media = (emb['wp:featuredmedia'] || [])[0];
      const terms = emb['wp:term'] || [];
      const cats = terms.flat().filter((t) => t?.taxonomy === 'category').map((t) => ({ name: t.name, slug: t.slug }));
      posts.push({
        id: wp.id,
        slug: wp.slug,
        link: wp.link,
        pathname: new URL(wp.link).pathname,
        title: decodeEntities(wp.title?.rendered || ''),
        date: wp.date,
        modified: wp.modified,
        excerpt: stripTags(wp.excerpt?.rendered || ''),
        original_html: wp.content?.rendered || '',
        original_text: stripTags(wp.content?.rendered || '').slice(0, 8000),
        categories: cats,
        featured_source: media?.source_url || null,
        featured_alt: decodeEntities(media?.alt_text || ''),
      });
    }
  }

  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  await fs.writeFile(path.join(RAW, 'posts.json'), JSON.stringify(posts, null, 2));
  console.log(`\nSaved ${posts.length} posts to content/wp-raw/posts.json`);

  // Download + optimize featured images with limited concurrency.
  const withImg = posts.filter((p) => p.featured_source);
  console.log(`\nDownloading ${withImg.length} featured images...`);
  const imageMap = {};
  let done = 0, failed = 0;
  const CONC = 8;
  let idx = 0;
  async function worker() {
    while (idx < withImg.length) {
      const post = withImg[idx++];
      try {
        const r = await fetch(post.featured_source, { headers: { 'user-agent': 'kl-annuaire-migrator/1.0' } });
        if (!r.ok) throw new Error('HTTP ' + r.status);
        const buf = Buffer.from(await r.arrayBuffer());
        imageMap[post.slug] = await optimizeImage(buf, post.slug);
        done++;
        if (done % 25 === 0) console.log(`  ${done}/${withImg.length} images done`);
      } catch (e) {
        failed++;
        console.log(`  ! failed ${post.slug}: ${e.message}`);
      }
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  await fs.writeFile(path.join(RAW, 'images.json'), JSON.stringify(imageMap, null, 2));
  console.log(`\nImages: ${done} ok, ${failed} failed. Map saved to content/wp-raw/images.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
