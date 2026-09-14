/**
 * FINCA SANTA FÉ
 * Product Design V2
 *
 * Responsabilidades:
 * - Navegación mobile
 * - Enlace activo según sección visible
 * - Animaciones discretas de entrada
 * - Soporte para productos generados dinámicamente
 * - Parallax sutil del hero en desktop
 */


/* ============================================================
   MOBILE NAVIGATION
   ============================================================ */

function inicializarNavMobile() {

  const toggle =
    document.getElementById('navToggle');

  const links =
    document.getElementById('navLinks');


  if (!toggle || !links) {
    return;
  }


  toggle.addEventListener(
    'click',
    () => {

      const abierto =
        links.classList.toggle(
          'nav__links--open'
        );


      toggle.setAttribute(
        'aria-expanded',
        abierto
          ? 'true'
          : 'false'
      );


      toggle.setAttribute(
        'aria-label',
        abierto
          ? 'Cerrar menú'
          : 'Abrir menú'
      );

    }
  );


  links
    .querySelectorAll('a')
    .forEach(
      link => {

        link.addEventListener(
          'click',
          () => {

            links.classList.remove(
              'nav__links--open'
            );


            toggle.setAttribute(
              'aria-expanded',
              'false'
            );


            toggle.setAttribute(
              'aria-label',
              'Abrir menú'
            );

          }
        );

      }
    );

}


/* ============================================================
   ACTIVE NAVIGATION LINK
   ============================================================ */

function inicializarScrollActivo() {

  const secciones =
    document.querySelectorAll(
      'section[id]'
    );


  const enlaces =
    document.querySelectorAll(
      '.nav__links a'
    );


  if (
    !secciones.length ||
    !enlaces.length
  ) {
    return;
  }


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (!entry.isIntersecting) {
              return;
            }


            const id =
              entry.target.getAttribute(
                'id'
              );


            enlaces.forEach(
              enlace => {

                const esActivo =
                  enlace.getAttribute(
                    'href'
                  ) === `#${id}`;


                enlace.classList.toggle(
                  'activo',
                  esActivo
                );

              }
            );

          }
        );

      },
      {
        rootMargin:
          '-38% 0px -52% 0px'
      }
    );


  secciones.forEach(
    seccion => {

      observer.observe(
        seccion
      );

    }
  );

}


/* ============================================================
   ENTRANCE ANIMATIONS
   ============================================================ */

let observadorEntrada =
  null;


function obtenerObservadorEntrada() {

  if (observadorEntrada) {
    return observadorEntrada;
  }


  observadorEntrada =
    new IntersectionObserver(
      entries => {

        entries.forEach(
          entry => {

            if (!entry.isIntersecting) {
              return;
            }


            entry.target.classList.add(
              'is-visible'
            );


            observadorEntrada.unobserve(
              entry.target
            );

          }
        );

      },
      {
        threshold:
          0.1
      }
    );


  return observadorEntrada;

}


function observarParaAnimar(
  selector
) {

  const observer =
    obtenerObservadorEntrada();


  document
    .querySelectorAll(selector)
    .forEach(
      elemento => {

        /*
         * productos.js puede llamar nuevamente esta función
         * después de insertar tarjetas dinámicamente.
         *
         * Evitamos registrar dos veces elementos ya visibles.
         */

        if (
          elemento.classList.contains(
            'is-visible'
          )
        ) {
          return;
        }


        elemento.classList.add(
          'animar-entrada'
        );


        observer.observe(
          elemento
        );

      }
    );

}


/* ============================================================
   INITIAL ANIMATION TARGETS
   ============================================================ */

function inicializarAnimaciones() {

  observarParaAnimar(
    [
      '.trust__item',
      '.producto__card',
      '.historia__media',
      '.historia__content',
      '.proceso__card',
      '.galeria__item',
      '.pedido-info',
      '.pedido__form',
      '.contacto__card'
    ].join(',')
  );

}


/*
 * productos.js genera las tarjetas después
 * de intentar obtener datos del backend.
 *
 * Ese archivo ya busca esta función en window.
 * La mantenemos para conservar compatibilidad.
 */

window.reobservarAnimaciones =
  observarParaAnimar;


/* ============================================================
   HERO PARALLAX
   ============================================================ */

function inicializarParallaxHero() {

  const hero =
    document.querySelector(
      '.hero'
    );


  if (!hero) {
    return;
  }


  const reduceMotion =
    window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;


  const pantallaReducida =
    window.matchMedia(
      '(max-width: 900px)'
    ).matches;


  /*
   * En tablet/mobile no usamos parallax.
   * También respetamos prefers-reduced-motion.
   */

  if (
    reduceMotion ||
    pantallaReducida
  ) {
    return;
  }


  const MAX_OFFSET =
    65;


  let ticking =
    false;


  function actualizarHero() {

    const rect =
      hero.getBoundingClientRect();


    const visible =
      rect.bottom > 0 &&
      rect.top < window.innerHeight;


    if (visible) {

      const progress =
        Math.min(
          Math.max(
            -rect.top /
              rect.height,
            0
          ),
          1
        );


      const offset =
        progress *
        MAX_OFFSET;


      hero.style.backgroundPosition =
        `center calc(50% + ${offset}px)`;

    }


    ticking =
      false;

  }


  window.addEventListener(
    'scroll',
    () => {

      if (ticking) {
        return;
      }


      window.requestAnimationFrame(
        actualizarHero
      );


      ticking =
        true;

    },
    {
      passive:
        true
    }
  );

}


/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    inicializarNavMobile();

    inicializarScrollActivo();

    inicializarAnimaciones();

    inicializarParallaxHero();


    console.log(
      'Finca Santa Fé — Product Design V2 loaded'
    );

  }
);