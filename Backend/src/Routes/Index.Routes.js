// Routes/index.js
const express = require('express');
const router = express.Router();

// Importa las rutas de cada entidad
const localesRoutes = require('./Local.Routes');

// Usa las rutas importadas
router.use('/locales', localesRoutes);

module.exports = router;