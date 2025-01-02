import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLocalById, deleteLocal } from '../../services/local.service.js';
import '../../styles/local/LocalView.css';

const LocalView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localInfo, setLocalInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.roles) {
      setUserRole(user.roles);
    }
  }, []);

  useEffect(() => {
    const fetchLocalInformation = async () => {
      setIsLoading(true);
      try {
        const data = await getLocalById(id);
        setTimeout(() => {
          setLocalInfo(data);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setTimeout(() => {
          setError('Hubo un problema al cargar la información del local.');
          setIsLoading(false);
        }, 500);
      }
    };

    fetchLocalInformation();
  }, [id]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este local?')) {
      try {
        await deleteLocal(id);
        navigate('/local', { replace: true });
      } catch (error) {
        setError('Error al eliminar el local');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/local/${id}/edit`);
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-message">Cargando información...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!localInfo) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-message">Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="local-view-container">
      {/* Botón de Volver */}
      <button className="back-button" onClick={() => navigate(-1)}>
      ← Volver
      </button>

      <h1>{localInfo.name}</h1>
      {localInfo.image && (
        <img src={localInfo.image} alt={localInfo.name} className="local-image" />
      )}

      <fieldset>
        <legend>Información General</legend>
        <p>
          <strong>Dirección:</strong> {localInfo.address}
        </p>
      </fieldset>

      <fieldset>
        <legend>Accesibilidad</legend>
        <p>
          <strong>Adaptado para personas en situación de discapacidad:</strong>{' '}
          {localInfo.accessibility?.isAccessible ? 'Sí' : 'No'}
        </p>
        {localInfo.accessibility?.details && (
          <p>
            <strong>Detalles:</strong> {localInfo.accessibility.details}
          </p>
        )}
      </fieldset>

      <fieldset>
        <legend>Horario</legend>
        {localInfo.schedule?.length > 0 ? (
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Día</th>
                <th>Estado</th>
                <th>Hora de Apertura</th>
                <th>Hora de Cierre</th>
              </tr>
            </thead>
            <tbody>
              {localInfo.schedule.map((day, index) => (
                <tr key={index}>
                  <td>{day.day}</td>
                  <td>{day.isOpen ? 'Abierto' : 'Cerrado'}</td>
                  <td>{day.isOpen ? day.open || ' ' : ' '}</td>
                  <td>{day.isOpen ? day.close || ' ' : ' '}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay horario definido.</p>
        )}
      </fieldset>

      {userRole === 'admin' && (
        <div className="admin-buttons">
          <button className="edit-button" onClick={handleEdit}>
            Editar
          </button>
          <button className="delete-button" onClick={() => handleDelete(localInfo.id)}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default LocalView;