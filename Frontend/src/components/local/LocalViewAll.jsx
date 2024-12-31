import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLocalsData } from '../../services/local.service'; // Servicio para obtener datos
import '../../styles/local/LocalViewAll.css'; // CSS para la página

const LocalViewAll = () => {
  const [locals, setLocals] = useState([]); // Todos los locales
  const [filteredLocals, setFilteredLocals] = useState([]); // Locales filtrados
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [loading, setLoading] = useState(true); // Estado para mostrar el cargando
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const data = await getAllLocalsData(); // Llamada al servicio
        setLocals(data); // Guardar los datos en el estado
        setFilteredLocals(data); // Mostrar todos inicialmente
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los locales.');
        setLoading(false);
      }
    };

    fetchLocals();
  }, []);

  // Filtrar locales por el término de búsqueda
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredLocals(locals); // Mostrar todos si no hay búsqueda
    } else {
      const filtered = locals.filter((local) =>
        local.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtro case-insensitive
      );
      setFilteredLocals(filtered);
    }
  }, [searchTerm, locals]);

  if (loading) return <div className="loading">Cargando locales...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="local-grid-page">
        <div className="content-wrapper">
            <div className="header-container">
                <h1 className="page-title">Locales</h1>
                <div className="search-add-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Buscar por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        className="create-button"
                        onClick={() => navigate('/local/create')}
                    >
                        Crear Nuevo Local
                    </button>
                </div>
            </div>

            <div className="local-grid">
                {filteredLocals.map((local) => (
                    <div key={local.id} className="local-card">
                        <img
                            src={local.image}
                            alt={local.name}
                            className="local-image-card"
                            onClick={() => navigate(`/local/${local.id}`)}
                            style={{ cursor: 'pointer' }}
                        />
                        <h3
                            className="local-name-card"
                            onClick={() => navigate(`/local/${local.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {local.name}
                        </h3>
                        <div className="local-actions">
                            <button
                                className="edit-button"
                                onClick={() => navigate(`/local/${local.id}/edit`)}
                            >
                                Editar
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => console.log(`Eliminar local con ID: ${local.id}`)}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default LocalViewAll;