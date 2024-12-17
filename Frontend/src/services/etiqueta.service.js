import axios from './root.service.js';

export const addEtiqueta = async (id, etiqueta) => {
    try {
        const response = await axios.patch(`/etiqueta/${id}`, { etiqueta });
        return response;
    } catch (error) {
        console.error("Error al añadir etiqueta:", error);
        throw error;
    }
};