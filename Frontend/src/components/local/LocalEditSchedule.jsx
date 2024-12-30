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
        // Convertir valores al formato de 24 horas si es necesario
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
      const filteredSchedule = editedSchedule.map(({ day, isOpen, open, close }) => ({
        day,
        isOpen,
        open,
        close,
      }));
  
      console.log("Datos enviados al backend:", filteredSchedule);
  
      await updateLocalSchedule(id, filteredSchedule);
      alert('Horario actualizado correctamente.');
      navigate('/local/my-local');
    } catch (err) {
      alert('Error al actualizar el horario.');
    }
  };

  if (isLoading) {
    return <p>Cargando horario...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="edit-schedule-container">
      <h1>Editar Horario</h1>
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
                  lang="en-GB" // Forzar formato de 24 horas
                  value={day.isOpen ? day.open : ''} 
                  onChange={(e) => handleChange(index, 'open', e.target.value)}
                  disabled={!day.isOpen}
                />
              </td>
              <td>
                <input
                  type="time"
                  lang="en-GB" // Forzar formato de 24 horas
                  value={day.isOpen ? day.close : ''} 
                  onChange={(e) => handleChange(index, 'close', e.target.value)}
                  disabled={!day.isOpen}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-container">
        <button type="button" onClick={handleSubmit}>
          Guardar Cambios
        </button>
        <button type="button" onClick={() => navigate('/local/my-local')}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default LocalEditSchedule;