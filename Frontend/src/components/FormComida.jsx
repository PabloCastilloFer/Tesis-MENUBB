import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createComida } from '../services/comida.service.js';
import { showError, showConfirmFormComida, CreateQuestion, VolverQuestion } from '../helpers/swaHelper.js';
import '../styles/comida/ComidaCreate.css';

export default function FormComida() {
    const navigate = useNavigate();
    const [archivo, setArchivo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try { 
            const isConfirmed = await CreateQuestion();
            if (!isConfirmed) return;

            setIsLoading(true);
            const formData = new FormData();
            formData.append('nombreComida', data.nombreComida);
            formData.append('precio', data.precio);
            formData.append('calorias', data.calorias);
            formData.append('proteinas', data.proteinas);
            formData.append('lipidos', data.lipidos);
            formData.append('carbohidratos', data.carbohidratos);
            formData.append('imagen', archivo);

            const response = await createComida(formData);
            if (response.status === 201) {
                await showConfirmFormComida();
                setArchivo(null);
                reset();
            } else {
                await showError(response.data?.message || "Error en la solicitud");
            }
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleArchivoChange = (e) => setArchivo(e.target.files[0]);

    const handleVolver = async () => {
        const isConfirmed = await VolverQuestion();
        if (isConfirmed) navigate(-1);
    };

    return (
        <div className="create-local-container">
            <button className="volver-button" onClick={handleVolver}>
                <span>← Volver</span>
            </button>
            <div>
                <h1 className="title">Formulario para crear comida</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="create-local-form">
                    <div className="form-group">
                        <label className="label">Nombre de la comida:</label>
                        <input
                            type="text"
                            className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                            {...register('nombreComida', { required: "Este campo es obligatorio" })}
                        />
                        {errors.nombreComida && <p className="help is-danger">{errors.nombreComida.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="label">Precio:</label>
                        <input
                            type="number"
                            className="input"
                            {...register('precio', { required: "Este campo es obligatorio" })}
                        />
                        {errors.precio && <p className="help is-danger">{errors.precio.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="label">Calorías:</label>
                        <input type="number" className="input" {...register('calorias', { required: "Este campo es obligatorio" })} />
                        {errors.calorias && <p className="help is-danger">{errors.calorias.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="label">Proteínas:</label>
                        <input type="number" className="input" {...register('proteinas', { required: "Este campo es obligatorio" })} />
                        {errors.proteinas && <p className="help is-danger">{errors.proteinas.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="label">Lípidos:</label>
                        <input type="number" className="input" {...register('lipidos', { required: "Este campo es obligatorio" })} />
                        {errors.lipidos && <p className="help is-danger">{errors.lipidos.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="label">Carbohidratos:</label>
                        <input type="number" className="input" {...register('carbohidratos', { required: "Este campo es obligatorio" })} />
                        {errors.carbohidratos && <p className="help is-danger">{errors.carbohidratos.message}</p>}
                    </div>
                    <div className="form-group">
                        <label className="label">Imagen:</label>
                        <input type="file" className="input" onChange={handleArchivoChange} {...register('imagen', { required: "Este campo es obligatorio" })}/>
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
        </div>
    );
}