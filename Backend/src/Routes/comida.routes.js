import { Router } from 'express';
import { getComidas, getComida, createComida, updateComida, deleteComida, getComidasLocal, getComidasLocalUser } from '../Controllers/comida.controller.js';
import { handleFileSizeLimit , upload } from "../Middlewares/comida.middleware.js";

import authorizeRole from "../Middlewares/authorization.middleware.js";

const router = Router();


router
    .get('/comidas/:localId', authorizeRole(["user"]), getComidasLocalUser)
    .get('/local/comidas', authorizeRole(["encargado"]), getComidasLocal)
    .get('/', authorizeRole(["encargado","user"]), getComidas)
    .get('/:id', authorizeRole(["encargado"]), getComida)
    .post('/', upload.single("imagen"), authorizeRole(["encargado"]), handleFileSizeLimit, createComida)
    .put('/:id', upload.single("imagen"), authorizeRole(["encargado"]), handleFileSizeLimit,updateComida)
    .delete('/:id', authorizeRole(["encargado"]), deleteComida);

export default router;