import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMyLocal, updateLocalSchedule } from '../../services/local.service.js';
import '../../styles/local/LocalEditSchedule.css';

const LocalEditSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedSchedule, setEditedSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getMyLocal();
        const scheduleWith24HourFormat = data.schedule.map((day) => ({
          ...day,
          open: day.open || '',
          close: day.close || '',
        }));
        setEditedSchedule(scheduleWith24HourFormat);
        setIsLoading(false);
      } catch (err) {
        setError('Error al cargar el horario del local.');
        setIsLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleChange = (index, field, value) => {
    const updatedSchedule = [...editedSchedule];
    updatedSchedule[index][field] = value;
    setEditedSchedule(updatedSchedule);
  };

  const handleSubmit = async () => {
    try {
      // Mapeo de los datos para incluir el formato adecuado
      const filteredSchedule = editedSchedule.map(({ day, isOpen, open, close, _id }) => ({
        _id, // Incluye el _id para identificar cada día en el backend
        day,
        isOpen,
        open: isOpen ? open : '', // Si no está abierto, los valores deben ser cadenas vacías
        close: isOpen ? close : '',
      }));

      // Enviar los datos al backend
      await updateLocalSchedule(id, filteredSchedule);
      alert('Horario actualizado correctamente.');
      navigate('/local/my-local');
    } catch (err) {
      console.error("Error al actualizar el horario:", err);
      alert('Error al actualizar el horario.');
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-message">Cargando horario...</p>
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

  return (
    <div className="edit-schedule-container">
      <button className="volver-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>
      <h1>Editar Horario</h1>
      <fieldset>
        <legend>Horario Semanal</legend>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>¿Abierto?</th>
              <th>Hora de Apertura</th>
              <th>Hora de Cierre</th>
            </tr>
          </thead>
          <tbody>
            {editedSchedule.map((day, index) => (
              <tr key={index}>
                <td>{day.day}</td>
                <td>
                  <select
                    value={day.isOpen}
                    onChange={(e) => handleChange(index, 'isOpen', e.target.value === 'true')}
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
                </td>
                <td>
                  <input
                    type="time"
                    lang="en-GB"
                    value={day.isOpen ? day.open : ''}
                    onChange={(e) => handleChange(index, 'open', e.target.value)}
                    disabled={!day.isOpen}
                  />
                </td>
                <td>
                  <input
                    type="time"
                    lang="en-GB"
                    value={day.isOpen ? day.close : ''}
                    onChange={(e) => handleChange(index, 'close', e.target.value)}
                    disabled={!day.isOpen}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
      <div className="buttons-container">
        <button className="save-button" type="button" onClick={handleSubmit}>
          Guardar Cambios
        </button>
        <button className="cancel-button" type="button" onClick={() => navigate('/local/my-local')}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default LocalEditSchedule;