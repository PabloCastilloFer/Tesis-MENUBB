import { Router } from 'express';
import { getComidas, getComida, createComida, updateComida, deleteComida } from '../Controllers/comida.controller.js';
import { handleFileSizeLimit , upload } from "../Middlewares/comida.middleware.js";

const router = Router();

router
    .get('/', getComidas)
    .get('/:nombreComida', getComida)
    .post('/', upload.single("imagen"), handleFileSizeLimit, createComida)
    .put('/:nombreComida', upload.single("imagen"), handleFileSizeLimit,updateComida)
    .delete('/:nombreComida', deleteComida);

export default router;