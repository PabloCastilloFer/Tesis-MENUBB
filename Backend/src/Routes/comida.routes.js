import { Router } from 'express';
import { getComidas, getComida, createComida, updateComida, deleteComida, getComidasLocal, getComidasLocalUser } from '../Controllers/comida.controller.js';
import { handleFileSizeLimit , upload } from "../Middlewares/comida.middleware.js";

import authorizeRole from "../Middlewares/authorization.middleware.js";

const router = Router();

router
    .get('/comidas/:localId', authorizeRole(["user","admin"]), getComidasLocalUser)
    .get('/local/comidas', authorizeRole(["encargado","admin"]), getComidasLocal)
    .get('/', authorizeRole(["encargado","user","admin"]), getComidas)
    .get('/:id', authorizeRole(["encargado","admin"]), getComida)
    .post('/', upload.single("imagen"), authorizeRole(["encargado"]), handleFileSizeLimit, createComida)
    .patch('/:id', upload.single("imagen"), authorizeRole(["encargado"]), handleFileSizeLimit,updateComida)
    .delete('/:id', authorizeRole(["encargado","admin"]), deleteComida);

export default router;