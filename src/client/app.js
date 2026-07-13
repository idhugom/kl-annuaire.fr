/* KL-Annuaire — client interactions. Vanilla, progressive-enhancement. */
(() => {
  'use strict';
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Theme ------------------------------------------------------------- */
  const root = document.documentElement;
  const applyTheme = (t) => {
    if (t === 'light' || t === 'dark') root.setAttribute('data-theme', t);
    else root.removeAttribute('data-theme');
  };
  try { applyTheme(localStorage.getItem('kl-theme')); } catch (e) {}
  const currentTheme = () => {
    const explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-theme-toggle]');
    if (!t) return;
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('kl-theme', next); } catch (err) {}
  });

  /* ---- Scroll reveals ---------------------------------------------------- */
  const reveals = document.querySelectorAll('.reveal');
  // clip-reveal (hero wipe) clips the element's own pixels to zero width, so an
  // IntersectionObserver never sees it as visible and would never reveal it.
  // It sits above the fold, so play its wipe on load instead of on scroll.
  const clipReveals = document.querySelectorAll('.clip-reveal');
  const revealClips = () => clipReveals.forEach((el) => el.classList.add('in'));
  if (rm || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
    revealClips();
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    reveals.forEach((el) => io.observe(el));
    requestAnimationFrame(revealClips);
  }

  /* ---- Ticker: duplicate content so the marquee loops seamlessly --------- */
  const track = document.querySelector('.ticker__track');
  if (track && !rm) track.innerHTML += track.innerHTML;

  /* ---- Mobile nav -------------------------------------------------------- */
  const mnav = document.querySelector('.mobile-nav');
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-nav-open]')) mnav?.classList.add('open');
    if (e.target.closest('[data-nav-close]') || e.target.matches('.mobile-nav a')) mnav?.classList.remove('open');
  });

  /* ---- Reading progress + TOC scrollspy (article) ------------------------ */
  const bar = document.querySelector('.readbar');
  const article = document.querySelector('.prose');
  const tocLinks = Array.from(document.querySelectorAll('.art-toc a'));
  if (bar && article) {
    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      bar.style.width = (total > 0 ? (passed / total) * 100 : 0) + '%';
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  if (tocLinks.length) {
    const heads = tocLinks
      .map((a) => document.getElementById(a.getAttribute('href').slice(1)))
      .filter(Boolean);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const id = en.target.id;
            tocLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
          }
        });
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    heads.forEach((h) => spy.observe(h));
  }

  /* ---- FAQ: smooth open/close on <details> ------------------------------- */
  document.querySelectorAll('.faq__item').forEach((item) => {
    const body = item.querySelector('.faq__a');
    const inner = item.querySelector('.faq__a-inner');
    if (!body || !inner) return;
    body.style.height = item.open ? 'auto' : '0px';
    const q = item.querySelector('.faq__q');
    q?.addEventListener('click', (e) => {
      e.preventDefault();
      if (rm) { item.open = !item.open; body.style.height = item.open ? 'auto' : '0px'; return; }
      if (item.open) {
        body.style.height = inner.offsetHeight + 'px';
        requestAnimationFrame(() => { body.style.transition = 'height .35s cubic-bezier(.16,1,.3,1)'; body.style.height = '0px'; });
        body.addEventListener('transitionend', function te() { item.open = false; body.style.transition = ''; body.removeEventListener('transitionend', te); }, { once: true });
      } else {
        item.open = true;
        body.style.height = '0px';
        requestAnimationFrame(() => { body.style.transition = 'height .35s cubic-bezier(.16,1,.3,1)'; body.style.height = inner.offsetHeight + 'px'; });
        body.addEventListener('transitionend', function te() { body.style.height = 'auto'; body.style.transition = ''; body.removeEventListener('transitionend', te); }, { once: true });
      }
    });
  });

  /* ---- Index filter (home) ---------------------------------------------- */
  const chips = document.querySelectorAll('.index-filter .chip');
  const rows = document.querySelectorAll('.index-list .index-row');
  if (chips.length && rows.length) {
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const cat = chip.dataset.cat;
        chips.forEach((c) => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
        let n = 0;
        rows.forEach((row) => {
          const show = cat === 'all' || row.dataset.cat === cat;
          row.style.display = show ? '' : 'none';
          if (show) { n++; const num = row.querySelector('.index-row__num'); if (num) num.textContent = String(n).padStart(2, '0'); }
        });
      });
    });
  }

  /* ---- Share ------------------------------------------------------------- */
  document.addEventListener('click', async (e) => {
    const s = e.target.closest('[data-share]');
    if (!s) return;
    const url = location.href;
    const title = document.title;
    const kind = s.dataset.share;
    if (kind === 'native' && navigator.share) { try { await navigator.share({ title, url }); } catch (err) {} return; }
    if (kind === 'copy') {
      try { await navigator.clipboard.writeText(url); s.classList.add('copied'); setTimeout(() => s.classList.remove('copied'), 1400); } catch (err) {}
      return;
    }
    const targets = {
      x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    if (targets[kind]) window.open(targets[kind], '_blank', 'noopener,width=600,height=520');
  });

  /* ---- Cross-document View Transitions (soft page fades) ----------------- */
  if ('startViewTransition' in document && !rm) {
    // Enabled via <meta name="view-transition"> + CSS; nothing needed here for MPA
    // browsers that support the same-origin navigation transitions natively.
  }
})();
