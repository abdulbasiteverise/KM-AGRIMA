/* ============================================================
   KM AGRIMA — PREMIUM BRAND WEBSITE
   script.js — Interactions, Animations, Lead Generation
   ============================================================ */

(function () {
  'use strict';

  /* ── CURSOR ─────────────────────────────────────────────── */
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }
  });

  function animateCursor() {
    if (cursorRing) {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const hoverTargets = document.querySelectorAll('a, button, .expertise-card, .service-card, .testimonial-card, .contact-channel, .wa-option, .process-step');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing && cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing && cursorRing.classList.remove('hover'));
  });

  /* ── NAVIGATION SCROLL ──────────────────────────────────── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav && nav.classList.add('scrolled');
    } else {
      nav && nav.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ── MOBILE MENU ────────────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');

  function openMenu() {
    mobileMenu && mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu && mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
  hamburger && hamburger.addEventListener('click', openMenu);
  mobileClose && mobileClose.addEventListener('click', closeMenu);
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  /* ── SCROLL REVEAL ──────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── DATA BARS ANIMATION ────────────────────────────────── */
  const barFills = document.querySelectorAll('.data-bar-fill');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.data-bar-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => fill.classList.add('animate'), i * 150);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const processVisual = document.querySelector('.process-visual-card');
  processVisual && barObserver.observe(processVisual);

  /* ── COUNTER ANIMATION ──────────────────────────────────── */
  function animateCounter(el, target, duration) {
    let start = 0;
    const step = timestamp => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = current + (el.dataset.suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterEls = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        animateCounter(el, target, 1600);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  /* ── STICKY BAR ─────────────────────────────────────────── */
  const stickyBar = document.querySelector('.sticky-bar');
  const stickyClose = document.querySelector('.sticky-btn-close');
  let stickyDismissed = false;

  window.addEventListener('scroll', () => {
    if (stickyDismissed) return;
    if (window.scrollY > 400) {
      stickyBar && stickyBar.classList.add('visible');
    }
  }, { passive: true });

  stickyClose && stickyClose.addEventListener('click', () => {
    stickyBar && stickyBar.classList.remove('visible');
    stickyDismissed = true;
  });

  /* ── WA POPUP ───────────────────────────────────────────── */
  const waPopupOverlay = document.querySelector('.wa-popup-overlay');
  const waPopupClose = document.querySelector('.wa-popup-close');

  function openWaPopup() {
    waPopupOverlay && waPopupOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeWaPopup() {
    waPopupOverlay && waPopupOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  waPopupClose && waPopupClose.addEventListener('click', closeWaPopup);
  waPopupOverlay && waPopupOverlay.addEventListener('click', (e) => {
    if (e.target === waPopupOverlay) closeWaPopup();
  });

  document.querySelectorAll('[data-wa-popup]').forEach(el => {
    el.addEventListener('click', openWaPopup);
  });

  /* ── AUTO-OPEN POPUP (exit intent or 25s) ────────────────── */
  let popupShown = false;
  function maybeShowPopup() {
    if (popupShown) return;
    popupShown = true;
    setTimeout(openWaPopup, 500);
  }

  // Exit intent on desktop
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 5 && window.scrollY > 300) maybeShowPopup();
  });
  // Time-based on mobile
  setTimeout(() => {
    if (window.scrollY > 200 && !popupShown) maybeShowPopup();
  }, 25000);

  /* ── CONTACT FORM SUBMIT ────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const name = contactForm.querySelector('#fname').value.trim();
    const company = contactForm.querySelector('#fcompany').value.trim();
    const message = contactForm.querySelector('#fmessage').value.trim();
    const interest = contactForm.querySelector('#finterest').value;

    if (!name || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const waText = encodeURIComponent(
      `Hello KM Agrima,\n\nI found your website and would like to discuss ${interest || 'analytics consulting'}.\n\nName: ${name}\nCompany: ${company || 'N/A'}\n\nMessage: ${message}`
    );
    const waUrl = `https://wa.me/918394880653?text=${waText}`;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✓ Message Sent — Redirecting to WhatsApp';
      btn.style.background = '#27ae60';
      setTimeout(() => {
        window.open(waUrl, '_blank');
        btn.textContent = 'Send Inquiry';
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 1500);
    }, 800);
  });

  /* ── TOAST NOTIFICATION ─────────────────────────────────── */
  function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed; top: 90px; right: 24px; z-index: 9999;
      background: ${type === 'error' ? '#c0392b' : '#27ae60'};
      color: white; padding: 14px 22px; border-radius: 3px;
      font-family: 'DM Sans', sans-serif; font-size: 0.84rem;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
      transform: translateX(120%); transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.transform = 'translateX(0)');
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  /* ── SMOOTH ANCHOR SCROLLING ────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── TYPING HEADLINE EFFECT ─────────────────────────────── */
  const typingEl = document.getElementById('typingHeadline');
  if (typingEl) {
    const phrases = [
      'Operational clarity powered by data.',
      'Where analytics meets executive decisions.',
      'Building real-time intelligence systems.',
      'Turning enterprise data into strategy.',
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let paused = false;

    function type() {
      const phrase = phrases[phraseIdx];
      if (paused) {
        paused = false;
        setTimeout(type, 1800);
        return;
      }
      if (!deleting) {
        typingEl.textContent = phrase.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === phrase.length) {
          deleting = true;
          paused = true;
          setTimeout(type, 2200);
          return;
        }
      } else {
        typingEl.textContent = phrase.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
        }
      }
      const speed = deleting ? 38 : 62;
      setTimeout(type, speed);
    }
    setTimeout(type, 1800);
  }

  /* ── PARALLAX HERO ──────────────────────────────────────── */
  const heroImg = document.querySelector('.hero-image');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${scrolled * 0.12}px)`;
      }
    }, { passive: true });
  }

  /* ── ACTIVE NAV LINK HIGHLIGHTING ──────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--gold)' : '';
    });
  }, { passive: true });

  /* ── TILT CARDS ─────────────────────────────────────────── */
  document.querySelectorAll('.expertise-card, .service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * 6;
      const tiltY = (x - 0.5) * -6;
      card.style.transform = `translateY(-4px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      card.style.transition = 'none';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = '';
    });
  });

})();
