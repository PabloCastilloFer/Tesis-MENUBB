// Routes/index.js
import express from 'express';
import example from './Example.Routes.js';

const router = express.Router();

// Usa las rutas importadas
router.use('/example', example);

export default router;