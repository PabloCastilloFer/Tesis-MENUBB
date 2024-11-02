import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Obtener todos los locales');
});

router.get('/:id', (req, res) => {
    res.send(`Obtener el local con ID ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('Crear un nuevo local');
});

router.put('/:id', (req, res) => {
    res.send(`Actualizar el local con ID ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Eliminar el local con ID ${req.params.id}`);
});

export default router;