/* ============================================================
   PORTFOLIO — Interactive Features
   ============================================================ */

'use strict';

/* ── Utility ──────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Navigation ───────────────────────────────────────────── */
function initNav() {
  const nav = $('.nav');
  const toggle = $('.nav-mobile-toggle');
  const links = $('.nav-links');
  const navLinks = $$('.nav-link[href^="#"]');

  // Scroll state
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('mobile-open');
      toggle.setAttribute('aria-expanded', open);
      $$('.nav-mobile-toggle span').forEach((span, i) => {
        if (open) {
          if (i === 0) span.style.transform = 'translateY(6.5px) rotate(45deg)';
          if (i === 1) span.style.opacity = '0';
          if (i === 2) span.style.transform = 'translateY(-6.5px) rotate(-45deg)';
        } else {
          span.style.transform = '';
          span.style.opacity = '';
        }
      });
    });

    // Close on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', false);
        $$('.nav-mobile-toggle span').forEach(span => {
          span.style.transform = '';
          span.style.opacity = '';
        });
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        links.classList.remove('mobile-open');
      }
    });
  }

  // Active section highlight (homepage only — spy links carry .js-nav-spy)
  const sections = $$('section[id]');
  const spyLinks = $$('.js-nav-spy');
  if (sections.length && spyLinks.length) {
    const updateActive = () => {
      const scrollY = window.scrollY + 100;
      let current = '';
      sections.forEach(sec => {
        if (sec.offsetTop <= scrollY) current = sec.id;
      });
      spyLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === `#${current}` || href === `/#${current}`);
      });
    };
    window.addEventListener('scroll', updateActive, { passive: true });
  }
}

/* ── Reveal on Scroll ─────────────────────────────────────── */
function initReveal() {
  const els = $$('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ── Research Filter ──────────────────────────────────────── */
function initResearchFilter() {
  const filterBtns = $$('.filter-btn');
  const cards = $$('.paper-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        if (filter === 'all') {
          card.style.display = '';
          return;
        }
        const tags = (card.dataset.tags || '').toLowerCase();
        const status = (card.dataset.status || '').toLowerCase();
        const matches = tags.includes(filter.toLowerCase()) || status === filter.toLowerCase();
        card.style.display = matches ? '' : 'none';
      });
    });
  });
}

/* ── Paper Preview Modal ──────────────────────────────────── */
function initPaperModal() {
  const modal        = $('#pdf-modal');
  const backdrop     = $('#modal-backdrop');
  const closeBtn     = $('#modal-close');
  const iframe       = $('#pdf-iframe');
  const loading      = $('#viewer-loading');
  const unavailable  = $('#viewer-unavailable');
  const titleEl      = $('#modal-title');
  const venueEl      = $('#modal-venue');
  const yearEl       = $('#modal-year');
  const authorsEl    = $('#modal-authors');
  const abstractEl   = $('#modal-abstract');
  const tagsEl       = $('#modal-tags');
  const linksEl      = $('#modal-links');

  if (!modal) return;

  function openModal(data) {
    // Populate metadata
    titleEl.textContent    = data.title    || '';
    venueEl.textContent    = data.venue    || '';
    yearEl.textContent     = data.year     || '';
    authorsEl.innerHTML    = data.authors  || '';
    abstractEl.textContent = data.abstract || '';

    // Tags
    tagsEl.innerHTML = '';
    if (data.tags) {
      data.tags.split(',').forEach(tag => {
        const span = document.createElement('span');
        span.className = 'paper-tag';
        span.textContent = tag.trim();
        tagsEl.appendChild(span);
      });
    }

    // Links
    linksEl.innerHTML = '';
    if (data.doi) {
      linksEl.appendChild(makeLink('DOI', data.doi, 'link-external'));
    }
    if (data.arxiv) {
      linksEl.appendChild(makeLink('arXiv', data.arxiv, 'file-text'));
    }
    if (data.code) {
      linksEl.appendChild(makeLink('Code', data.code, 'code'));
    }
    if (data.pdf) {
      linksEl.appendChild(makeLink('Download PDF', data.pdf, 'download', 'btn-outline'));
    }

    // PDF iframe
    const pdfUrl = data.pdf;
    loading.classList.remove('hidden');
    unavailable.style.display = 'none';
    iframe.src = '';

    if (pdfUrl && pdfUrl !== 'null') {
      iframe.onload = () => loading.classList.add('hidden');
      iframe.onerror = () => {
        loading.style.display = 'none';
        unavailable.style.display = 'flex';
      };
      iframe.src = pdfUrl;
    } else {
      loading.style.display = 'none';
      unavailable.style.display = 'flex';
    }

    // Open
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      iframe.src = '';
      loading.style.display = '';
      loading.classList.remove('hidden');
      unavailable.style.display = 'none';
    }, 300);
  }

  function makeLink(label, href, icon, extraClass = '') {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = `btn btn-ghost btn-sm ${extraClass}`;
    a.innerHTML = `${getIcon(icon)} ${label}`;
    return a;
  }

  // Trigger buttons
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action="preview-paper"]');
    if (btn) {
      e.preventDefault();
      openModal(btn.dataset);
    }
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
}

