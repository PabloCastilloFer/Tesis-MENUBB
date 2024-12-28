import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div>Cargando...</div>; // Muestra algo mientras verifica
  }

  return (
    <div>
      <h1>Bienvenido, {user?.username}</h1>
      {/* Resto de tu contenido */}
    </div>
  );
};

export default Home;