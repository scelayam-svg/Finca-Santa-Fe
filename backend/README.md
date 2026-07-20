# Finca Santa Fe — Backend

API en Node.js + Express + MongoDB (Atlas) para productos y pedidos.

## Configuración inicial (una sola vez)

1. Instalar Node.js (ya lo tenés).
2. Entrar a esta carpeta e instalar dependencias:
   ```
   cd backend
   npm install
   ```
3. Copiar `.env.example` a `.env` y completar `MONGODB_URI` con el connection
   string real de Atlas (Database → Connect → Drivers → Node.js).
   ```
   cp .env.example .env
   ```
   En Windows (PowerShell):
   ```
   Copy-Item .env.example .env
   ```
4. Poblar la base con los 6 productos actuales:
   ```
   npm run seed
   ```

## Correr el servidor localmente

```
npm run dev
```

Debería mostrar:
```
✅ Conectado a MongoDB
🚀 API corriendo en http://localhost:4000
```

Probar en el navegador: http://localhost:4000/api/health y
http://localhost:4000/api/productos

## Endpoints

| Método | Ruta              | Qué hace                                      |
|--------|-------------------|------------------------------------------------|
| GET    | `/api/health`     | Verifica que el servidor está vivo            |
| GET    | `/api/productos`  | Lista los productos activos (para el frontend)|
| POST   | `/api/pedidos`    | Guarda un pedido nuevo                        |
| GET    | `/api/pedidos`    | Lista los últimos 200 pedidos                 |

## ⚠️ Nota de seguridad importante

`GET /api/pedidos` hoy **no tiene login** — cualquiera que conozca la URL
podría ver los pedidos (nombres, teléfonos). Está bien para desarrollo y
pruebas, pero **antes de publicar el sitio en producción** hay que agregar
al menos una clave simple (API key) o autenticación básica a esa ruta.
Avisame cuando lleguemos a esa etapa y lo resolvemos — no es mucho trabajo,
pero no hay que olvidarlo.

## Cómo actualizar productos/precios

Por ahora no hay panel de administración — para cambiar un precio, agregar
o desactivar un producto, pedímelo directamente y edito la base de datos
(o el script `src/seed.js`) por vos.
