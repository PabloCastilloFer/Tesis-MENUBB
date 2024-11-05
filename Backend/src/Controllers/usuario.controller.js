const Usuario = require('../Models/usuario.model.js');

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    const usuario = new Usuario(req.body);
    try {
        const nuevoUsuario = await usuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un usuario existente
exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};