/* ============================================================
   Science to Society Hub — Main JavaScript
   ============================================================ */

/* ---------- Language System ---------- */
const LANG_KEY = 's2s-lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'en';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  // Update html lang attribute
  document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';

  // Toggle Japanese font class
  document.body.classList.toggle('lang-ja', lang === 'ja');

  // Translate all elements with data-en / data-ja
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });

  // Translate placeholders
  const inputs = document.querySelectorAll('[data-placeholder-en]');
  inputs.forEach(el => {
    const ph = el.getAttribute(`data-placeholder-${lang}`);
    if (ph) el.placeholder = ph;
  });

  // Update toggle UI
  document.getElementById('lang-en').classList.toggle('active', lang === 'en');
  document.getElementById('lang-ja').classList.toggle('active', lang === 'ja');
}

function toggleLanguage() {
  applyLanguage(currentLang === 'en' ? 'ja' : 'en');
}

/* ---------- Navigation ---------- */
function initNav() {
  const header    = document.getElementById('site-header');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  // Scroll → add .scrolled class
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

/* ---------- Scroll-triggered Fade-In ---------- */
function initFadeIn() {
  // Observe every element that already has the fade-in class in HTML
  const targets = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger within siblings that share the fade-in class
          const parent = entry.target.parentElement;
          const siblings = parent
            ? Array.from(parent.querySelectorAll(':scope > .fade-in'))
            : [];
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.max(idx, 0) * 90);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));
}

/* ---------- Contact Form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Visual feedback
    btn.disabled = true;
    btn.textContent = currentLang === 'ja' ? '送信中...' : 'Sending...';

    // Simulate async submit (replace with real endpoint)
    setTimeout(() => {
      btn.textContent = currentLang === 'ja' ? '送信しました ✓' : 'Sent ✓';
      btn.style.background = '#22c55e';
      form.reset();

      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = originalText;
        btn.style.background = '';
      }, 4000);
    }, 1200);
  });
}

/* ---------- Footer year ---------- */
function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- Active nav link on scroll ---------- */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a, .mobile-menu a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle(
              'active-link',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -40% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // Language toggle button
  document.getElementById('lang-toggle').addEventListener('click', toggleLanguage);

  // Apply saved/default language
  applyLanguage(currentLang);

  initNav();
  initFadeIn();
  initContactForm();
  setYear();
  initActiveNav();
});
