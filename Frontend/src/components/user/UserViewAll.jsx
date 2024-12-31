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
  const [loggedUserId, setLoggedUserId] = useState(''); // Estado para almacenar el ID del usuario logueado
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    // Obtener datos del usuario logueado desde localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setLoggedUserId(user.id); // Guardar la ID del usuario logueado
    }

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError('Error al cargar los usuarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await deleteUser(id, loggedUserId);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setFilteredUsers((prevFilteredUsers) => prevFilteredUsers.filter((user) => user.id !== id));
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
    <div className="user-table-page">
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
                onClick={() => navigate('/users/create')}
              >
                Crear Nuevo Usuario
              </button>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Lista de Usuarios</legend>
          <table className="user-table">
            <thead>
              <tr>
                <th>Nombre de Usuario</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Local</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.roles || 'Sin rol asignado'}</td>
                  <td>{user.local || 'Sin local asignado'}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => navigate(`/users/${user.id}/edit`)}
                    >
                      Editar
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(user.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </fieldset>
      </div>
    </div>
  );
};

export default UserViewAll;