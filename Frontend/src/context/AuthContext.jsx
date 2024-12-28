import React, { createContext, useContext, useEffect, useState } from 'react';
import cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Verifica si el usuario está autenticado al montar
  useEffect(() => {
    const token = cookies.get('jwt-auth');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (token && storedUser) {
      setAuthenticated(true);
      setUser(storedUser);
    } else {
      setAuthenticated(false);
      setUser(null);
    }
  }, []);

  // Función para cerrar sesión
  const logout = () => {
    cookies.remove('jwt'); // Elimina el token de las cookies
    cookies.remove('jwt-auth'); // Elimina el token de las cookies
    localStorage.removeItem('user'); // Limpia el usuario del localStorage
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };