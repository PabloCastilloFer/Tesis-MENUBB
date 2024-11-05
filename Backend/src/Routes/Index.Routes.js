// Routes/index.js
import express from 'express';
import usuario from './usuario.routes.js';

const router = express.Router();

// Usa las rutas importadas
router.use('/usuario', usuario);

export default router;