// ============================================================
// MAIN.JS — Sil Cabeleireira (protótipo de prospecção)
// ============================================================

// ============ OFFSET DO HEADER (abaixo da faixa de prévia) ============
function bindPreviewOffset(){
  const bar = document.querySelector('.preview-bar');
  const header = document.getElementById('header');
  if(!bar || !header) return;
  const update = () => { header.style.top = `${bar.offsetHeight}px`; };
  update();
  window.addEventListener('resize', update);
}

// ============ NAV MOBILE ============
function bindMobileNav(){
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    });
  });
}

// ============ HEADER SCROLL STATE ============
function bindHeaderScroll(){
  const header = document.getElementById('header');
  if(!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ============ BARRA DE PROGRESSO DE SCROLL ============
function bindProgressBar(){
  const bar = document.getElementById('progressBar');
  if(!bar) return;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    bar.style.width = `${progress * 100}%`;
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// ============ SCROLL REVEAL ============
function bindReveal(){
  const els = document.querySelectorAll('[data-reveal]');
  if(!els.length) return;

  if(!('IntersectionObserver' in window)){
    els.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ============ CONTADOR ANIMADO (seguidoras) ============
function bindCounters(){
  const els = document.querySelectorAll('[data-count]');
  if(!els.length) return;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString('pt-BR');
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if(!('IntersectionObserver' in window)){
    els.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(el => observer.observe(el));
}

// ============ CURSOR GLOW ============
function bindCursorGlow(){
  const glow = document.getElementById('cursorGlow');
  if(!glow || window.matchMedia('(max-width: 900px)').matches) return;
  window.addEventListener('mousemove', (e) => {
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
  });
}

// ============ PARTÍCULAS NO HERO ============
function createParticles(){
  const container = document.getElementById('particles');
  if(!container) return;
  const count = window.innerWidth < 760 ? 10 : 20;

  for(let i = 0; i < count; i++){
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 3;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.bottom = '-20px';
    p.style.animationDuration = `${Math.random() * 10 + 11}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(p);
  }
}

// ============ LOADER ============
function bindLoader(){
  const loader = document.getElementById('loader');
  if(!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hide'), 550);
  });
  setTimeout(() => loader.classList.add('hide'), 2500);
}

// ============ ANO NO RODAPÉ ============
function bindYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
}

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  bindYear();
  bindPreviewOffset();
  bindHeaderScroll();
  bindMobileNav();
  bindProgressBar();
  bindReveal();
  bindCounters();
  bindCursorGlow();
  createParticles();
  bindLoader();
});
