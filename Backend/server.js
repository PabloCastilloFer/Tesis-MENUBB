const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./Routes/Index.Routes.js');

dotenv.config();

const app = express();
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(error => {
      console.error('Error de conexión:', error);
      process.exit(1);
  });

// Usa el enrutador de rutas
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});