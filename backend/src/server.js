require('dotenv').config();
const express = require('express');
const cors = require('cors');

const conectarDB = require('./config/db');
const productosRouter = require('./routes/productos');
const pedidosRouter = require('./routes/pedidos');

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

async function main() {
  await conectarDB();

  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: CORS_ORIGIN.length > 0 ? CORS_ORIGIN : true, // true = permitir cualquiera (solo para pruebas rápidas)
    })
  );

  // Endpoint de salud — útil para verificar que el server está vivo (y para Render)
  app.get('/api/health', (req, res) => {
    res.json({ ok: true, servicio: 'Finca Santa Fe API' });
  });

  app.use('/api/productos', productosRouter);
  app.use('/api/pedidos', pedidosRouter);

  // 404 para rutas no encontradas dentro de /api
  app.use('/api', (req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada.' });
  });

  app.listen(PORT, () => {
    console.log(`🚀 API corriendo en http://localhost:${PORT}`);
  });
}

main();
