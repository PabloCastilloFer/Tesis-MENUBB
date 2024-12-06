import { Router } from 'express';
import { createEtiqueta, getEtiquetas, getEtiqueta, deleteEtiqueta, updateEtiqueta } from '../Controllers/etiqueta.controller.js';

const router = Router();

router
    .post('/', createEtiqueta)
    .get('/', getEtiquetas)
    .get('/:nombre', getEtiqueta)
    .delete('/:nombre', deleteEtiqueta)
    .put('/:nombre', updateEtiqueta);

export default router;