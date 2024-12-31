import axios from './root.service.js';
import Cookies from 'js-cookie';

export const getUsers = async () => {
    try {
        const token = Cookies.get('jwt-auth');
        if (!token) {
            throw new Error('Token no encontrado en las cookies.');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get('/users', config);

        // Accede a los datos basándote en la estructura exacta del JSON
        const users = response.data?.data;
        if (!users) {
            throw new Error('Los datos de los usuarios no están disponibles en la respuesta.');
        }

        return users;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cargar los usuarios.");
    }
};

export const deleteUser = async (userId, loggedUserId) => {
    try {
        const token = Cookies.get('jwt-auth');
        if (!token) {
            throw new Error('Token no encontrado en las cookies.');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // Incluir la ID del usuario logueado en el cuerpo de la solicitud
        const body = {
            loggedUserId,
        };

        await axios.delete(`/users/${userId}`, { ...config, data: body });
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al eliminar el usuario.");
    }
};

export const getUserById = async (userId) => {
    try {
        const token = Cookies.get('jwt-auth');
        if (!token) {
            throw new Error('Token no encontrado en las cookies.');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`/users/${userId}`, config);

        // Accede a los datos basándote en la estructura exacta del JSON
        const user = response.data?.data;
        if (!user) {
            throw new Error('Los datos del usuario no están disponibles en la respuesta.');
        }

        return user;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al cargar el usuario.");
    }
};

export const updateUser = async (userId, data) => {
    try {
        const token = Cookies.get('jwt-auth');
        if (!token) {
            throw new Error('Token no encontrado en las cookies.');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.put(`/users/${userId}`, data, config);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al actualizar el usuario.");
    }
};

export const createUser = async (data) => {
    try {
        const token = Cookies.get('jwt-auth');
        if (!token) {
            throw new Error('Token no encontrado en las cookies.');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        await axios.post('/users', data, config);
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al crear el usuario.");
    }
}