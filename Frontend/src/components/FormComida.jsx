import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createComida } from '../services/comida.service.js';
import { showError, showConfirmFormComida, CreateQuestion, VolverQuestion } from '../helpers/swaHelper.js';
import '../styles/FormComida.css';

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
        <div className="container">
            <button className="volver-button" onClick={handleVolver}>
                <span>← Volver</span>
            </button>
            <div>
                <h2 className="title">Formulario para crear comida</h2>
                <p className="subtitle">Ingresa los detalles de la nueva comida</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="label">Nombre de la comida:</label>
                        <input
                            type="text"
                            className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                            {...register('nombreComida', { required: "Este campo es obligatorio" })}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Precio:</label>
                        <input
                            type="number"
                            className="input"
                            {...register('precio', { required: "Este campo es obligatorio" })}
                        />
                    </div>
                    <div className="field">
                        <label className="label">Calorías:</label>
                        <input type="number" className="input" {...register('calorias')} />
                    </div>
                    <div className="field">
                        <label className="label">Proteínas:</label>
                        <input type="number" className="input" {...register('proteinas')} />
                    </div>
                    <div className="field">
                        <label className="label">Lípidos:</label>
                        <input type="number" className="input" {...register('lipidos')} />
                    </div>
                    <div className="field">
                        <label className="label">Carbohidratos:</label>
                        <input type="number" className="input" {...register('carbohidratos')} />
                    </div>
                    <div className="field">
                        <label className="label">Imagen:</label>
                        <input type="file" className="input" onChange={handleArchivoChange} />
                    </div>
                    <button
                        className={`button-submit ${isLoading ? 'is-loading' : ''}`}
                        type="submit"
                    >
                        Guardar Comida
                    </button>
                </form>
            </div>
        </div>
    );
}
