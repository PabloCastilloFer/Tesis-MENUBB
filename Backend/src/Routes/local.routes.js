import express from 'express';
import {
  getLocals,
  getLocalById,
  createLocal,
  updateLocal,
  deleteLocal,
  getAllLocalsData,
} from '../Controllers/local.controller.js';
import { handleFileSizeLimit, upload } from '../Middlewares/multer.middleware.js';
import {
  localCreateSchema,
  localUpdateSchema,
} from '../Validations/local.validation.js';
import { validateRequest } from '../Middlewares/validate.middleware.js';
import authorizeRole from '../Middlewares/authorization.middleware.js';

const router = express.Router();

router.get('/all', authorizeRole(["admin", "user"]), getLocals);
router.get('/:id', authorizeRole(["admin", "encargado", "user"]), getLocalById);
router.get('/', authorizeRole(["admin", "user"]), getAllLocalsData);
router.post('/', upload.single('image'), handleFileSizeLimit, validateRequest(localCreateSchema), authorizeRole(["admin"]), createLocal );
router.put('/:id', upload.single('image'), handleFileSizeLimit, validateRequest(localUpdateSchema), authorizeRole(["admin"]), updateLocal );
router.delete('/:id', authorizeRole(["admin"]), deleteLocal);

export default router;
