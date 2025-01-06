import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyLocal } from '../../services/local.service.js';
import '../../styles/local/LocalViewMy.css';

const LocalViewMy = () => {
  const [localInfo, setLocalInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocalInformation = async () => {
      try {
        const data = await getMyLocal();
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
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p2 className="loading-message">Cargando información...</p2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p2 className="error-message">{error}</p2>
      </div>
    );
  }

  if (!localInfo) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p2 className="loading-message">Cargando información...</p2>
      </div>
    );
  }

  return (
    <div className="local-info-container">
      <h1>{localInfo.name}</h1>
      {localInfo.image && (
        <img src={localInfo.image} alt={localInfo.name} className="local-image" />
      )}

      <fieldset>
        <legend>Información General</legend>
        <p><strong>Dirección:</strong> {localInfo.address}</p>
      </fieldset>

      <fieldset>
        <legend>Accesibilidad</legend>
        <p>
          <strong>Adaptación para personas en situación de discapacidad:</strong>{' '}
          {localInfo.accessibility?.isAccessible ? 'Sí' : 'No'}
        </p>
        {localInfo.accessibility?.details && (
          <p><strong>Detalles:</strong> {localInfo.accessibility.details}</p>
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

      <div className="buttons-container">
        <button
          className="edit-schedule-button"
          onClick={() => navigate(`/local/${localInfo.id}/schedule`)}
        >
          Editar Horario
        </button>
      </div>
    </div>
  );
};

export default LocalViewMy;