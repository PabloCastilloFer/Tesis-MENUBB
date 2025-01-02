import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/root.service.js';
import { deleteComida } from '../services/comida.service.js';
import { showDeleteComida, DeleteQuestion } from '../helpers/swaHelper.js';
import '../styles/comida/ComidaViewAll.css';

export default function VerComidas() {
    const navigate = useNavigate();
    const [comidas, setComidas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [idLocalUsuario, setIdLocalUsuario] = useState(''); // Aquí guardamos el id del local del usuario logeado

    useEffect(() => {
        fetchData();
        // Aquí obtienes el id del local del usuario logueado
        // Esto depende de cómo estés gestionando el estado del usuario.
        const localStorageUser = JSON.parse(localStorage.getItem('user')); // Esto es un ejemplo
        setIdLocalUsuario(localStorageUser?.localId); // Ajusta según cómo guardes el id del local
    }, []);

    const fetchData = () => {
        axios.get('/comida')
            .then((response) => {
                setComidas(Array.isArray(response.data) ? response.data : []);
            })
            .catch(() => setComidas([]));
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleEditClick = (comida) => navigate('/comida/modificar', { state: { comida } });

    const handleCreateClick = () => navigate('/crear-comida');

    const handleDeleted = async (comida) => {
        const isConfirmed = await DeleteQuestion();
        if (isConfirmed) {
            try {
                const response = await deleteComida(comida._id);
                if (response.status === 200) {
                    await showDeleteComida();
                    setComidas((prevComidas) => prevComidas.filter((c) => c._id !== comida._id));
                }
            } catch (error) {
                console.error('Error al eliminar la comida', error);
            }
        }
    };

    const filteredComidas = comidas.filter(comida => 
        comida.nombreComida.toLowerCase().includes(searchQuery.toLowerCase()) &&
        comida.idLocal === idLocalUsuario // Filtrar por el id del local del usuario
    );

    return (
        <div className="local-grid-page">
            <div className="header-container">
                <h1 className="page-title">Lista de Comidas</h1>
                <div className="search-add-container">
                    <input
                        type="text"
                        placeholder="Buscar por nombre de comida..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button className="create-button" onClick={handleCreateClick}>
                        Crear comida
                    </button>
                </div>
            </div>

            <div className="local-grid">
                {filteredComidas.length === 0 ? (
                    <p>No hay comidas existentes con ese nombre.</p>
                ) : (
                    filteredComidas.reverse().map((comida, index) => (
                        <div key={index} className="local-card">
                            <img 
                                src={comida.imagen || 'placeholder.png'} 
                                alt={comida.nombreComida} 
                                className="local-image-card"
                            />
                            <h2 className="local-name-card" onClick={() => handleEditClick(comida)}>
                                {comida.nombreComida.charAt(0).toUpperCase() + comida.nombreComida.slice(1)}
                            </h2>
                            <p><strong>Precio:</strong> {comida.precio}</p>
                            <p><strong>Calorías:</strong> {comida.calorias || 'N/A'}</p>

                            <div className="local-actions">
                                <button className="edit-button" onClick={() => handleEditClick(comida)}>
                                    Editar
                                </button>
                                <button className="delete-button" onClick={() => handleDeleted(comida)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
