import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLocalById, updateLocal } from '../../services/local.service.js';
import '../../styles/local/LocalEdit.css';

const EditLocal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [localInfo, setLocalInfo] = useState(null);
  
  const [form, setForm] = useState({
    name: '',
    address: '',
    accessibility: { isAccessible: false, details: '' },
    image: '',
    schedule: [],
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocal = async () => {
      try {
        const data = await getLocalById(id);
        setLocalInfo(data);
        setForm({
          name: data.name,
          address: data.address,
          accessibility: {
            isAccessible: data.accessibility?.isAccessible || false,
            details: data.accessibility?.details || '',
          },
          image: data.image,
          schedule: data.schedule || [],
        });
        setIsLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del local.');
        setIsLoading(false);
      }
    };

    fetchLocal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAccessibilityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      accessibility: {
        ...prev.accessibility,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleScheduleChange = (index, field, value) => {
    setForm((prev) => {
      const newSchedule = [...prev.schedule];
      newSchedule[index][field] = value;
      return { ...prev, schedule: newSchedule };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLocal(id, form);
      alert('Local actualizado correctamente.');
      navigate(`/local/${id}`);
    } catch (err) {
      setError('Error al actualizar el local.');
    }
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar? Los cambios no guardados se perderán.')) {
      navigate(-1); // Navegar a la página anterior
    }
  };

  if (isLoading) return <p>Cargando datos del local...</p>;
  if (error) return <p>{error}</p>;

  return (
<div className="edit-local-container">
  <button className="volver-button" onClick={() => navigate(-1)}>
  ← Volver
  </button>
  <h1>Editar Local</h1>
  <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagen:
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </label>
        <fieldset>
          <legend>Accesibilidad</legend>
          <label>
            Adaptado para personas con discapacidad:
            <input
              type="checkbox"
              name="isAccessible"
              checked={form.accessibility.isAccessible}
              onChange={handleAccessibilityChange}
            />
          </label>
          <label>
            Detalles:
            <input
              type="text"
              name="details"
              value={form.accessibility.details}
              onChange={handleAccessibilityChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <legend>Horario</legend>
          {form.schedule.map((day, index) => (
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
        <div className="buttons-container">
        <button className="save-button" type="button" onClick={handleSubmit}>
          Guardar Cambios
        </button>
        <button className="cancel-button" type="button" onClick={() => navigate('/local/my-local')}>
          Cancelar
        </button>
      </div>
  </form>
</div>
  );
};

export default EditLocal;