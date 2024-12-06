// Routes/index.js
import express from 'express';
import example from './Example.Routes.js';
import etiquetaRoutes from '../Routes/etiqueta.routes.js';

const router = express.Router();

// Usa las rutas importadas
router.use('/example', example);
router.use('/etiqueta', etiquetaRoutes)

export default router;