import axios from './root.service.js';
import Cookies from 'js-cookie';

export const createComida = async (formData, jwt) => {
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
            'Authorization': `Bearer ${jwt}`
        };
        const response = await axios.post('/comida', formData, config);
        console.log(response);
        return response;
    } catch (error) {
        return {
            status: error.response?.status || 500,
            data: error.response?.data || null,
            message: error.response?.data?.message || "Ocurrió un error inesperado",
        };
    }
};

export const updateComida = async (id, formData) => {
    try {
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' },
        };
        const response = await axios.patch(`/comida/${id}`, formData, config);
        return response;
    } catch (error) {
        return {
            status: error.response?.status || 500,
            data: error.response?.data || null,
            message: error.response?.data?.message || "Ocurrió un error inesperado",
        };
    }
}

export const getComida = async (localId) => {
    try {
        const response = await axios.get(`/comida/comidas/${localId}`);
        return response.data; // Devuelve los datos correctamente
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        return { status: 500, data: [], error: error.message }; // Devuelve un objeto de error
    }
};

export const deleteComida = async (id) => {
    try {
        const response = await axios.delete(`/comida/${id}`);
        return response;
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        return { status: 500, data: [error], error: error.message };
    }
};

export const obtenerMisComidas = async (localId) => {
    try {
      // Obtener el token desde las cookies
      const token = Cookies.get('jwt-auth');
      if (!token) {
        throw new Error('Token no encontrado en las cookies.');
      }
  
      // Configurar los headers con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(`/comida/local/comidas`, config);
  
      return response.data;
    } catch (error) {
      console.error(
        'Error en la solicitud de mis comidas:',
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.message || 'Error al cargar las comidas.'
      );
    }
  };

//Para el admin

export const obtenerComidas = async () => {
    try {
        const response = await axios.get('/comida');
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return [];
    }
};

export const cambiarEstadoComida = async (id) => {
    try {
        const response = await axios.patch(`/comida/estado/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return [];
    }
}