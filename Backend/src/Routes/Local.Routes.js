import express from 'express';
import { getLocals, getLocalById, createLocal, updateLocal, deleteLocal } from '../controllers/local.controller.js';
import { handleFileSizeLimit , upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();

router.get('/', getLocals); // Obtener todos los locales
router.get('/:id', getLocalById); // Obtener local por ID
router.post('/', upload.single("image"), handleFileSizeLimit, createLocal); // Crear un nuevo local
router.put('/:id', updateLocal); // Actualizar local por ID
router.delete('/:id', deleteLocal); // Eliminar local por ID

export default router;