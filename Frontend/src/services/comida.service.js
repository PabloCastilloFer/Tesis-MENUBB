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
        const response = await axios.put(`/comida/${id}`, formData, config);
        return response;
    } catch (error) {
        return {
            status: error.response?.status || 500,
            data: error.response?.data || null,
            message: error.response?.data?.message || "Ocurrió un error inesperado",
        };
    }
}

export const getComida = async (id) => {
    try {
        const response = await axios.get(`/comida/${id}`);
        return data = response.data;
        return [data];
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        return { status: 500, data: [error], error: error.message };
    }
}

export const deleteComida = async (id) => {
    try {
        const response = await axios.delete(`/comida/${id}`);
        return response;
    } catch (error) {
        console.error('Error en la solicitud: ', error);
        return { status: 500, data: [error], error: error.message };
    }
};

export const obtenerMisComidas = async () => {
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

      const response = await axios.get('/comida/local/comidas', config);
  
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