// ── Scroll Reveal + Hero Entrance + Misc Animations ──

// Hero entrance — runs immediately on load
export function initHeroEntrance() {
  const items = document.querySelectorAll('#hero .reveal-item');
  // Make visible after a short delay to allow font loading
  setTimeout(() => {
    items.forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
}

// Scroll reveal for all other sections
export function initScrollReveal() {
  const items = document.querySelectorAll('section:not(#hero) .reveal-item');

  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  items.forEach((el, i) => {
    // Stagger siblings in same parent
    const siblings = el.parentElement.querySelectorAll('.reveal-item');
    const idx = Array.from(siblings).indexOf(el);
    if (idx > 0) {
      el.style.transitionDelay = `${idx * 0.08}s`;
    }
    observer.observe(el);
  });
}

// Nav scroll effect + active section highlight
export function initNav() {
  const nav      = document.getElementById('nav');
  const links    = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks  = document.getElementById('nav-links');

  // Helper — close mobile nav immediately
  function closeNav() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    // Remove backdrop if present
    const bd = document.getElementById('nav-backdrop');
    if (bd) bd.remove();
  }

  // Helper — open mobile nav + inject backdrop
  function openNav() {
    if (!navLinks) return;
    navLinks.classList.add('open');
    if (hamburger) {
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    // Inject tap-outside backdrop
    if (!document.getElementById('nav-backdrop')) {
      const bd = document.createElement('div');
      bd.id = 'nav-backdrop';
      bd.style.cssText = `
        position:fixed;inset:0;z-index:98;
        background:rgba(0,0,0,0.45);
      `;
      bd.addEventListener('click', closeNav, { once: true });
      document.body.appendChild(bd);
    }
  }

  // Scroll class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    // Also close nav on scroll (mobile UX)
    closeNav();
  }, { passive: true });

  // Active link via IntersectionObserver
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));

  // Nav link click — close immediately, then scroll
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      closeNav();                                       // close first
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        // Small delay so menu closes before scroll starts
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    });
  });

  // Hamburger toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('open');
      if (isOpen) closeNav();
      else openNav();
    });
  }

  // ✕ close button inside the nav
  const closeBtn = document.getElementById('nav-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeNav);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
}

// Hero cursor-following ambient light
export function initHeroLight() {
  const hero  = document.getElementById('hero');
  const light = document.getElementById('hero-light');
  if (!hero || !light) return;

  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    light.style.background =
      `radial-gradient(circle 500px at ${x}% ${y}%, rgba(0,212,255,0.07), transparent 70%)`;
  });

  hero.addEventListener('mouseleave', () => {
    light.style.background =
      'radial-gradient(circle 400px at 50% 50%, rgba(0,212,255,0.05), transparent 70%)';
  });
}

// Project card cursor glow
export function initProjectGlow() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
}

// Hero CTA smooth scroll
export function initHeroCta() {
  const cta = document.querySelector('.hero-cta');
  if (!cta) return;
  cta.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(cta.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}
