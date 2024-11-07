import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../Controllers/user.controller.js';

const router = express.Router();

router.get('/', getAllUsers); // Obtener todos los locales
router.get('/:id', getUserById); // Obtener local por ID
router.post('/', createUser); // Crear un nuevo local
router.put('/:id', updateUser); // Actualizar local por ID
router.delete('/:id', deleteUser); // Eliminar local por ID

export default router;