import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLocalsData, deleteLocal } from '../../services/local.service'; // Servicio para obtener datos
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
        setTimeout(() => {
          setLocals(data); // Guardar los datos en el estado
          setFilteredLocals(data); // Mostrar todos inicialmente
          setLoading(false);
        }, 500); // Simulación de carga
      } catch (err) {
        setTimeout(() => {
          setError('Error al cargar los locales.');
          setLoading(false);
        }, 500);
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

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este local?')) {
      try {
        await deleteLocal(id);
        setLocals((prevLocals) => prevLocals.filter((local) => local.id !== id));
        setFilteredLocals((prevFilteredLocals) => prevFilteredLocals.filter((local) => local.id !== id));
      } catch (error) {
        setError('Error al eliminar el local');
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-message">Cargando locales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="local-grid-page">
      <div className="content-wrapper">
        <fieldset>
          <legend>Gestión de Locales</legend>
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
        </fieldset>

        <fieldset>
          <legend>Lista de Locales</legend>
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
                    onClick={() => handleDelete(local.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default LocalViewAll;