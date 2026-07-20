/**
 * Script de una sola vez para poblar la base de datos con los productos
 * que hoy están hardcodeados en index.html — así arrancamos con exactamente
 * lo mismo que ya está publicado, sin perder nada.
 *
 * Uso: npm run seed
 * Podés correrlo de nuevo sin miedo: primero borra los productos existentes
 * y los vuelve a crear (no duplica).
 */
require('dotenv').config();
const conectarDB = require('./config/db');
const Producto = require('./models/Producto');

const PRODUCTOS = [
  {
    slug: 'mozzarella',
    nombre: 'Mozzarella',
    descripcion:
      'Suave, elástica y perfecta para pizzas, ensaladas y platillos calientes. Elaborada a mano.',
    precio: null,
    imagen: 'assets/images/productos/mozzarella.jpg',
    posicionImagen: 'center 40%',
    orden: 1,
    destacado: true,
  },
  {
    slug: 'palmito',
    nombre: 'Palmito',
    descripcion:
      'Textura fibrosa y sabor suave. El queso más costarricense, ideal para chorreadas y gallos.',
    precio: null,
    imagen: 'assets/images/productos/palmito.jpg',
    posicionImagen: 'center 40%',
    orden: 2,
    destacado: false,
  },
  {
    slug: 'pizzero',
    nombre: 'Pizzero',
    descripcion:
      'Alto poder de fusión, sabor intenso al calor. Especialmente formulado para pizzas y gratinados.',
    precio: null,
    imagen: 'assets/images/productos/pizzero.jpg',
    posicionImagen: 'center 50%',
    orden: 3,
    destacado: false,
  },
  {
    slug: 'semiduro',
    nombre: 'Semiduro',
    descripcion:
      'Curado con paciencia, textura firme y sabor pronunciado. Ideal para tablas de quesos.',
    precio: null,
    imagen: 'assets/images/productos/semiduro.jpg',
    posicionImagen: 'center 40%',
    orden: 4,
    destacado: false,
  },
  {
    slug: 'tierno',
    nombre: 'Tierno',
    descripcion:
      'Fresco, suave y cremoso. El favorito del desayuno tico, perfecto con pinto y tortillas.',
    precio: null,
    imagen: 'assets/images/productos/tierno.jpg',
    posicionImagen: 'center',
    orden: 5,
    destacado: false,
  },
  {
    slug: 'cremoso',
    nombre: 'Cremoso',
    descripcion:
      'Textura suave y untuosa, sabor delicado. Versátil para untar, cocinar o disfrutar solo.',
    precio: null,
    imagen: 'assets/images/productos/cremoso.jpg',
    posicionImagen: 'center 35%',
    orden: 6,
    destacado: false,
  },
];

async function seed() {
  await conectarDB();

  console.log('🗑️  Borrando productos existentes...');
  await Producto.deleteMany({});

  console.log('🌱 Creando productos...');
  await Producto.insertMany(PRODUCTOS);

  console.log(`✅ Listo — ${PRODUCTOS.length} productos cargados.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Error al poblar la base:', error);
  process.exit(1);
});
