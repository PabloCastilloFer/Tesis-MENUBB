import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import '../styles/NavBar.css';

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [locales, setLocales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Leer el estado inicial de la barra desde las cookies
    const sidebarState = Cookies.get('isSidebarCollapsed');
    setIsCollapsed(sidebarState === 'true');

    // Leer el rol del usuario desde localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserRole(parsedUser.roles || '');
    }

    // Cargar locales dinámicamente desde la API
    const fetchLocales = async () => {
      try {
        const response = await axios.get('/api/locales'); // Ruta de tu API
        setLocales(response.data.locales || []);
      } catch (error) {
        console.error('Error al cargar los locales:', error);
      }
    };

    fetchLocales();
  }, []);

  const handleToggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);

    // Guardar el estado en las cookies
    Cookies.set('isSidebarCollapsed', newState, { expires: 7 });
  };

  // Opciones específicas por rol
  const menuOptions = {
    user: [
      { name: 'Inicio', path: '/home' },
      { name: 'Menús', path: '/menu' },
    ],
    admin: [
      { name: 'Inicio', path: '/home' },
      { name: 'Gestión de Usuarios', path: '/manage-users' },
      { name: 'Reportes', path: '/reports' },
    ],
    encargado: [
      { name: 'Inicio', path: '/home' },
      { name: 'Mis Locales', path: '/my-locals' },
      { name: 'Menús del Día', path: '/daily-menus' },
    ],
  };

  const options = menuOptions[userRole] || []; // Opciones del menú según el rol

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="toggle-btn" onClick={handleToggleSidebar}>
          {isCollapsed ? '🡸' : '🡺'}
        </button>
      </div>
      <ul className="sidebar-links">
        {/* Opciones del menú general según el rol */}
        {options.map((option, index) => (
          <li key={index} onClick={() => navigate(option.path)}>
            {option.name}
          </li>
        ))}

        {/* Opciones de locales (solo para el rol 'user') */}
        {userRole === 'user' &&
          locales.map((local) => (
            <li key={local.id} onClick={() => navigate(`/local/${local.id}`)}>
              <img src={local.image} alt={local.name} className="local-image" />
              {!isCollapsed && <span className="local-name">{local.name}</span>}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default NavBar;