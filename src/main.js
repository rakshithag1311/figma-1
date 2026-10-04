// ── Digital Observatory — Main Entry ──
import './style.css';

import { initCursor, initMagnetic }     from './utils/cursor.js';
import { initParticles }                from './utils/particles.js';
import {
  initHeroEntrance,
  initScrollReveal,
  initNav,
  initHeroLight,
  initProjectGlow,
  initHeroCta,
} from './utils/animations.js';

function boot() {
  initParticles();
  initCursor();
  initMagnetic();
  initNav();
  initHeroEntrance();
  initScrollReveal();
  initHeroLight();
  initProjectGlow();
  initHeroCta();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
