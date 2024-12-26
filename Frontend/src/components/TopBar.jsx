import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { logout } from '../services/auth.service.js';
import iuser from '../assets/user.png'; // Icono de usuario


const TopBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="top-bar">
      <div className="user-section">
        <img src={iuser} alt="User Icon" className="user-icon" />
        <span>Bienvenid@ {user?.username}</span>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default TopBar;