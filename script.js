/* ========================================
   RED CYBERROOM — INTERACTIONS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  let overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  const toggleNav = () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleNav);
  overlay.addEventListener('click', toggleNav);

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('open')) toggleNav();
    });
  });

  // ---- Day / Night pricing toggle ----
  const toggleDay = document.getElementById('toggleDay');
  const toggleNight = document.getElementById('toggleNight');
  const priceAmounts = document.querySelectorAll('.price-amount');

  const setPricing = (time) => {
    toggleDay.classList.toggle('active', time === 'day');
    toggleNight.classList.toggle('active', time === 'night');

    priceAmounts.forEach(el => {
      const value = el.dataset[time];
      if (value) {
        const valueEl = el.querySelector('.price-value');
        if (valueEl) {
          animateNumber(valueEl, parseInt(valueEl.textContent), parseInt(value));
        }
      }
    });
  };

  toggleDay.addEventListener('click', () => setPricing('day'));
  toggleNight.addEventListener('click', () => setPricing('night'));

  function animateNumber(el, from, to) {
    const duration = 400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  // ---- Scroll-triggered animations ----
  const animatedElements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animatedElements.forEach(el => observer.observe(el));

  // ---- Hero particles ----
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer && window.innerWidth > 768) {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: ${Math.random() > 0.5 ? 'rgba(227, 24, 55, 0.3)' : 'rgba(0, 229, 255, 0.2)'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleDrift ${8 + Math.random() * 12}s linear infinite;
        animation-delay: ${-Math.random() * 10}s;
      `;
      particlesContainer.appendChild(particle);
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleDrift {
        0% { transform: translate(0, 0) scale(1); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${60 + Math.random() * 100}px, -${100 + Math.random() * 200}px) scale(0); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // ---- Smooth anchor scrolling with offset ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = navbar.offsetHeight + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
