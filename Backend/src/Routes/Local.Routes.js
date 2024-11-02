import express from 'express';
import { getLocals, getLocalById, createLocal, updateLocal, deleteLocal } from '../controllers/Local.Controller.js';

const router = express.Router();

router.get('/', getLocals); // Obtener todos los locales
router.get('/:id', getLocalById); // Obtener local por ID
router.post('/', createLocal); // Crear un nuevo local
router.put('/:id', updateLocal); // Actualizar local por ID
router.delete('/:id', deleteLocal); // Eliminar local por ID

export default router;