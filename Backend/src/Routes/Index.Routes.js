// Routes/index.js
import express from 'express';
import usuario from './user.routes.js';

const router = express.Router();

// Usa las rutas importadas
router.use('/user', usuario);

export default router;