import React from 'react';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const { logout, user } = useAuth();

  return (
    <div className="top-bar">
      <h1>MENUBB</h1>
      {user && (
        <button onClick={logout} className="button is-danger">
          Cerrar Sesión
        </button>
      )}
    </div>
  );
};

export default TopBar;