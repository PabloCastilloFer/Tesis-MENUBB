// Example.Routes.js
import express from 'express';

const router = express.Router();

// Define tus rutas aquí
router.get('/', (req, res) => {
  res.send('Hello from example route!');
});

export default router;