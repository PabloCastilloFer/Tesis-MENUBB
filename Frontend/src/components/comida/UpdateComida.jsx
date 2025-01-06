import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { updateComida } from '../../services/comida.service.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateQuestion, VolverQuestion } from '../../helpers/swaHelper.js';
import '../../styles/local/LocalEdit.css';

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
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off" className="create-comida-form">
  <div className="form-group">
    <label className="label">Nombre de la comida:</label>
    <input
      type="text"
      className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
      {...register('nombreComida', { 
        required: "El nombre de la comida es obligatorio.",
        pattern: {
          value: /^[A-Za-zÁ-Úá-ú0-9\s]+$/u,
          message: "El nombre solo puede contener letras, números y espacios."
        }
      })}
    />
    {errors.nombreComida && <p className="help is-danger">{errors.nombreComida.message}</p>}
  </div>

  <div className="form-group">
    <label className="label">Precio:</label>
    <input
      type="number"
      className={`input ${errors.precio ? 'is-danger' : ''}`}
      {...register('precio', { 
        required: "El precio es obligatorio.",
        min: {
          value: 1,
          message: "El precio debe ser mayor a 0."
        }
      })}
    />
    {errors.precio && <p className="help is-danger">{errors.precio.message}</p>}
  </div>

  <div className="form-group">
    <label className="label">Calorías:</label>
    <input
      type="number"
      className={`input ${errors.calorias ? 'is-danger' : ''}`}
      {...register('calorias', { 
        min: {
          value: 1,
          message: "Las calorías deben ser mayor a 0."
        }
      })}
    />
    {errors.calorias && <p className="help is-danger">{errors.calorias.message}</p>}
  </div>

  <div className="form-group">
    <label className="label">Proteínas:</label>
    <input
      type="number"
      className={`input ${errors.proteinas ? 'is-danger' : ''}`}
      {...register('proteinas', { 
        min: {
          value: 1,
          message: "Las proteínas deben ser mayor a 0."
        }
      })}
    />
    {errors.proteinas && <p className="help is-danger">{errors.proteinas.message}</p>}
  </div>

  <div className="form-group">
    <label className="label">Lípidos:</label>
    <input
      type="number"
      className={`input ${errors.lipidos ? 'is-danger' : ''}`}
      {...register('lipidos', { 
        min: {
          value: 1,
          message: "Los lípidos deben ser mayor a 0."
        }
      })}
    />
    {errors.lipidos && <p className="help is-danger">{errors.lipidos.message}</p>}
  </div>

  <div className="form-group">
    <label className="label">Carbohidratos:</label>
    <input
      type="number"
      className={`input ${errors.carbohidratos ? 'is-danger' : ''}`}
      {...register('carbohidratos', { 
        min: {
          value: 1,
          message: "Los carbohidratos deben ser mayor a 0."
        }
      })}
    />
    {errors.carbohidratos && <p className="help is-danger">{errors.carbohidratos.message}</p>}
  </div>

  <div className="form-group">
    <label className="label">Imagen:</label>
    <input
      type="file"
      className={`input ${errors.imagen ? 'is-danger' : ''}`}
      onChange={handleArchivoChange}
    />
    {errors.imagen && <p className="help is-danger">{errors.imagen.message}</p>}
  </div>

  <button
    className={`save-button ${isLoading ? 'is-loading' : ''}`}
    type="submit"
  >
    Guardar Comida
  </button>
</form>


    </div>
  );
};

export default EditarComida;
