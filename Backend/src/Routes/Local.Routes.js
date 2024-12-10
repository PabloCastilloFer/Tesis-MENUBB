import express from 'express';
import {
  getLocals,
  getLocalById,
  createLocal,
  updateLocal,
  deleteLocal,
} from '../Controllers/local.controller.js';
import { handleFileSizeLimit, upload } from '../Middlewares/multer.middleware.js';
import {
  localCreateSchema,
  localUpdateSchema,
} from '../Validations/local.validation.js';
import { validateRequest } from '../Middlewares/validate.middleware.js';
import authorizeRole from '../Middlewares/authorization.middleware.js';

const router = express.Router();

// Obtener todos los locales (requiere rol de 'admin' o 'encargado')
router.get('/', authorizeRole(["admin", "encargado"]), getLocals);
// Obtener un local por ID
router.get('/:id', authorizeRole(["admin", "encargado"]), getLocalById);
// Crear un nuevo local (requiere rol de 'admin')
router.post('/', upload.single('image'), handleFileSizeLimit, validateRequest(localCreateSchema), authorizeRole(["admin"]), createLocal );
// Actualizar un local por ID (requiere rol de 'admin')
router.put('/:id', upload.single('image'), handleFileSizeLimit, validateRequest(localUpdateSchema), authorizeRole(["admin"]), updateLocal );
// Eliminar un local por ID (requiere rol de 'admin')
router.delete('/:id', authorizeRole(["admin"]), deleteLocal);

export default router;