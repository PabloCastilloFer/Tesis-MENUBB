import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createComida } from '../services/comida.service';

export default function FormComida() {
    const navigate = useNavigate();

    const [archivo, setArchivo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try { 
            const isConfirmed = await CreateQuestion();
        
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
        formData.append('imagen', archivo);

        const response = await createComida(formData);

        if (response.status === 201) {
            await showConfirmFormTarea();
            setArchivo(null);
            reset();
        } else if (response.status === 400) {
            await showError(response.data[0].response.data.message);
        } else if (response.status === 500) {
            await showError(response.data[0].response.data.message);
        }

        } catch (error) {
            console.log("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleArchivoChange = (e) => {
        setArchivo(e.target.files[0]);
    };

    const handleVolver = async () => {
        const isConfirmed = await VolverQuestion();
        if (isConfirmed) {
            navigate(-1);
        } 
    };

    function ArrowLeftIcon(props) {
        return (
            <svg
                {...props}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
            </svg>
        );
    }

    const containerStyle = {
        display: 'flex',
        marginTop: '64px',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:'250px', 
    };

    const BoxStyle = {
        alignItems: 'center',
        paddingTop: '64px', 
        width: '700px',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        textAlign: 'center',
        position: 'relative', 
    };

    const volverButtonStyle = {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
    };

return (
    <div style={containerStyle}>
            <div style={BoxStyle}>
                <div style={volverButtonStyle}>
                    <button className="button is-light" onClick={handleVolver}>
                        <span className="icon is-small">
                            <ArrowLeftIcon />
                        </span>
                        <span>Volver</span>
                    </button>
                </div>
                <div>
                    <h2 className="title is-4">Formulario para crear comida</h2>
                    <p className="subtitle is-6">Ingresa los detalles de la nueva comida</p>
                    <div className="columns is-centered">
                        <div className="column is-two-thirds">
                            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                <div className="field">
                                    <label className="label" htmlFor="nombreComida">Nombre de la comida:</label>
                                    <div className="control">
                                        <input
                                            id="nombreComida"
                                            type="text"
                                            placeholder="Puré"
                                            className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                                            {...register('nombreComida', { 
                                                required: "Este campo es obligatorio",
                                                pattern: {
                                                    value: /^[A-Za-z0-9\s]+$/i,
                                                    message: "Solo se permiten letras, números y espacios"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.nombreTarea && <p className="help is-danger">{errors.nombreComida.message}</p>}
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="nombreComida">Precio:</label>
                                    <div className="control">
                                        <input
                                            id="nombreComida"
                                            type="text"
                                            placeholder="Puré"
                                            className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                                            {...register('nombreComida', { 
                                                required: "Este campo es obligatorio",
                                                pattern: {
                                                    value: /^[A-Za-z0-9\s]+$/i,
                                                    message: "Solo se permiten letras, números y espacios"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.nombreTarea && <p className="help is-danger">{errors.nombreComida.message}</p>}
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="archivoAdjunto">Imagen:</label>
                                    <div className="control">
                                        <input
                                            id="archivoAdjunto"
                                            type="file"
                                            className="input"
                                            onChange={handleArchivoChange}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="nombreComida">Calorias:</label>
                                    <div className="control">
                                        <input
                                            id="nombreComida"
                                            type="text"
                                            placeholder="Puré"
                                            className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                                            {...register('nombreComida', { 
                                                required: "Este campo es obligatorio",
                                                pattern: {
                                                    value: /^[A-Za-z0-9\s]+$/i,
                                                    message: "Solo se permiten letras, números y espacios"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.nombreTarea && <p className="help is-danger">{errors.nombreComida.message}</p>}
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="nombreComida">Proteínas:</label>
                                    <div className="control">
                                        <input
                                            id="nombreComida"
                                            type="text"
                                            placeholder="Puré"
                                            className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                                            {...register('nombreComida', { 
                                                required: "Este campo es obligatorio",
                                                pattern: {
                                                    value: /^[A-Za-z0-9\s]+$/i,
                                                    message: "Solo se permiten letras, números y espacios"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.nombreTarea && <p className="help is-danger">{errors.nombreComida.message}</p>}
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="nombreComida">Lípidos:</label>
                                    <div className="control">
                                        <input
                                            id="nombreComida"
                                            type="text"
                                            placeholder="Puré"
                                            className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                                            {...register('nombreComida', { 
                                                required: "Este campo es obligatorio",
                                                pattern: {
                                                    value: /^[A-Za-z0-9\s]+$/i,
                                                    message: "Solo se permiten letras, números y espacios"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.nombreTarea && <p className="help is-danger">{errors.nombreComida.message}</p>}
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="nombreComida">Carbohidratos:</label>
                                    <div className="control">
                                        <input
                                            id="nombreComida"
                                            type="text"
                                            placeholder="Puré"
                                            className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                                            {...register('nombreComida', { 
                                                required: "Este campo es obligatorio",
                                                pattern: {
                                                    value: /^[A-Za-z0-9\s]+$/i,
                                                    message: "Solo se permiten letras, números y espacios"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.nombreTarea && <p className="help is-danger">{errors.nombreComida.message}</p>}
                                </div> 
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button
                                            className={`button is-link ${isLoading ? 'is-loading' : ''}`}
                                            type="submit"
                                        >
                                            Guardar Tarea
                                        </button>
                                    </div>
                                    {isLoading && <p className="help is-info">Guardando tarea...</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
}