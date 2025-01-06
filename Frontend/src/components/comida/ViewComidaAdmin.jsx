import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerComidas } from '../../services/comida.service.js';
import { deleteComida } from '../../services/comida.service.js';
import { showDeleteComida, DeleteQuestion } from '../../helpers/swaHelper.js';
import '../../styles/comida/ComidaViewAll.css';

export default function MisComidas() {
    const navigate = useNavigate();
    const [comidas, setComidas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchComidas();
    }, []);

    const fetchComidas = async () => {
        try {
            const data = await obtenerComidas();
            setComidas(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error al cargar las comidas:', error);
            setComidas([]);
        }
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

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
        comida.nombreComida.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="comida-container">
            <fieldset className="comida-fieldset">
                <legend className="comida-legend">Comidas</legend>
                <h1 className="comida-title">Comidas</h1>
                <div className="comida-header">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="comida-search-input"
                    />
                    <button className="comida-create-button" onClick={handleCreateClick}>
                        Crear Nueva Comida
                    </button>
                </div>
            </fieldset>

            <fieldset className="comida-fieldset">
                <legend className="comida-legend">Lista de Todas las Comidas</legend>
                <div className="comida-grid">
                    {filteredComidas.length === 0 ? (
                        <p className="comida-no-results">No hay comidas disponibles.</p>
                    ) : (
                        filteredComidas.reverse().map((comida, index) => (
                            <div key={index} className="comida-card">
                                <img
                                    src={comida.imagen || 'placeholder.png'}
                                    alt={comida.nombreComida}
                                    className="comida-image"
                                />
                                <h2 className="comida-name">{comida.nombreComida}</h2>
                                <p className="comida-detail"><strong>Nombre del local:</strong> {comida.nombreLocal}</p>
                                <div className="comida-actions">
                                    <button
                                        className="comida-delete-button"
                                        onClick={() => handleDeleted(comida)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </fieldset>
        </div>
    );
}