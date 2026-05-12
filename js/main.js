(function () {
  'use strict';

  // ----- Scroll reveal -----
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  // ----- FAQ accordion -----
  document.querySelectorAll('.faq-q').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const panel = btn.nextElementSibling;
      if (panel) {
        if (expanded) {
          panel.setAttribute('hidden', '');
        } else {
          panel.removeAttribute('hidden');
        }
      }
    });
  });

  // ----- Sticky CTA visibility -----
  const sticky = document.getElementById('stickyCta');
  const hero = document.getElementById('hero');
  if (sticky && hero) {
    sticky.removeAttribute('hidden');
    const heroIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sticky.classList.remove('is-visible');
          } else {
            sticky.classList.add('is-visible');
          }
        });
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    heroIo.observe(hero);
  }

  // ----- CTA click tracking (dataLayer) -----
  document.querySelectorAll('[data-event="cta_click"]').forEach((el) => {
    el.addEventListener('click', () => {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'cta_click',
          cta_position: el.getAttribute('data-cta') || 'unknown'
        });
      }
    });
  });
})();
