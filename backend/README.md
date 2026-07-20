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
| POST   | `/api/pedidos`    | Guarda un pedido nuevo (público, sin API key) |
| GET    | `/api/pedidos`    | Lista los últimos 200 pedidos — **requiere API key** |

## Ver la lista de pedidos (GET /api/pedidos)

Esta ruta ya no es pública — hay que mandar tu clave secreta en un header
llamado `x-api-key`. Formas simples de probarla:

**Desde el navegador no se puede** (no permite mandar headers custom fácil).
Usá una de estas opciones:

- **Postman / Insomnia** (recomendado): armá una petición GET a
  `http://localhost:4000/api/pedidos` y agregá el header
  `x-api-key: <tu clave del .env>`
- **PowerShell:**
  ```powershell
  Invoke-RestMethod -Uri "http://localhost:4000/api/pedidos" -Headers @{ "x-api-key" = "TU_CLAVE_AQUI" }
  ```

Si te pedís ver los pedidos seguido, puedo armarte más adelante una
pantallita simple (HTML) que pida la clave una vez y los muestre en una
tabla — avisame si te sirve.

## Cómo actualizar productos/precios

Por ahora no hay panel de administración — para cambiar un precio, agregar
o desactivar un producto, pedímelo directamente y edito la base de datos
(o el script `src/seed.js`) por vos.
