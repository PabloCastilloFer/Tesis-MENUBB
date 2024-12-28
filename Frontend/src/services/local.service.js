import axios from './root.service.js';

export const getAllLocalsData = async () => {
  try {
    const response = await axios.get('/local'); // Usa la baseURL de root.service.js
    return response.data.data; // Retorna solo los datos relevantes
  } catch (error) {
    console.error('Error al obtener los locales:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error al cargar los locales.');
  }
};