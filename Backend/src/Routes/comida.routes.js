import { Router } from 'express';
import { getComidas, getComida, createComida, updateComida, deleteComida } from '../Controllers/comida.controller.js';
import { handleFileSizeLimit , upload } from "../Middlewares/comida.middleware.js";

import authorizeRole from "../Middlewares/authorization.middleware.js";

const router = Router();

router
    .get('/', authorizeRole(["admin", "encargado", "user"]), getComidas)
    .get('/:id', authorizeRole(["admin", "encargado", "user"]), getComida)
    .post('/', authorizeRole(["admin", "encargado"]), upload.single("imagen"), handleFileSizeLimit, createComida)
    .put('/:id', authorizeRole(["admin", "encargado"]), upload.single("imagen"), handleFileSizeLimit,updateComida)
    .delete('/:id', authorizeRole(["admin", "encargado"]), deleteComida);

export default router;