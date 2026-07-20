const express = require('express');
const Pedido = require('../models/Pedido');

const router = express.Router();

const ENTREGAS_VALIDAS = ['Paso a recoger en la finca', 'Entrega a domicilio'];

// POST /api/pedidos — guarda un pedido (el frontend además abre WhatsApp, en paralelo)
router.post('/', async (req, res) => {
  try {
    const { nombre, telefono, producto, cantidad, entrega } = req.body;

    // Validación básica en el servidor — nunca confiar solo en la del frontend
    const errores = [];
    if (!nombre || String(nombre).trim().length < 2) {
      errores.push('El nombre es obligatorio.');
    }
    if (!telefono || String(telefono).trim().length < 8) {
      errores.push('El teléfono no es válido.');
    }
    if (!producto || String(producto).trim().length === 0) {
      errores.push('El producto es obligatorio.');
    }
    if (!entrega || !ENTREGAS_VALIDAS.includes(entrega)) {
      errores.push('La forma de entrega no es válida.');
    }

    if (errores.length > 0) {
      return res.status(400).json({ error: 'Datos inválidos.', detalles: errores });
    }

    const pedido = await Pedido.create({
      nombre: String(nombre).trim(),
      telefono: String(telefono).trim(),
      producto: String(producto).trim(),
      cantidad: cantidad ? String(cantidad).trim() : '',
      entrega,
    });

    res.status(201).json({ ok: true, id: pedido._id });
  } catch (error) {
    console.error('Error al guardar pedido:', error);
    res.status(500).json({ error: 'No se pudo guardar el pedido.' });
  }
});

// GET /api/pedidos — lista simple para vos (sin login por ahora, ver nota de seguridad
// en README.md del backend antes de exponer esto públicamente en producción)
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find().sort({ createdAt: -1 }).limit(200);
    res.json(pedidos);
  } catch (error) {
    console.error('Error al listar pedidos:', error);
    res.status(500).json({ error: 'No se pudieron cargar los pedidos.' });
  }
});

module.exports = router;
