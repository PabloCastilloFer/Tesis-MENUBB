import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/navbar.jsx';
import { updateComida } from '../services/comida.service.js';
import { useLocation , useNavigate } from 'react-router-dom';
import { UpdateQuestion , VolverQuestion } from '../helpers/swaHelper.js';
const EditarComida = ({ initialData }) => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const { comida } = location.state;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: initialData
    });
    const [isLoading, setIsLoading] = useState(false);
    const [archivo, setArchivo] = useState(null);

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
        formData.append('imagen', archivo);

        try {
            const response = await updateComida(formData, comida._id);
            if (response.status === 200) {
                navigate('/vercomidas');
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
            navigate(-1);
        } 
    };;

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
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:'250px', 
    };

    const BoxStyle = {
        alignItems: 'center',
        paddingTop: '64px', 
        width: '800px',
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
            <Navbar />
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
                        <h2 className="title is-4">Formulario de edición de comida</h2>
                        <p className="subtitle is-6">Ingresa las modificaciones de la comida</p>
                        <div className="columns is-centered">
                            <div className="column is-two-thirds">
                                <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                                    <div className="field">
                                        <label className="label" htmlFor="nombreComida">Nombre de la comida:</label>
                                        <div className="control">
                                            <input
                                                id="nombreComida"
                                                type="text"
                                                placeholder={comida.nombreComida}
                                                className={`input ${errors.nombreComida ? 'is-danger' : ''}`}
                                                {...register('nombreComida', { 
                                                    pattern: {
                                                        value: /^[A-Za-z0-9\s]+$/i,
                                                        message: "Solo se permiten letras, números y espacios"
                                                    }
                                                })}
                                            />
                                        </div>
                                        {errors.nombreComida && <p className="help is-danger">{errors.nombreComida.message}</p>}
                                    </div>
                                    
    
                                    <div className="field">
                                        <label className="label" htmlFor="precio">Precio:</label>
                                        <div className="control">
                                            <input
                                                id="precio"
                                                type="number"
                                                placeholder={comida.precio}
                                                className={`input ${errors.precio ? 'is-danger' : ''}`}
                                                {...register('precio', { 
                                                    
                                                    min: {
                                                        value: 1,
                                                        message: "El precio mínimo es 1"
                                                    }
                                                })}
                                            />
                                        </div>
                                        {errors.precio && <p className="help is-danger">{errors.precio.message}</p>}
                                    </div>
                                    
                                    <div className="field">
                                        <label className="label" htmlFor="calorias">Calorías:</label>
                                        <div className="control">
                                            <input
                                                id="calorias"
                                                type="number"
                                                placeholder="100"
                                                className={`input ${errors.calorias ? 'is-danger' : ''}`}
                                                {...register('calorias', {
                                                    valueAsNumber: true,
                                                    min: { value: 0, message: "Las calorías no pueden ser negativas" }
                                                })} 
                                            />
                                        </div>
                                        {errors.calorias && <p className="help is-danger">{errors.calorias.message}</p>}
                                    </div>
    
    
                                    <div className="field">
                                        <label className="label" htmlFor="proteinas">Proteínas:</label>
                                        <div className="control">
                                            <input
                                                id="proteinas"
                                                type="number"
                                                placeholder="100"
                                                className={`input ${errors.proteinas ? 'is-danger' : ''}`}
                                                {...register('proteinas', {
                                                    valueAsNumber: true,
                                                    min: { value: 0, message: "Las proteínas no pueden ser negativas" }
                                                })}
                                            />
                                        </div>
                                        {errors.proteinas && <p className="help is-danger">{errors.proteinas.message}</p>}
                                    </div>
    
                                    <div className="field">
                                        <label className="label" htmlFor="lipidos">Lípidos:</label>
                                        <div className="control">
                                            <input
                                                id="lipidos"
                                                type="number"
                                                placeholder="100"
                                                className={`input ${errors.lipidos ? 'is-danger' : ''}`}
                                                {...register('lipidos', {
                                                    valueAsNumber: true,
                                                    min: { value: 0, message: "Los lipidos no pueden ser negativas" }
                                                })}
                                            />
                                        </div>
                                        {errors.lipidos && <p className="help is-danger">{errors.lipidos.message}</p>}
                                    </div>
    
    
                                    <div className="field">
                                        <label className="label" htmlFor="carbohidratos">Carbohidratos:</label>
                                        <div className="control">
                                            <input
                                                id="carbohidratos"
                                                type="number"
                                                placeholder="100"
                                                className={`input ${errors.carbohidratos ? 'is-danger' : ''}`}
                                                {...register('carbohidratos', {
                                                    valueAsNumber: true,
                                                    min: { value: 0, message: "Los carbohidratos no pueden ser negativas" }
                                                })}
                                            />
                                        </div>
                                        {errors.carbohidratos && <p className="help is-danger">{errors.carbohidratos.message}</p>}
                                    </div>
    
    
                                    <div className="field">
                                        <label className="label" htmlFor="imagen">Imagen:</label>
                                        <div className="control">
                                            <input
                                                id="imagen"
                                                name="imagen"
                                                type="file"
                                                className={`input ${errors.imagen ? 'is-danger' : ''}`}
                                                onChange={handleArchivoChange}
                                            />
                                        </div>
                                        {errors.imagen && <p className="help is-danger">{errors.imagen.message}</p>}
                                    </div>
    
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button
                                                className={`button is-link ${isLoading ? 'is-loading' : ''}`}
                                                type="submit"
                                            >
                                                Guardar Comida
                                            </button>
                                        </div>
                                        {isLoading && <p className="help is-info">Guardando comida...</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
    
};

export default EditarComida;