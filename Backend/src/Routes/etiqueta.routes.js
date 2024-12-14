import { Router } from 'express';
import { createEtiqueta, getEtiquetas, getEtiqueta, deleteEtiqueta, updateEtiqueta, asignarEtiqueta, desasignarEtiqueta } from '../Controllers/etiqueta.controller.js';

import authorizeRole from "../Middlewares/authorization.middleware.js";

const router = Router();

router
    .post('/', authorizeRole(["admin", "encargado"]), createEtiqueta)
    .get('/', authorizeRole(["admin", "encargado", "user"]), getEtiquetas)
    .get('/:nombre', authorizeRole(["admin", "encargado", "user"]), getEtiqueta)
    .delete('/:nombre', authorizeRole(["admin", "encargado"]), deleteEtiqueta)
    .patch('/:idComida', authorizeRole(["admin", "encargado"]), asignarEtiqueta)
    .put('/desasignar/:idComida', authorizeRole(["admin", "encargado"]), desasignarEtiqueta)
    .put('/:nombre', authorizeRole(["admin", "encargado"]), updateEtiqueta);

export default router;