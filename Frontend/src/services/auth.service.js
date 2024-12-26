import axios from './root.service.js';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post('auth/login', {
      email,
      password,
    });
    const { status, data } = response;
    if (status === 200) {
      const { id, email, roles ,local} = await jwtDecode(data.data.accessToken);
      localStorage.setItem('user', JSON.stringify({id, email, roles ,local}));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.data.accessToken}`;
      cookies.set('jwt-auth', data.data.accessToken, { path: '/' });
      return data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error; // Lanzar el error para que pueda ser capturado por el catch en LoginForm
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  delete axios.defaults.headers.common['Authorization'];
  cookies.remove('jwt');
  cookies.remove('jwt-auth');
};