import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/user.service';
import '../../styles/user/UserViewAll.css';

const UserViewAll = () => {
  const [users, setUsers] = useState([]); // Inicializa como array vacío
  const [filteredUsers, setFilteredUsers] = useState([]); // Inicializa como array vacío
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [loading, setLoading] = useState(true); // Estado para mostrar "Cargando"
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers(); // Llamada al servicio
        setUsers(data); // Guardar los datos en el estado
        setFilteredUsers(data); // Mostrar todos inicialmente
      } catch (err) {
        setError('Error al cargar los usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filtrar usuarios por el término de búsqueda
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users); // Mostrar todos si no hay búsqueda
    } else {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) // Filtro case-insensitive
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setFilteredUsers((prevFilteredUsers) =>
          prevFilteredUsers.filter((user) => user.id !== id)
        );
      } catch (error) {
        setError('Error al eliminar el usuario');
      }
    }
  };

  if (loading) return <div className="loading">Cargando usuarios...</div>;
  if (error) return <div className="error">{error}</div>;

  if (!Array.isArray(filteredUsers)) {
    return <div className="error">Los datos de usuarios no son válidos.</div>;
  }

  return (
    <div className="user-grid-page">
      <div className="content-wrapper">
        <fieldset>
          <legend>Gestión de Usuarios</legend>
          <div className="header-container">
            <h1 className="page-title">Usuarios</h1>
            <div className="search-add-container">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por nombre de usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="create-button"
                onClick={() => navigate('/usuarios/create')}
              >
                Crear Nuevo Usuario
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Lista de Usuarios</legend>
          <div className="user-grid">
            {filteredUsers.map((user) => (
              <div key={user.id} className="user-card">
                <h3
                  className="user-name-card"
                  onClick={() => navigate(`/usuarios/${user.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  {user.username}
                </h3>
                <p>Email: {user.email}</p>
                <p>Rol: {user.roles || 'Sin rol asignado'}</p>
                <p>Local: {user.local || 'Sin local asignado'}</p>
                <div className="user-actions">
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/usuarios/${user.id}/edit`)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(user.id)}
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

export default UserViewAll;