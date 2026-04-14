/* ============================================
   MAIN JAVASCRIPT
   EVaayu Design Studio — Divya Bhatt Portfolio
   ============================================
   Sections:
     1. Nav — sticky scroll + hamburger menu
     2. Smooth scroll
     3. Scroll reveal (IntersectionObserver)
     4. Skill bar animation
     5. Count-up animation
     6. Portfolio filter
     7. Lightbox
     8. Contact form
   ============================================ */


/* ============================================
   1. NAV — Sticky scroll state + hamburger
   ============================================ */
const nav        = document.getElementById('nav');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ============================================
   2. SMOOTH SCROLL — All anchor links
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ============================================
   3. SCROLL REVEAL — Fade-in on scroll
   ============================================ */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ============================================
   4. SKILL BAR & TOPIC BAR ANIMATION
   ============================================ */
const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Skill progress bars
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          const width = fill.getAttribute('data-width');
          setTimeout(() => {
            fill.style.width = width + '%';
          }, 200);
        });

        // Content topic bars
        entry.target.querySelectorAll('.topic-bar').forEach(bar => {
          const width = bar.getAttribute('data-width');
          setTimeout(() => {
            bar.style.width = width + '%';
          }, 300);
        });

        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('#skills, #social').forEach(el => skillObserver.observe(el));


/* ============================================
   5. COUNT-UP ANIMATION — Stats strip
   ============================================ */
const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          const targetVal = parseInt(el.getAttribute('data-count'), 10);
          let current     = 0;
          const duration  = 1400;
          const step      = targetVal / (duration / 16);

          const timer = setInterval(() => {
            current += step;
            if (current >= targetVal) {
              current = targetVal;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current) + '+';
          }, 16);
        });

        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('#stats').forEach(el => countObserver.observe(el));


/* ============================================
   6. PORTFOLIO FILTER
   ============================================ */
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active state
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      const matches = filter === 'all' || item.getAttribute('data-category') === filter;

      if (matches) {
        item.style.opacity   = '1';
        item.style.transform = 'scale(1)';
      } else {
        item.style.opacity   = '0.2';
        item.style.transform = 'scale(0.97)';
      }
    });
  });
});


/* ============================================
   7. LIGHTBOX — Click portfolio item to expand
   ============================================ */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img   = item.querySelector('.portfolio-img');
    const title = item.getAttribute('data-title');
    const cat   = item.getAttribute('data-cat');

    lightboxImg.src           = img.src;
    lightboxImg.alt           = title;
    lightboxCaption.textContent = `${cat} — ${title}`;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}


/* ============================================
   8. CONTACT FORM — Submit feedback
   ============================================ */
function handleFormSubmit(e) {
  e.preventDefault();

  const btn      = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;

  btn.textContent       = 'Message Sent ✓';
  btn.style.background  = '#4a7c59';
  btn.disabled          = true;

  setTimeout(() => {
    btn.textContent      = original;
    btn.style.background = '';
    btn.disabled         = false;
    e.target.reset();
  }, 3000);
}
