import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthRedirect = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth'); // Redirige al login si no está autenticado
    }
  }, [isAuthenticated, navigate]);

  return <>{children}</>; // Renderiza los hijos si está autenticado
};

export default AuthRedirect;