/* ── CV Modal ─────────────────────────────────────────────── */
function initCVModal() {
  const modal       = $('#cv-modal');
  const backdrop    = $('#cv-modal-backdrop');
  const closeBtn    = $('#cv-modal-close');
  const iframe      = $('#cv-iframe');
  const loading     = $('#cv-viewer-loading');
  const unavailable = $('#cv-viewer-unavailable');
  const updatedEl   = $('#cv-updated');
  const downloadBtn = $('#cv-download-btn');

  if (!modal) return;

  function openCVModal(cvUrl, updated) {
    if (updatedEl) updatedEl.textContent = updated || '';
    if (downloadBtn) downloadBtn.href = cvUrl || '#';

    loading.classList.remove('hidden');
    loading.style.display = '';
    unavailable.style.display = 'none';
    iframe.src = '';

    if (cvUrl && cvUrl !== 'null') {
      iframe.onload = () => loading.classList.add('hidden');
      iframe.src = cvUrl;
    } else {
      loading.style.display = 'none';
      unavailable.style.display = 'flex';
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCVModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { iframe.src = ''; }, 300);
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action="preview-cv"]');
    if (btn) {
      e.preventDefault();
      openCVModal(btn.dataset.cvUrl, btn.dataset.cvUpdated);
    }
  });

  closeBtn.addEventListener('click', closeCVModal);
  backdrop.addEventListener('click', closeCVModal);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeCVModal();
  });
}

/* ── Inline CV Frame ──────────────────────────────────────── */
function initInlineCVFrame() {
  const frame       = $('#cv-inline-iframe');
  const loading     = $('#cv-inline-loading');
  const unavailable = $('#cv-inline-unavailable');
  if (!frame) return;

  const src = frame.dataset.src;
  if (src && src !== 'null') {
    if (loading) loading.style.display = 'none';
    frame.src = src;
  } else {
    if (loading) loading.style.display = 'none';
    if (unavailable) unavailable.style.display = 'flex';
  }
}

/* ── Smooth scroll offset ─────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ── Animated counter ─────────────────────────────────────── */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();

      const tick = now => {
        const t = Math.min((now - start) / duration, 1);
        // easeOutExpo
        const ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        el.textContent = Math.floor(ease * target).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toLocaleString();
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
}

/* ── Icons (inline SVG helpers) ──────────────────────────── */
function getIcon(name) {
  const icons = {
    'link-external': `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    'file-text':     `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    'code':          `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    'download':      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
    'eye':           `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  };
  return icons[name] || '';
}

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initResearchFilter();
  initPaperModal();
  initCVModal();
  initInlineCVFrame();
  initSmoothScroll();
  initCounters();
});
