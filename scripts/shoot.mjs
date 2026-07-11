import { chromium } from 'playwright-core';
import fs from 'node:fs';

const OUT = '/tmp/claude-0/-home-user-kl-annuaire-fr/f57cecec-30b2-5645-9753-2cad6652e93c/scratchpad';
const BASE = 'http://localhost:4321';

// Locate the pre-installed chromium executable.
function findChrome() {
  const roots = fs.readdirSync('/opt/pw-browsers').filter((d) => d.startsWith('chromium-'));
  for (const r of roots) {
    const p = `/opt/pw-browsers/${r}/chrome-linux/chrome`;
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

const shots = [
  ['/', 'home', 1440, false, 0],
  ['/', 'home-mobile', 390, false, 0],
  ['/peut-on-congeler-des-muffins-sans-perdre-leur-moelleux/', 'article', 1440, false, 0],
  ['/peut-on-congeler-des-muffins-sans-perdre-leur-moelleux/', 'article-body', 1440, false, 2100],
  ['/peut-on-congeler-des-muffins-sans-perdre-leur-moelleux/', 'article-body2', 1440, false, 3400],
  ['/index/', 'index', 1440, false, 0],
];

const theme = process.argv[2] || 'light';

const b = await chromium.launch({ executablePath: findChrome(), args: ['--no-sandbox'] });
for (const [url, name, width, full, scrollY] of shots) {
  const ctx = await b.newContext({
    viewport: { width, height: Math.round(width * 0.72) },
    deviceScaleFactor: 2,
    colorScheme: theme === 'dark' ? 'dark' : 'light',
  });
  const page = await ctx.newPage();
  await page.goto(BASE + url, { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.querySelectorAll('.reveal,.clip-reveal').forEach((e) => e.classList.add('in')); });
  if (scrollY) { await page.evaluate((y) => window.scrollTo(0, y), scrollY); await page.waitForTimeout(400); }
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${name}-${theme}.png`, fullPage: full });
  await ctx.close();
  console.log('shot', name, theme);
}
await b.close();
