import axios from "axios";
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

        const response = await axios.get('/users/', config);
        console.log("Usuarios cargados:", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error al obtener los usuarios:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al cargar los usuarios.");
    }
};

export const deleteUser = async (id) => {
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

        await axios.delete(`/users/${id}`, config);
    } catch (error) {
        console.error("Error al eliminar el usuario:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error al eliminar el usuario.");
    }
};