import User from '../Models/user.model.js';
import bcrypt from 'bcryptjs';
import { validateUser } from '../Validations/user.validation.js';

// Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('roles').populate('locales').populate('favoritos');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};

// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roles').populate('locales').populate('favoritos');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
};

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    // Validar los datos de entrada usando Joi
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details.map(err => err.message) });

    try {
        const { username, rut, password, email, roles, locales, favoritos } = req.body;

        // Verificar si el usuario o email ya existen
        const existingUser = await User.findOne({ $or: [{ rut }, { email }] });
        if (existingUser) return res.status(400).json({ message: 'El usuario con ese RUT o correo ya existe' });

        // Encriptar la contraseña
        const hashedPassword = await User.encryptPassword(password);

        // Crear un nuevo usuario
        const newUser = new User({
            username,
            rut,
            password: hashedPassword,
            email,
            roles,
            locales,
            favoritos
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario creado exitosamente', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
};

// Actualizar un usuario por ID
export const updateUser = async (req, res) => {
    const { id } = req.params;

    // Validar los datos de entrada usando Joi
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ message: error.details.map(err => err.message) });

    try {
        const { password, ...updateData } = req.body;

        // Si se envía una nueva contraseña, encriptarla antes de actualizar
        if (password) {
            updateData.password = await User.encryptPassword(password);
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true })
            .populate('roles')
            .populate('locales')
            .populate('favoritos');

        if (!updatedUser) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json({ message: 'Usuario actualizado exitosamente', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
};

// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};