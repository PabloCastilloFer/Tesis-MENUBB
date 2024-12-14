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

router.get('/', authorizeRole(["admin", "encargado"]), getLocals);
router.get('/:id', authorizeRole(["admin", "encargado"]), getLocalById);
router.post('/', upload.single('image'), handleFileSizeLimit, validateRequest(localCreateSchema), authorizeRole(["admin"]), createLocal );
router.put('/:id', upload.single('image'), handleFileSizeLimit, validateRequest(localUpdateSchema), authorizeRole(["admin"]), updateLocal );
router.delete('/:id', authorizeRole(["admin"]), deleteLocal);

export default router;
