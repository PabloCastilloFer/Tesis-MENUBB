import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLocalsData } from '../../services/local.service.js';
import '../../styles/generic/NavBar.css';

const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // Controla el submenú activo
  const [userRole, setUserRole] = useState('');
  const [locales, setLocales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedState = localStorage.getItem("navbarCollapsed");
    if (savedState) {
      setIsCollapsed(savedState === "true");
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user')); // Obtener datos del usuario
        if (user && user.roles) {
          setUserRole(user.roles); // Asignar el rol del usuario
  
          // Realizar la solicitud según el rol
          if (user.roles === 'user') {
            const data = await getAllLocalsData();
            setLocales(data);
          }
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error.message);
        setLocales([]); // Respaldo en caso de error
      }
    };
  
    fetchData(); // Ejecutar la función de forma asíncrona
  }, []); // Solo se ejecuta al montar el componente

  const toggleNavbar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("navbarCollapsed", newState);
  };

  const toggleSubmenu = (localId) => {
    // Alterna el estado del submenú activo
    setActiveSubmenu(activeSubmenu === localId ? null : localId);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <button className="toggle-btn-sidebar" onClick={toggleNavbar}>
        {isCollapsed ? '🡸' : '🡺'}
      </button>
      <ul className="sidebar-links">
        {/* Opciones para usuarios 'admin' */}
        {userRole === 'admin' && (
          <>
            <li onClick={() => navigate('/local')}>
              <span className="local-icon-sidebar">🏢</span> {/* Ícono siempre visible */}
              {!isCollapsed && 'Locales'} {/* Texto visible solo cuando está expandido */}
            </li>
            <li onClick={() => navigate('/users')}>
              <span className="local-icon-sidebar">👤</span> {/* Ícono siempre visible */}
              {!isCollapsed && 'Usuarios'} {/* Texto visible solo cuando está expandido */}
            </li>
          </>
        )}

        {/* Opciones para usuarios 'encargado' */}
        {userRole === 'encargado' && (
          <>
            <li onClick={() => navigate('/local/my-local')}>
              <span className="local-icon-sidebar">🏠</span>
              {!isCollapsed && 'Mi Local'}
            </li>
            <li onClick={() => navigate('/comidas')}>
            <span className="local-icon-sidebar">🍔</span>
              {!isCollapsed && 'Comidas'}
            </li>
          </>
        )}

        {/* Opciones para usuarios 'user' */}
        {userRole === 'user' && (
          <>
            {Array.isArray(locales) &&
              locales.map((local) => (
                <li key={local.id} className="local-item-sidebar">
                  {/* Encabezado del local */}
                  <div
                    onClick={() => toggleSubmenu(local.id)}
                    className={`local-header-sidebar ${activeSubmenu === local.id ? 'active' : ''}`}
                  >
                    {/* Si la barra está colapsada, mostramos solo el ícono */}
                    <img
                      src={local.image}
                      alt={local.name}
                      className="local-image-sidebar"
                    />
                    {!isCollapsed && <span className="local-name-sidebar">{local.name}</span>}
                  </div>

                  {/* Submenú anidado */}
                  <ul
                    className={`nested-menu-sidebar ${activeSubmenu === local.id ? 'visible' : 'hidden'}`}
                  >
                    <li onClick={() => navigate(`/local/${local.id}`)}>Información</li>
                    <li onClick={() => navigate(`/comidas`, { state: { localId: local.id } })}> {/* Enviar el localId como estado */}
              Comida
            </li>
                  </ul>
                </li>
              ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;