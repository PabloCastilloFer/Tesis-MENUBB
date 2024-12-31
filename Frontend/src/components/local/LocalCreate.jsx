import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLocal } from '../../services/local.service';
import '../../styles/local/LocalCreate.css';

const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const LocalCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    accessibility: {
      isAccessible: false,
      details: '',
    },
    image: null,
    schedule: daysOfWeek.map((day) => ({
      day,
      isOpen: false,
      open: '',
      close: '',
    })),
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAccessibilityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      accessibility: {
        ...prevData.accessibility,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    setFormData((prevData) => {
      const updatedSchedule = [...prevData.schedule];
      updatedSchedule[index][field] = value;
      return { ...prevData, schedule: updatedSchedule };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('address', formData.address);
      data.append('accessibility[isAccessible]', formData.accessibility.isAccessible);
      data.append('accessibility[details]', formData.accessibility.details);
      data.append('schedule', JSON.stringify(formData.schedule));
      if (formData.image) {
        data.append('image', formData.image);
      }
      await createLocal(data);
      navigate('/local');
    } catch (err) {
      setError('Error al crear el local. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-local-container">
      <h1>Crear Nuevo Local</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagen:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        <fieldset>
          <legend>Accesibilidad</legend>
          <label>
            Adaptado para personas con discapacidad:
            <input
              type="checkbox"
              name="isAccessible"
              checked={formData.accessibility.isAccessible}
              onChange={handleAccessibilityChange}
            />
          </label>
          <label>
            Detalles:
            <input
              type="text"
              name="details"
              value={formData.accessibility.details}
              onChange={handleAccessibilityChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Horario</legend>
          {formData.schedule.map((day, index) => (
            <div key={index}>
              <label>
                Día: {day.day}
              </label>
              <label>
                Abierto:
                <input
                  type="checkbox"
                  checked={day.isOpen}
                  onChange={(e) =>
                    handleScheduleChange(index, 'isOpen', e.target.checked)
                  }
                />
              </label>
              {day.isOpen && (
                <>
                  <label>
                    Apertura:
                    <input
                      type="time"
                      value={day.open}
                      onChange={(e) =>
                        handleScheduleChange(index, 'open', e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Cierre:
                    <input
                      type="time"
                      value={day.close}
                      onChange={(e) =>
                        handleScheduleChange(index, 'close', e.target.value)
                      }
                    />
                  </label>
                </>
              )}
            </div>
          ))}
        </fieldset>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creando...' : 'Crear Local'}
        </button>
      </form>
    </div>
  );
};

export default LocalCreate;