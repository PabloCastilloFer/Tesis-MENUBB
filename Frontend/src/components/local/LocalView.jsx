import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLocalById } from '../../services/local.service.js';
import '../../styles/local/LocalView.css';

const LocalView = () => {
  const { id } = useParams();
  const [localInfo, setLocalInfo] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

export default LocalView;