/**
 * Eternia — BlackRoom Setup
 * Main JavaScript: scroll animations, parallax, particles, mobile menu, form submission
 */

document.addEventListener('DOMContentLoaded', () => {
  // ===== PRELOADER =====
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 600);
  });
  if (document.readyState === 'complete') {
    setTimeout(() => preloader.classList.add('hidden'), 600);
  }

  // ===== PARTICLES =====
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    const size = Math.random() * 3 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particlesContainer.appendChild(particle);
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // ===== MOBILE MENU =====
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navCta = document.getElementById('navCta');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    navCta.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      navCta.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ===== SCROLL REVEAL (enhanced with threshold control) =====
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach((el, index) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  }

  // ===== PARALLAX ELEMENTS (scroll-driven subtle movement) =====
  const aboutVisual = document.querySelector('.about-visual-placeholder');
  const aboutFloat = document.querySelector('.about-visual-float');
  const timelineItems = document.querySelectorAll('.timeline-item');
  const founderCards = document.querySelectorAll('.founder-card');
  const teamMembers = document.querySelectorAll('.team-member');

  function updateParallax() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // About visual subtle float
    if (aboutVisual) {
      const rect = aboutVisual.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        aboutVisual.style.transform = `translateY(${(progress - 0.5) * -20}px)`;
        if (aboutFloat) {
          aboutFloat.style.transform = `translateY(${(progress - 0.5) * -30}px)`;
        }
      }
    }

    // Timeline items — stagger parallax
    timelineItems.forEach((item, i) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        const offset = (progress - 0.5) * -15;
        item.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  // ===== PARALLAX BANDS (scroll-driven) =====
  const band1 = document.getElementById('band1');
  const band2 = document.getElementById('band2');
  const band3 = document.getElementById('band3');
  const bandContainer = document.getElementById('bandContainer');

  function updateBands() {
    if (!bandContainer) return;
    const rect = bandContainer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const offset = (scrollProgress - 0.5) * 250;

      if (band1) band1.style.transform = `translateX(${-offset * 0.6}px)`;
      if (band2) band2.style.transform = `translateX(${offset * 0.6}px)`;
      if (band3) band3.style.transform = `translateX(${-offset * 0.4}px)`;
    }
  }

  // ===== BIG STATEMENT PARALLAX =====
  const bigStatement = document.getElementById('bigStatement');

  function updateBigStatement() {
    if (!bigStatement) return;
    const rect = bigStatement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const scale = 0.88 + progress * 0.18;
      const opacity = Math.min(progress * 2, 1);
      bigStatement.style.transform = `scale(${Math.min(scale, 1.06)})`;
      bigStatement.style.opacity = opacity;
    }
  }

  // ===== MOUSE GLOW EFFECT ON CARDS =====
  function initCardGlow() {
    const cards = document.querySelectorAll('.about-feature-item, .band-item, .team-member, .enquiry-form-card, .contact-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.background = `
          radial-gradient(300px circle at ${x}px ${y}px, rgba(166, 245, 60, 0.04), transparent 40%),
          var(--glass-bg)
        `;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  }

  initCardGlow();

  // ===== COUNTER ANIMATION =====
  const statNumber = document.querySelector('.stat-number');
  let counterAnimated = false;

  function animateCounter() {
    if (!statNumber || counterAnimated) return;
    const rect = statNumber.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      counterAnimated = true;
      const target = 500;
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        statNumber.textContent = Math.floor(target * eased) + '+';

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }
  }

  // ===== SMOOTH SCROLL FOR ANCHORS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== TILT EFFECT ON FOUNDER CARDS =====
  founderCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-10px) perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== COMBINED SCROLL HANDLER =====
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleNavScroll();
        checkReveal();
        updateBands();
        updateBigStatement();
        updateParallax();
        animateCounter();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial checks
  handleNavScroll();
  checkReveal();

  // ===== FORM SUBMISSION (Google Sheets via Apps Script) =====
  const form = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');
  const formSubmitBtn = document.getElementById('formSubmitBtn');

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3C3hWafRcV55ywdBlobQbCzdIstmyPLjiFBzkSpCmmVrtXz7FUKasxSN9uE66i168qA/exec';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const org = document.getElementById('formOrg').value.trim();
    const role = document.getElementById('formRole').value;
    const email = document.getElementById('formEmail').value.trim();
    const phone = document.getElementById('formPhone').value.trim();
    const city = document.getElementById('formCity').value.trim();
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !org || !role || !email || !phone) {
      formStatus.textContent = 'Please fill in all required fields.';
      formStatus.className = 'form-status error';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Please enter a valid email address.';
      formStatus.className = 'form-status error';
      return;
    }

    // Loading state
    formSubmitBtn.disabled = true;
    formSubmitBtn.innerHTML = `
      <span style="display:inline-flex;align-items:center;gap:8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><circle cx="12" cy="12" r="10" opacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
        Submitting...
      </span>`;
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const formData = new FormData();
    formData.append('name', name);
    formData.append('organization', org);
    formData.append('role', role);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('city', city);
    formData.append('message', message);
    formData.append('timestamp', new Date().toISOString());

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        formStatus.textContent = '✅ Thank you! Your request has been submitted successfully. We\'ll reach out within 24 hours.';
        formStatus.className = 'form-status success';
        form.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      formStatus.textContent = '❌ Something went wrong. Please try again or email us directly.';
      formStatus.className = 'form-status error';
    }

    formSubmitBtn.disabled = false;
    formSubmitBtn.innerHTML = `
      Request BlackRoom Setup
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
  });

  // ===== ACTIVE NAV LINK HIGHLIGHT =====
  const sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('[data-nav]').forEach(link => {
          link.style.color = '';
        });
        const activeLink = document.querySelector(`[data-nav][href="#${id}"]`);
        if (activeLink) {
          activeLink.style.color = 'var(--text-primary)';
        }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();
});

// Add spin keyframe for loading spinner
const style = document.createElement('style');
style.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
document.head.appendChild(style);
