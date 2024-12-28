import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLocalsData } from '../services/local.service.js';
import '../styles/NavBar.css';

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [userRole, setUserRole] = useState(''); // Rol del usuario
  const [locales, setLocales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const data = await getAllLocalsData();
        setLocales(data);
      } catch (error) {
        console.error('Error al cargar los locales:', error.message);
        setLocales([]);
      }
    };
  
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.roles);
      fetchLocales();
    }
  }, []);

  const handleToggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? '' : 'expanded'}`}>
      <button className="toggle-btn" onClick={handleToggleSidebar}>
        {isCollapsed ? '🡸' : '🡺'}
      </button>
      <ul className="sidebar-links">
        {/* Opciones para usuarios 'admin' */}
        {userRole === 'admin' && (
          <>
            <li onClick={() => navigate('/home')}>Inicio</li>
            <li onClick={() => navigate('/manage-users')}>Gestión de Usuarios</li>
            <li onClick={() => navigate('/reports')}>Reportes</li>
          </>
        )}

        {/* Opciones para usuarios 'encargado' */}
        {userRole === 'encargado' && (
          <>
            <li onClick={() => navigate('/home')}>Inicio</li>
            <li onClick={() => navigate('/my-locals')}>Mis Locales</li>
            <li onClick={() => navigate('/daily-menus')}>Menús del Día</li>
          </>
        )}

        {/* Opciones para usuarios 'user' */}
        {userRole === 'user' && (
          <>
            <li onClick={() => navigate('/home')}>Inicio</li>
            {Array.isArray(locales) && locales.map((local) => (
              <li key={local.id} onClick={() => navigate(`/local/${local.id}`)}>
                <img src={local.image} alt={local.name} className="local-image" />
                {!isCollapsed && <span className="local-name">{local.name}</span>}
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;