/* India Livestock Show 2027 — Scroll & Interaction JS */

// === NAV SCROLL EFFECT ===
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// === REVEAL ON SCROLL (Intersection Observer) ===
const revealEls = document.querySelectorAll(
  '.stats__card, .participate__card, .testimonials__card, .media__cell, .promos__item, .about__img-card, .timeline__item, .credibility__item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform.replace('translateY(24px)', 'translateY(0)') || '';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${i * 0.05}s, transform 0.55s ease ${i * 0.05}s`;
  observer.observe(el);
});

// === SMOOTH ANCHOR SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// === COUNTDOWN TIMER ===
function updateCountdown() {
  const targetDate = new Date('January 28, 2027 10:00:00').getTime();
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const daysEl = document.getElementById('days');
    if (daysEl) {
      daysEl.innerText = days.toString().padStart(3, '0');
    }
  }
}

// Update every 24 hours (since we only show days)
updateCountdown();
setInterval(updateCountdown, 1000 * 60 * 60 * 24);

// === MOBILE BURGER MENU ===
const burger = document.querySelector('.nav__burger');
const navLinks = document.querySelector('.nav__links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.contains('mobile-open');
    if (open) {
      navLinks.classList.remove('mobile-open');
      navLinks.style.display = 'none';
    } else {
      navLinks.classList.add('mobile-open');
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '64px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(10,30,16,0.98)';
      navLinks.style.padding = '1.5rem 2rem';
      navLinks.style.gap = '1.2rem';
      navLinks.style.zIndex = '99';
    }
  });
}
