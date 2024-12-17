import axios from './root.service'; // Asegúrate de que `root.service` tenga la configuración base de axios

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post('/auth/login', { email, password });
    return response;
  } catch (error) {
    return {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'Error inesperado',
    };
  }
};