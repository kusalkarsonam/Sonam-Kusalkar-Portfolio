document.addEventListener('DOMContentLoaded', () => {

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.getElementById('heroArt').classList.add('drawn');
    }, 900);
  });
  // fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 2500);

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById('cursor');
  const cursorBlur = document.getElementById('cursorBlur');
  if (window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursorBlur.style.left = e.clientX + 'px';
      cursorBlur.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .skill, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  /* ---------- TYPED ROLE LINE ---------- */
  const roles = ['Frontend Developer_', 'UI Engineer_', 'React Developer_', 'Interaction Builder_'];
  const roleEl = document.querySelector('.role .cur');
  if (roleEl) {
    let ri = 0, ci = 0, deleting = false;

    function tick() {
      const word = roles[ri];
      ci += deleting ? -1 : 1;
      roleEl.textContent = word.slice(0, ci);

      let delay = deleting ? 40 : 80;
      if (!deleting && ci === word.length) { delay = 1400; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; delay = 300; }

      setTimeout(tick, delay);
    }
    tick();
  }

  /* ---------- SCROLL REVEAL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ---------- NAV ACTIVE LINK ---------- */
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- THEME TOGGLE (blueprint / vellum) ---------- */
  const themeBtn = document.getElementById('themeBtn');
  const root = document.documentElement;
  const saved = localStorage.getItem('sk-theme');
  if (saved === 'vellum') {
    root.setAttribute('data-theme', 'vellum');
    themeBtn.textContent = '☾';
  }
  themeBtn.addEventListener('click', () => {
    const isVellum = root.getAttribute('data-theme') === 'vellum';
    if (isVellum) {
      root.removeAttribute('data-theme');
      themeBtn.textContent = '☀';
      localStorage.setItem('sk-theme', 'blueprint');
    } else {
      root.setAttribute('data-theme', 'vellum');
      themeBtn.textContent = '☾';
      localStorage.setItem('sk-theme', 'vellum');
    }
  });

  /* ---------- BACK TO TOP ---------- */
  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 600);
  });
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- SMOOTH NAV SCROLL OFFSET ---------- */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const y = target.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

});
