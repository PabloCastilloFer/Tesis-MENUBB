import React, { createContext, useContext, useEffect, useState } from 'react';
import cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || null;

  useEffect(() => {
    const token = cookies.get('jwt-auth');
    if (token && user) {
      setAuthenticated(true); // Autenticado si hay token y usuario
    } else {
      setAuthenticated(false); // No autenticado si faltan datos
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};