import express from 'express';
import localRoutes from './Local.Routes.js';

const router = express.Router();

router.use('/local', localRoutes);

export default router;