const mongoose = require('mongoose');

async function conectarDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error(
      '❌ Falta MONGODB_URI en el archivo .env. Copiá .env.example a .env y completá el connection string de Atlas.'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error.message);
    process.exit(1);
  }
}

module.exports = conectarDB;
