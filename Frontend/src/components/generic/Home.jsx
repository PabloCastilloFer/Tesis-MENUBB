import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo_MENUBB_Blanco.png';
import '../../styles/generic/Home.css';

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
    <div className="logo-menubb">
          <img src={Logo} alt="MENUBB Logo" />
    </div>
  );
};

export default Home;