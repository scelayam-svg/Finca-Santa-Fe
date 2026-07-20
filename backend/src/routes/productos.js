const express = require('express');
const Producto = require('../models/Producto');

const router = express.Router();

// GET /api/productos — lista pública de productos activos, ordenados
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find({ activo: true }).sort({ orden: 1 });
    res.json(productos);
  } catch (error) {
    console.error('Error al listar productos:', error);
    res.status(500).json({ error: 'No se pudieron cargar los productos.' });
  }
});

module.exports = router;
