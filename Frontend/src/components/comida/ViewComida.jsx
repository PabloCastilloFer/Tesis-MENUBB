import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../services/root.service.js';
import '../../styles/comida/ComidaViewAll.css';

export default function VerComidas() {
    const navigate = useNavigate();
    const location = useLocation();
    const { localId } = location.state || {}; // Accede al localId desde el estado

    const [comidas, setComidas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (localId) {
            fetchData();
        }
    }, [localId]); // Vuelve a cargar las comidas si cambia el ID del local

    const fetchData = () => {
        axios.get(`/comida/comidas/${localId}`) // Filtra comidas por el local
            .then((response) => {
                setComidas(Array.isArray(response.data) ? response.data : []);
            })
            .catch(() => setComidas([]));
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const filteredComidas = comidas.filter(comida =>
        comida.nombreComida.toLowerCase().includes(searchQuery.toLowerCase()) &&
        comida.estado === true // Solo mostramos comidas con estado true
    );

    return (
        <div className="comida-container">
            <fieldset className="comida-fieldset">
                <legend className="comida-legend">Gestión de Comidas</legend>
                <h1 className="comida-title">Comidas</h1>
                <div className="comida-header">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="comida-search-input"
                    />
                </div>
            </fieldset>
    
            <fieldset className="comida-fieldset">
                <legend className="comida-legend">Lista de Comidas</legend>
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
                                <p className="comida-detail"><strong>Precio:$</strong> {comida.precio}</p>
                                <p className="comida-detail"><strong>Calorías:</strong> {comida.calorias || 'N/A'}</p>
                            </div>
                        ))
                    )}
                </div>
            </fieldset>
        </div>
    );
}
