const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
    },
    // Guardamos el nombre del producto como texto, no una referencia rígida —
    // así el pedido queda igual aunque el producto cambie o se borre después.
    producto: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: String,
      trim: true,
      default: '',
    },
    entrega: {
      type: String,
      required: true,
      enum: ['Paso a recoger en la finca', 'Entrega a domicilio'],
    },
    estado: {
      type: String,
      enum: ['nuevo', 'confirmado', 'entregado', 'cancelado'],
      default: 'nuevo',
    },
  },
  { timestamps: true } // createdAt sirve como "fecha del pedido"
);

module.exports = mongoose.model('Pedido', pedidoSchema);
