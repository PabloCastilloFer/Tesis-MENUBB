import axios from './root.service.js';
import cookies from 'js-cookie';
import * as jwt from 'jwt-decode';

const jwtDecode = jwt.default || jwt.jwtDecode || jwt; // Compatibilidad con diferentes estructuras

export const login = async ({ email, password }) => {
  try {
    // Enviar credenciales al backend
    const response = await axios.post('auth/login', { email, password });
    const { status, data } = response;

    // Verificar que el estado sea exitoso y el token esté presente
    if (status === 200 && data?.message?.accessToken) {
      const accessToken = data.message.accessToken;

      // Decodificar el token
      const decodedToken = jwtDecode(accessToken);
      const { id, username, roles, local } = decodedToken;

      // Guardar información en localStorage y cookies
      localStorage.setItem('user', JSON.stringify({ id, username, roles,local }));
      cookies.set('jwt-auth', accessToken, { path: '/' });
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return data; // Devolver los datos del backend
    } else {
      console.error('Token no presente en la respuesta:', data);
      throw new Error('Token no válido o no presente.');
    }
  } catch (error) {
    console.error('Error en el login:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error desconocido al iniciar sesión.');
  }
};

export const logout = () => {
  try {
    // Limpiar cookies relacionadas con el JWT
    cookies.remove('jwt', { path: '/' }); // Por si hay otra cookie JWT
    cookies.remove('jwt-auth', { path: '/' }); // Asegúrate de que el path coincida

    // Limpiar localStorage
    localStorage.removeItem('user');

    // Limpia headers globales
    delete axios.defaults.headers.common['Authorization'];

    console.log('Cierre de sesión exitoso.');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
  }
};

export const register = async ({ username, email }) => {
  try {
    const response = await axios.post('auth/register', { username, email });
    const { status, data } = response;

    if (status === 201 && data?.message) {
      return data;
    } else {
      console.error('Datos no presentes en la respuesta:', data);
      throw new Error('Datos no válidos o no presentes.');
    }
  } catch (error) {
    console.error('Error en el registro:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error desconocido al registrar usuario.');
  }
}

export const forgotPassword = async ({ email }) => {
  try {
    const response = await axios.post('auth/forgot-password', { email });
    const { status, data } = response;

    if (status === 200 && data?.message) {
      return data;
    } else {
      console.error('Datos no presentes en la respuesta:', data);
      throw new Error('Datos no válidos o no presentes.');
    }
  } catch (error) {
    console.error('Error al solicitar nueva contraseña:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Error desconocido al solicitar nueva contraseña.');
  }
}