/**
 * FINCA SANTA FE — whatsapp.js
 * Maneja el formulario de pedidos y genera el mensaje de WhatsApp
 */

// Número de WhatsApp de la finca (formato internacional sin + ni espacios)
const WHATSAPP_NUMBER = '50683284658'; // +506 8328-4658 — número real de la finca

/**
 * Genera el mensaje de WhatsApp con los datos del formulario
 * @param {Object} datos - Datos del formulario
 * @returns {string} URL de WhatsApp con el mensaje codificado
 */
function generarMensajeWhatsApp(datos) {
  const mensaje = `🧀 *Pedido - Finca Santa Fe*

👤 *Nombre:* ${datos.nombre}
📱 *WhatsApp:* ${datos.telefono}
🧀 *Producto:* ${datos.producto}
📦 *Cantidad:* ${datos.cantidad || 'No especificada'}
🚗 *Entrega:* ${datos.entrega}

_Mensaje generado desde www.fincasantafe.cr_`;

  const mensajeCodificado = encodeURIComponent(mensaje);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${mensajeCodificado}`;
}

/**
 * Valida los campos del formulario
 * @param {Object} datos - Datos del formulario
 * @returns {Object} { valido: boolean, errores: Object }
 */
function validarFormulario(datos) {
  const errores = {};

  if (!datos.nombre || datos.nombre.trim().length < 2) {
    errores.nombre = 'Por favor ingresá tu nombre.';
  }

  if (!datos.telefono || datos.telefono.trim().length < 8) {
    errores.telefono = 'Por favor ingresá un número de WhatsApp válido.';
  }

  if (!datos.producto) {
    errores.producto = 'Por favor seleccioná un producto.';
  }

  if (!datos.entrega) {
    errores.entrega = 'Por favor seleccioná la forma de entrega.';
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores
  };
}

/**
 * Muestra los errores de validación en el formulario
 * @param {Object} errores
 */
function mostrarErrores(errores) {
  // Limpiar errores anteriores
  document.querySelectorAll('.form__error').forEach(el => el.textContent = '');
  document.querySelectorAll('.form__input').forEach(el => el.classList.remove('error'));

  // Mostrar nuevos errores
  Object.keys(errores).forEach(campo => {
    const errorEl = document.getElementById(`error-${campo}`);
    const inputEl = document.getElementById(campo);
    if (errorEl) errorEl.textContent = errores[campo];
    if (inputEl) inputEl.classList.add('error');
  });
}

/**
 * Guarda el pedido en el backend. No bloquea ni retrasa la apertura de
 * WhatsApp — si el backend está caído o sin internet, el pedido igual
 * llega por WhatsApp normalmente, solo no queda registrado en la base.
 * @param {Object} datos
 */
async function guardarPedidoEnBackend(datos) {
  try {
    const respuesta = await fetch(`${API_BASE_URL}/api/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!respuesta.ok) {
      console.warn('⚠️ El backend rechazó el pedido:', respuesta.status);
    }
  } catch (error) {
    console.warn('⚠️ No se pudo guardar el pedido en el backend (sigue yendo por WhatsApp):', error.message);
  }
}

/**
 * Inicializa el formulario de pedidos
 */
function inicializarFormularioPedido() {
  const form = document.getElementById('pedidoForm');
  if (!form) return;

  // Manejar clic en botones "Pedir" con delegación de eventos — así funciona
  // también con tarjetas de producto agregadas después (ver productos.js)
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn--pedir');
    if (!btn) return;

    const producto = btn.dataset.producto;
    const selectProducto = document.getElementById('producto');
    if (selectProducto) {
      selectProducto.value = producto;
    }
    document.getElementById('pedidos').scrollIntoView({ behavior: 'smooth' });
  });

  // Manejar envío del formulario
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = {
      nombre:   document.getElementById('nombre').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      producto: document.getElementById('producto').value,
      cantidad: document.getElementById('cantidad').value.trim(),
      entrega:  document.getElementById('entrega').value,
    };

    const { valido, errores } = validarFormulario(datos);

    if (!valido) {
      mostrarErrores(errores);
      return;
    }

    // Limpiar errores
    mostrarErrores({});

    // Guardar en el backend (en paralelo, sin esperar) y abrir WhatsApp
    guardarPedidoEnBackend(datos);

    const urlWhatsApp = generarMensajeWhatsApp(datos);
    window.open(urlWhatsApp, '_blank');

    // Resetear formulario
    form.reset();
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarFormularioPedido);
