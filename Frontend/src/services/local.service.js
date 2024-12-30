import axios from './root.service.js';
import Cookies from 'js-cookie';

export const getAllLocalsData = async () => {
  try {
    const response = await axios.get('/local');
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener los locales:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al cargar los locales.');
  }
};

export const getLocalById = async (localId) => {
  try {
    const response = await axios.get(`/local/${localId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener el local:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al cargar el local.');
  }
}

export const getMyLocal = async () => {
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

    const response = await axios.get('/local/my-local', config);

    return response.data;
  } catch (error) {
    console.error('Error en getMyLocal:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al cargar el local.');
  }
};