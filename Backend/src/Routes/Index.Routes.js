// Routes/index.js
const express = require('express');
const router = express.Router();

// Importa las rutas de cada entidad
const example = require('./Example.Routes.js');

// Usa las rutas importadas
router.use('/example', example);

module.exports = router;