/**
 * FINCA SANTA FE — productos.js
 * Carga los productos desde la API del backend y arma las tarjetas
 * dinámicamente. Si el backend no responde (apagado, sin internet, etc.),
 * usa un set de respaldo para que el sitio nunca se vea roto.
 */

// Respaldo estático — mismos datos que carga el seed del backend.
// Si el backend está caído, el sitio igual muestra algo coherente.
const PRODUCTOS_RESPALDO = [
  { slug: 'mozzarella', nombre: 'Mozzarella', descripcion: 'Suave, elástica y perfecta para pizzas, ensaladas y platillos calientes. Elaborada a mano.', precio: null, imagen: 'assets/images/productos/mozzarella.jpg', posicionImagen: 'center 40%', destacado: true },
  { slug: 'palmito', nombre: 'Palmito', descripcion: 'Textura fibrosa y sabor suave. El queso más costarricense, ideal para chorreadas y gallos.', precio: null, imagen: 'assets/images/productos/palmito.jpg', posicionImagen: 'center 40%', destacado: false },
  { slug: 'pizzero', nombre: 'Pizzero', descripcion: 'Alto poder de fusión, sabor intenso al calor. Especialmente formulado para pizzas y gratinados.', precio: null, imagen: 'assets/images/productos/pizzero.jpg', posicionImagen: 'center 50%', destacado: false },
  { slug: 'semiduro', nombre: 'Semiduro', descripcion: 'Curado con paciencia, textura firme y sabor pronunciado. Ideal para tablas de quesos.', precio: null, imagen: 'assets/images/productos/semiduro.jpg', posicionImagen: 'center 40%', destacado: false },
  { slug: 'tierno', nombre: 'Tierno', descripcion: 'Fresco, suave y cremoso. El favorito del desayuno tico, perfecto con pinto y tortillas.', precio: null, imagen: 'assets/images/productos/tierno.jpg', posicionImagen: 'center', destacado: false },
  { slug: 'cremoso', nombre: 'Cremoso', descripcion: 'Textura suave y untuosa, sabor delicado. Versátil para untar, cocinar o disfrutar solo.', precio: null, imagen: 'assets/images/productos/cremoso.jpg', posicionImagen: 'center 35%', destacado: false },
];

function formatearPrecio(precio) {
  if (precio === null || precio === undefined) return '₡ Consultar';
  return `₡ ${Number(precio).toLocaleString('es-CR')}`;
}

function crearTarjetaProducto(producto) {
  const articulo = document.createElement('article');
  articulo.className = producto.destacado ? 'producto__card producto__card--featured' : 'producto__card';

  const ribbon = producto.destacado
    ? '<span class="producto__ribbon">El más pedido</span>'
    : '';

  articulo.innerHTML = `
    <div class="producto__img">
      <img src="${producto.imagen}" alt="Queso ${producto.nombre} Finca Santa Fé" loading="lazy" style="object-position: ${producto.posicionImagen || 'center'};">
      ${ribbon}
    </div>
    <div class="producto__info">
      <h3 class="producto__nombre">${producto.nombre}</h3>
      <p class="producto__desc">${producto.descripcion}</p>
      <div class="producto__footer">
        <span class="producto__precio">${formatearPrecio(producto.precio)}</span>
        <button class="btn btn--pedir" data-producto="${producto.nombre}">Pedir</button>
      </div>
    </div>
  `;

  return articulo;
}

function renderizarProductos(productos, contenedor) {
  contenedor.innerHTML = '';
  productos.forEach((producto) => {
    contenedor.appendChild(crearTarjetaProducto(producto));
  });

  // Las tarjetas recién se agregaron al DOM — si existe la animación de
  // entrada por scroll (main.js), la reactivamos para estas tarjetas nuevas.
  if (typeof window.reobservarAnimaciones === 'function') {
    window.reobservarAnimaciones('.producto__card');
  }
}

async function cargarProductos() {
  const contenedor = document.getElementById('productosGrid');
  if (!contenedor) return;

  try {
    const respuesta = await fetch(`${API_BASE_URL}/api/productos`);
    if (!respuesta.ok) throw new Error(`API respondió ${respuesta.status}`);

    const productos = await respuesta.json();
    if (!Array.isArray(productos) || productos.length === 0) {
      throw new Error('La API no devolvió productos');
    }

    renderizarProductos(productos, contenedor);
  } catch (error) {
    console.warn('⚠️ No se pudo cargar productos desde la API, usando respaldo estático:', error.message);
    renderizarProductos(PRODUCTOS_RESPALDO, contenedor);
  }
}

document.addEventListener('DOMContentLoaded', cargarProductos);
