import { Router } from 'express';
import { createEtiqueta, getEtiquetas, getEtiqueta, deleteEtiqueta, updateEtiqueta, asignarEtiqueta, desasignarEtiqueta } from '../Controllers/etiqueta.controller.js';

//import authorizeRole from "../Middlewares/authorization.middleware.js";

const router = Router();

router
    .post('/', createEtiqueta)
    .get('/', getEtiquetas)
    .get('/:nombre', getEtiqueta)
    .delete('/:nombre', deleteEtiqueta)
    .patch('/:idComida', asignarEtiqueta)
    .put('/desasignar/:idComida', desasignarEtiqueta)
    .put('/:nombre', updateEtiqueta);

export default router;