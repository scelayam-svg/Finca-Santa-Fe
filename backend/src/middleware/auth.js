/**
 * Autenticación simple por API key para rutas administrativas
 * (ej: ver la lista de pedidos). No es un sistema de login con
 * usuarios — es una clave secreta única que solo vos conocés.
 *
 * Cómo usarla: mandar el header  x-api-key: <la clave del .env>
 * en la petición (ej: con Postman, o un fetch desde una herramienta tuya).
 */
function verificarApiKey(req, res, next) {
  const claveEsperada = process.env.ADMIN_API_KEY;

  if (!claveEsperada) {
    console.error(
      '❌ ADMIN_API_KEY no está configurada en .env — esta ruta quedaría sin protección, así que la bloqueamos por defecto.'
    );
    return res.status(500).json({ error: 'Configuración del servidor incompleta.' });
  }

  const claveRecibida = req.header('x-api-key');

  if (claveRecibida !== claveEsperada) {
    return res.status(401).json({ error: 'No autorizado. Falta o es incorrecta la API key.' });
  }

  next();
}

module.exports = verificarApiKey;
