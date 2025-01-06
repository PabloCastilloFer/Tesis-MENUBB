import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/user.service';
import '../../styles/user/UserViewAll.css';

const UserViewAll = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setLoggedUserId(user.id);
    }

    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setTimeout(() => {
          setUsers(data);
          setFilteredUsers(data);
          setLoading(false);
        }, 500);
      } catch (err) {
        setTimeout(() => {
          setError('Error al cargar los usuarios.');
          setLoading(false);
        }, 500);
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

  const closeModal = () => {
    setError(null); // Cierra el modal al hacer clic en "OK"
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-message">Cargando usuarios...</p>
      </div>
    );
  }

  return (
    <div className="user-table-page">
      {error && (
        <div className="modal-overlay">
          <div className="modal">
            <p className="modal-message">{error}</p>
            <button className="modal-button" onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}
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