import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth/login'; // Ajusta según tu backend

let accessToken = null;

/**
 * Iniciar sesión y guardar el access token en memoria temporal
 * @param {Object} credentials - { email, password }
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(API_URL, credentials, { withCredentials: true });
    accessToken = response.data.accessToken;
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error en el servidor');
  }
};

/**
 * Obtener el access token actual
 */
export const getAccessToken = () => accessToken;

/**
 * Cerrar sesión eliminando el access token de memoria y la cookie del refresh token
 */
export const logoutUser = async () => {
  try {
    await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
    accessToken = null;
  } catch (error) {
    throw new Error('Error al cerrar sesión');
  }
};