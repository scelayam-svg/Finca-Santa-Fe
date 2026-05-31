/**
 * FINCA SANTA FE — main.js
 * Lógica general del sitio: navegación, scroll, interactividad
 */

/**
 * Menú hamburguesa para mobile
 */
function inicializarNavMobile() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const abierto = links.classList.toggle('nav__links--open');
    toggle.setAttribute('aria-expanded', abierto);
    toggle.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  // Cerrar menú al hacer clic en un enlace
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('nav__links--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Resaltar enlace activo en el nav según la sección visible
 */
function inicializarScrollActivo() {
  const secciones = document.querySelectorAll('section[id]');
  const enlaces   = document.querySelectorAll('.nav__links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        enlaces.forEach(a => {
          a.classList.toggle('activo', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  secciones.forEach(s => observer.observe(s));
}

/**
 * Animación de entrada para las tarjetas de productos y proceso
 */
function inicializarAnimaciones() {
  const elementos = document.querySelectorAll(
    '.producto__card, .proceso__card, .galeria__img, .contacto__card'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elementos.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });
}

/**
 * Inicialización general
 */
document.addEventListener('DOMContentLoaded', () => {
  inicializarNavMobile();
  inicializarScrollActivo();
  inicializarAnimaciones();

  console.log('🌿 Finca Santa Fe — Sitio cargado correctamente');
});
