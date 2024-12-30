import React, { useEffect, useState } from 'react';
import { getMyLocal } from '../../services/local.service.js';
import '../../styles/local/LocalView.css';

const LocalViewMy = () => {
  const [localInfo, setLocalInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado para el spinner

  useEffect(() => {
    const fetchLocalInformation = async () => {
      try {
        const data = await getMyLocal(); // Llama al servicio
        setTimeout(() => {
          setLocalInfo(data);
          setIsLoading(false); // Termina el estado de carga después del retraso
        }, 500); // Simula 1 segundo adicional de carga
      } catch (err) {
        setTimeout(() => {
          setError('Hubo un problema al cargar la información del local.');
          setIsLoading(false); // Termina el estado de carga después del retraso
        }, 500);
      }
    };

    fetchLocalInformation();
  }, []);

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
    <div className="local-info-container">
      <h1>{localInfo.name}</h1>
      {localInfo.image && (
        <img src={localInfo.image} alt={localInfo.name} className="local-image" />
      )}
      <p><strong>Dirección:</strong> {localInfo.address}</p>

      <h2>Accesibilidad</h2>
      <p>
        <strong>Adaptación para personas en situación de discapacidad:</strong> {localInfo.accessibility?.isAccessible ? 'Sí' : 'No'}
      </p>
      {localInfo.accessibility?.details && (
        <p><strong>Detalles:</strong> {localInfo.accessibility.details}</p>
      )}

      <h2>Horario</h2>
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
    </div>
  );
};

export default LocalViewMy;