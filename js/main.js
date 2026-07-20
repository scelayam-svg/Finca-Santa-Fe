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
 * Animación de entrada al hacer scroll. Se expone `reobservarAnimaciones`
 * en window para que otros scripts (ej: productos.js, que agrega tarjetas
 * después de un fetch) puedan sumar elementos nuevos al mismo observer.
 */
let observadorEntrada = null;

function obtenerObservadorEntrada() {
  if (!observadorEntrada) {
    observadorEntrada = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observadorEntrada.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
  }
  return observadorEntrada;
}

function observarParaAnimar(selector) {
  const observer = obtenerObservadorEntrada();
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('animar-entrada');
    observer.observe(el);
  });
}

function inicializarAnimaciones() {
  observarParaAnimar('.producto__card, .proceso__card, .galeria__item, .contacto__card');
}

window.reobservarAnimaciones = observarParaAnimar;

/**
 * Parallax sutil en la imagen de fondo del hero al hacer scroll.
 * Se desactiva automáticamente si el usuario prefiere menos movimiento,
 * y usa requestAnimationFrame para no afectar el rendimiento.
 */
function inicializarParallaxHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefiereMenosMovimiento) return;

  const DESPLAZAMIENTO_MAX = 90; // px — mantiene el efecto sutil, no vertiginoso
  let ticking = false;

  function actualizar() {
    const heroRect = hero.getBoundingClientRect();
    // Solo calculamos mientras el hero es visible, evita trabajo innecesario
    if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
      const progreso = Math.min(Math.max(-heroRect.top, 0) / heroRect.height, 1);
      const offset = progreso * DESPLAZAMIENTO_MAX;
      hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(actualizar);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Inicialización general
 */
document.addEventListener('DOMContentLoaded', () => {
  inicializarNavMobile();
  inicializarScrollActivo();
  inicializarAnimaciones();
  inicializarParallaxHero();

  console.log('🌿 Finca Santa Fe — Sitio cargado correctamente');
});
