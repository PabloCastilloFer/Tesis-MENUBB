import express from 'express';
import localRoutes from './local.routes.js';

const router = express.Router();

router.use('/local', localRoutes);

export default router;