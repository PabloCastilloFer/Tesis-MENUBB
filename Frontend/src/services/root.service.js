import axios from 'axios';
import cookies from 'js-cookie';

// URL base del backend
const API_URL = import.meta.env.VITE_BASE_URL;

// Configuración global de Axios
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Permite enviar y recibir cookies en solicitudes CORS
});

// Interceptor para añadir el token de las cookies en los headers
instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('jwt-auth'); // Busca el token en las cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Añade el token a los headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;