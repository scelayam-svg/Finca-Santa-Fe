const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    // Slug corto usado en el frontend (data-producto en los botones "Pedir")
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    // Precio en colones. null = "Consultar" (como está hoy en el sitio).
    precio: {
      type: Number,
      default: null,
      min: 0,
    },
    // Ruta relativa a la imagen, tal como se usa hoy en index.html
    imagen: {
      type: String,
      required: true,
    },
    // Posición de objeto CSS para la foto (algunas fotos necesitan recorte específico)
    posicionImagen: {
      type: String,
      default: 'center',
    },
    // Controla el orden de aparición en la grilla
    orden: {
      type: Number,
      required: true,
      default: 0,
    },
    // Producto destacado (hoy es Mozzarella, tarjeta grande con ribbon)
    destacado: {
      type: Boolean,
      default: false,
    },
    // Permite ocultar un producto sin borrarlo (ej: fuera de temporada)
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);
