import { useState, useEffect } from 'react';
import Navbar from '../components/navbar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from '../services/root.service.js';
import { deleteComida } from '../services/comida.service.js';
import { showDeleteComida, DeleteQuestion } from '../helpers/swaHelper.js';
import '../styles/ViewComida.css'; // Importa el CSS

export default function VerComidas() {
    const navigate = useNavigate();
    const [comidas, setComidas] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('/comida')
            .then((response) => {
                setComidas(Array.isArray(response.data) ? response.data : []);
            })
            .catch(() => setComidas([]));
    };

    const handleSearchChange = (e) => setSearchQuery(e.target.value);

    const handleEditClick = (comida) => navigate(`/comida/modificar`, { state: { comida } });

    const handleCreateClick = () => navigate('/comida');

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
        <div className="container">
            <Navbar />
            <button
                style={{
                    alignSelf: 'flex-end',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={handleCreateClick}
            >
                Crear comida
            </button>

            <h1 className="title is-2">Lista de Comidas</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar por nombre de comida..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="grid-container">
                {filteredComidas.length === 0 ? (
                    <p>No hay comidas existentes con ese nombre.</p>
                ) : (
                    filteredComidas.reverse().map((comida, index) => (
                        <div key={index} className="card">
                            <img src={comida.imagen || 'placeholder.png'} alt={comida.nombreComida} />
                            <h2 className="card-title">
                                {comida.nombreComida.charAt(0).toUpperCase() + comida.nombreComida.slice(1)}
                            </h2>
                            <p><strong>Precio:</strong> {comida.precio}</p>
                            <p><strong>Calorías:</strong> {comida.calorias || 'N/A'}</p>

                            <div className="button-container">
                                <button
                                    className="button button-primary"
                                    onClick={() => handleEditClick(comida)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="button button-danger"
                                    onClick={() => handleDeleted(comida)}
                                >
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
