/**
 * FINCA SANTA FÉ
 * productos.js
 *
 * Responsabilidades:
 * - Intentar cargar productos desde el backend
 * - Evitar que una API lenta deje la web bloqueada
 * - Usar catálogo local de respaldo automáticamente
 * - Renderizar tarjetas de producto
 * - Integrarse con las animaciones de main.js
 */


/* ============================================================
   FALLBACK LOCAL
   ============================================================ */

const PRODUCTOS_RESPALDO = [

  {
    slug: 'mozzarella',

    nombre: 'Mozzarella',

    descripcion:
      'Suave, elástica y perfecta para pizzas, ensaladas y platillos calientes. Elaborada a mano.',

    precio: null,

    imagen:
      'assets/images/productos/mozzarella.jpg',

    posicionImagen:
      'center 40%',

    destacado:
      true
  },


  {
    slug: 'palmito',

    nombre: 'Palmito',

    descripcion:
      'Textura fibrosa y sabor suave. El queso más costarricense, ideal para chorreadas y gallos.',

    precio: null,

    imagen:
      'assets/images/productos/palmito.jpg',

    posicionImagen:
      'center 40%',

    destacado:
      false
  },


  {
    slug: 'pizzero',

    nombre: 'Pizzero',

    descripcion:
      'Alto poder de fusión y sabor intenso al calor. Especialmente formulado para pizzas y gratinados.',

    precio: null,

    imagen:
      'assets/images/productos/pizzero.jpg',

    posicionImagen:
      'center 50%',

    destacado:
      false
  },


  {
    slug: 'semiduro',

    nombre: 'Semiduro',

    descripcion:
      'Curado con paciencia, textura firme y sabor pronunciado. Ideal para tablas de quesos.',

    precio: null,

    imagen:
      'assets/images/productos/semiduro.jpg',

    posicionImagen:
      'center 40%',

    destacado:
      false
  },


  {
    slug: 'tierno',

    nombre: 'Tierno',

    descripcion:
      'Fresco, suave y cremoso. El favorito del desayuno tico, perfecto con pinto y tortillas.',

    precio: null,

    imagen:
      'assets/images/productos/tierno.jpg',

    posicionImagen:
      'center',

    destacado:
      false
  },


  {
    slug: 'cremoso',

    nombre: 'Cremoso',

    descripcion:
      'Textura suave y untuosa, con sabor delicado. Versátil para untar, cocinar o disfrutar solo.',

    precio: null,

    imagen:
      'assets/images/productos/cremoso.jpg',

    posicionImagen:
      'center 35%',

    destacado:
      false
  }

];


/* ============================================================
   CONFIGURACIÓN
   ============================================================ */

/*
 * No queremos que una API lenta o apagada
 * mantenga la tienda mostrando:
 *
 * "Cargando productos..."
 *
 * indefinidamente.
 */

const PRODUCTOS_API_TIMEOUT_MS =
  3500;


/* ============================================================
   PRICE FORMAT
   ============================================================ */

function formatearPrecio(
  precio
) {

  if (
    precio === null ||
    precio === undefined
  ) {

    return 'Precio por consultar';

  }


  return (
    `₡ ${Number(precio).toLocaleString('es-CR')}`
  );

}


/* ============================================================
   PRODUCT CARD
   ============================================================ */

function crearTarjetaProducto(
  producto
) {

  const articulo =
    document.createElement(
      'article'
    );


  articulo.className =
    producto.destacado
      ? 'producto__card producto__card--featured'
      : 'producto__card';


  const ribbon =
    producto.destacado
      ? `
          <span class="producto__ribbon">
            El más pedido
          </span>
        `
      : '';


  articulo.innerHTML =
    `
      <div class="producto__img">

        <img
          src="${producto.imagen}"
          alt="Queso ${producto.nombre} de Finca Santa Fé"
          loading="lazy"
          style="object-position: ${producto.posicionImagen || 'center'};"
        >

        ${ribbon}

      </div>


      <div class="producto__info">

        <h3 class="producto__nombre">
          ${producto.nombre}
        </h3>


        <p class="producto__desc">
          ${producto.descripcion}
        </p>


        <div class="producto__footer">

          <span class="producto__precio">
            ${formatearPrecio(producto.precio)}
          </span>


          <button
            class="btn btn--pedir"
            type="button"
            data-producto="${producto.nombre}"
          >
            Pedir
          </button>

        </div>

      </div>
    `;


  return articulo;

}


/* ============================================================
   RENDER
   ============================================================ */

function renderizarProductos(
  productos,
  contenedor
) {

  contenedor.innerHTML =
    '';


  productos.forEach(
    producto => {

      contenedor.appendChild(
        crearTarjetaProducto(
          producto
        )
      );

    }
  );


  contenedor.setAttribute(
    'aria-busy',
    'false'
  );


  /*
   * Las tarjetas aparecen después del DOMContentLoaded,
   * por eso volvemos a registrarlas en el observer
   * definido en main.js.
   */

  if (
    typeof window.reobservarAnimaciones ===
    'function'
  ) {

    window.reobservarAnimaciones(
      '.producto__card'
    );

  }

}


/* ============================================================
   API FETCH WITH TIMEOUT
   ============================================================ */

async function obtenerProductosBackend() {

  /*
   * Si no existe configuración de API,
   * usamos inmediatamente el catálogo local.
   */

  if (
    typeof API_BASE_URL === 'undefined' ||
    !API_BASE_URL
  ) {

    throw new Error(
      'API_BASE_URL no está configurado'
    );

  }


  const controller =
    new AbortController();


  const timeout =
    setTimeout(
      () => {

        controller.abort();

      },
      PRODUCTOS_API_TIMEOUT_MS
    );


  try {

    const respuesta =
      await fetch(
        `${API_BASE_URL}/api/productos`,
        {
          signal:
            controller.signal
        }
      );


    if (!respuesta.ok) {

      throw new Error(
        `API respondió ${respuesta.status}`
      );

    }


    const productos =
      await respuesta.json();


    if (
      !Array.isArray(productos) ||
      productos.length === 0
    ) {

      throw new Error(
        'La API no devolvió productos'
      );

    }


    return productos;

  }
  finally {

    clearTimeout(
      timeout
    );

  }

}


/* ============================================================
   PRODUCT LOADER
   ============================================================ */

async function cargarProductos() {

  const contenedor =
    document.getElementById(
      'productosGrid'
    );


  if (!contenedor) {

    return;

  }


  /*
   * El catálogo local es nuestra fuente de disponibilidad
   * visual garantizada.
   *
   * La página nunca debe quedar rota simplemente porque
   * el backend no está disponible.
   */

  try {

    const productos =
      await obtenerProductosBackend();


    renderizarProductos(
      productos,
      contenedor
    );


    console.log(
      'Productos cargados desde API'
    );

  }
  catch (error) {

    console.warn(
      'No se pudo cargar productos desde la API. Usando catálogo local:',
      error.message
    );


    renderizarProductos(
      PRODUCTOS_RESPALDO,
      contenedor
    );

  }

}


/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener(
  'DOMContentLoaded',
  cargarProductos
);