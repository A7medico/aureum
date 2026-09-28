/* ================================================================
   AUREUM — Interactive Behaviors
   Scroll animations, counter effects, navigation states
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollReveal();
  initCounterAnimation();
  initSmoothScroll();
  initParallaxSunburst();
});

/* ----------------------------------------------------------------
   NAVIGATION — Scroll state & mobile toggle
   ---------------------------------------------------------------- */
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  const overlayLinks = overlay.querySelectorAll('.overlay-link');

  // Scroll state
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScroll = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScroll > 60) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile toggle
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });

  // Close overlay on link click
  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ----------------------------------------------------------------
   SCROLL REVEAL — Intersection Observer for entrance animations
   ---------------------------------------------------------------- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');

  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------------
   COUNTER ANIMATION — Animated number counting for stats
   ---------------------------------------------------------------- */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseFloat(element.dataset.count);
  const decimals = parseInt(element.dataset.decimals) || 0;
  const duration = 2000;
  const startTime = performance.now();

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const current = target * easedProgress;

    if (decimals > 0) {
      element.textContent = current.toFixed(decimals);
    } else {
      element.textContent = Math.floor(current);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (decimals > 0) {
        element.textContent = target.toFixed(decimals);
      } else {
        element.textContent = target;
      }
    }
  }

  requestAnimationFrame(update);
}

/* ----------------------------------------------------------------
   SMOOTH SCROLL — Enhanced smooth scrolling for anchor links
   ---------------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const navHeight = document.getElementById('main-nav').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ----------------------------------------------------------------
   PARALLAX SUNBURST — Subtle parallax on the hero sunburst
   ---------------------------------------------------------------- */
function initParallaxSunburst() {
  const sunburst = document.querySelector('.hero-sunburst');
  if (!sunburst) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;

        if (scrolled < heroHeight) {
          const rotation = scrolled * 0.015;
          const scale = 1 + scrolled * 0.0003;
          sunburst.style.transform = `rotate(${rotation}deg) scale(${scale})`;
        }

        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ----------------------------------------------------------------
   GOLD SHIMMER — Add shimmer class on button interaction
   ---------------------------------------------------------------- */
const applyBtn = document.getElementById('apply-btn');
if (applyBtn) {
  applyBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Visual feedback ripple
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.2);
      animation: rippleFade 0.6s ease-out forwards;
    `;
    applyBtn.style.position = 'relative';
    applyBtn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
}

/* ----------------------------------------------------------------
   ACTIVE SECTION HIGHLIGHTING — Nav link active state on scroll
   ---------------------------------------------------------------- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  let ticking = false;

  function updateActiveLink() {
    const scrollPos = window.scrollY + 150;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = '#D4AF37';
          }
        });
      }
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });
})();
