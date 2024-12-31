import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { logout } from '../../services/auth.service';
import '../../styles/generic/TopBar.css';
import Logo from '../../assets/Icono_MENUBB_Blanco.png'; // Importa el logo
import UserIcon from '../../assets/user-icon.png'; // Importa el icono de usuario

const TopBar = () => {
  const navigate = useNavigate();
  const { setAuthenticated, user } = useAuth(); // Accede al contexto de autenticación
  const [dropdownOpen, setDropdownOpen] = useState(false); // Estado para el menú desplegable
  const username = user?.username; // Cambiar por el valor real del nombre del usuario

  const handleLogout = () => {
    logout(); // Limpia cookies, localStorage, y headers
    setAuthenticated(false); // Actualizar estado global
    window.location.href = '/auth'; // Redirige a la página de inicio de sesión
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="topbar-container">
      <div className="top-bar">
          <div className="logo" onClick={() => navigate('/home')}>
          <img src={Logo} alt="MENUBB Logo" />
        </div>
        <div className="user-section">
          <img src={UserIcon} className="user-icon" alt="User Icon"/>
          <span className="username" onClick={toggleDropdown}>
            Bienvenid@ {username}
          </span>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;