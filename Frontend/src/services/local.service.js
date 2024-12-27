import axios from 'axios';

export const getLocales = async () => {
  try {
    const response = await axios.get(`/locales`);
    return response.data.locales || [];
  } catch (error) {
    console.error('Error al obtener los locales:', error);
    throw error;
  }
};