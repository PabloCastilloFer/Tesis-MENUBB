import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateComida } from '../../services/comida.service.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateQuestion, VolverQuestion } from '../../helpers/swaHelper.js';
import '../../styles/Local/LocalEdit.css';

const EditarComida = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const { comida } = location.state;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [archivo, setArchivo] = useState(null);

  // Cargar valores iniciales en los campos
  useEffect(() => {
    setValue('nombreComida', comida.nombreComida);
    setValue('precio', comida.precio);
    setValue('calorias', comida.calorias);
    setValue('proteinas', comida.proteinas);
    setValue('lipidos', comida.lipidos);
    setValue('carbohidratos', comida.carbohidratos);
  }, [comida, setValue]);

  const handleArchivoChange = (e) => {
    setArchivo(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const isConfirmed = await UpdateQuestion();
    
    if (!isConfirmed) {
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('nombreComida', data.nombreComida);
    formData.append('precio', data.precio);
    formData.append('calorias', data.calorias);
    formData.append('proteinas', data.proteinas);
    formData.append('lipidos', data.lipidos);
    formData.append('carbohidratos', data.carbohidratos);
    if (archivo) {
      formData.append('imagen', archivo);
    }

    try {
      const response = await updateComida(comida.id, formData);
      if (response.status === 200) {
        navigate('/mis-comidas');
      } else {
        alert('Error al actualizar la comida');
      }
    } catch (error) {
      alert('Ocurrió un error al actualizar la comida');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVolver = async () => {
    const isConfirmed = await VolverQuestion();
    if (isConfirmed) {
      navigate('/comidas');
    }
  };

  return (
    <div className="edit-local-container">
      <button className="volver-button" onClick={handleVolver}>
        <span>← Volver</span>
      </button>
      <h1>Formulario de edición de comida</h1>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <label htmlFor="nombreComida">Nombre de la comida:</label>
        <input
          id="nombreComida"
          type="text"
          className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
          {...register('nombreComida', { 
            pattern: {
              value: /^[A-Za-z0-9\s]+$/i,
              message: "Solo se permiten letras, números y espacios"
            }
          })}
        />
        {errors.nombreComida && <p className="error-message">{errors.nombreComida.message}</p>}

        <label htmlFor="precio">Precio:</label>
        <input
          id="precio"
          type="number"
          className={`input ${errors.precio ? 'is-danger' : ''}`}
          {...register('precio', { 
            min: { value: 1, message: "El precio mínimo es 1" }
          })}
        />
        {errors.precio && <p className="error-message">{errors.precio.message}</p>}

        <label htmlFor="calorias">Calorías:</label>
        <input
          id="calorias"
          type="number"
          className={`input ${errors.calorias ? 'is-danger' : ''}`}
          {...register('calorias', { valueAsNumber: true, min: { value: 0, message: "Las calorías no pueden ser negativas" } })}
        />
        {errors.calorias && <p className="error-message">{errors.calorias.message}</p>}

        <label htmlFor="proteinas">Proteínas:</label>
        <input
          id="proteinas"
          type="number"
          className={`input ${errors.proteinas ? 'is-danger' : ''}`}
          {...register('proteinas', { valueAsNumber: true, min: { value: 0, message: "Las proteínas no pueden ser negativas" } })}
        />
        {errors.proteinas && <p className="error-message">{errors.proteinas.message}</p>}

        <label htmlFor="lipidos">Lípidos:</label>
        <input
          id="lipidos"
          type="number"
          className={`input ${errors.lipidos ? 'is-danger' : ''}`}
          {...register('lipidos', { valueAsNumber: true, min: { value: 0, message: "Los lípidos no pueden ser negativos" } })}
        />
        {errors.lipidos && <p className="error-message">{errors.lipidos.message}</p>}

        <label htmlFor="carbohidratos">Carbohidratos:</label>
        <input
          id="carbohidratos"
          type="number"
          className={`input ${errors.carbohidratos ? 'is-danger' : ''}`}
          {...register('carbohidratos', { valueAsNumber: true, min: { value: 0, message: "Los carbohidratos no pueden ser negativos" } })}
        />
        {errors.carbohidratos && <p className="error-message">{errors.carbohidratos.message}</p>}

        <label htmlFor="imagen">Imagen:</label>
        <input
          id="imagen"
          name="imagen"
          type="file"
          className={`input ${errors.imagen ? 'is-danger' : ''}`}
          onChange={handleArchivoChange}
        />
        {errors.imagen && <p className="error-message">{errors.imagen.message}</p>}

        <div className="buttons-container">
          <button className={`save-button ${isLoading ? 'is-loading' : ''}`} type="submit">
            Guardar Comida
          </button>
          {isLoading && <p className="help is-info">Guardando comida...</p>}
        </div>
      </form>
    </div>
  );
};

export default EditarComida;
