import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/user.service';
import { getAllLocalsData } from '../../services/local.service';
import '../../styles/user/UserCreate.css';

const UserCreate = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: '',
    local: '',
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [locals, setLocals] = useState([]);
  const navigate = useNavigate();
  const rol = ['admin', 'encargado', 'user'];

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const localList = await getAllLocalsData();
        setLocals(localList);
      } catch (err) {
        console.error('Error al cargar los locales:', err);
        setLocals([]);
      }
    };

    fetchLocals();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
  
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('roles', formData.roles);
      
      if (formData.roles === 'encargado') {
        data.append('local', formData.local);
      }
  
      await createUser(data);
      navigate('/users');
    } catch (err) {
      console.error('Error al crear el usuario:', err);
      setError('Hubo un error al crear el usuario. Intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-user-container">
      <h1>Crear Usuario</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de Usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Ingresa el nombre de usuario"
            required
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ingresa el correo electrónico"
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Ingresa la contraseña"
            required
          />
        </label>
        <label>
          Rol:
          <select name="roles" value={formData.roles} onChange={handleChange} required>
  <option value="" disabled>
    Selecciona un rol
  </option>
  {rol.map((roles) => (
    <option key={roles} value={roles}>
      {roles.charAt(0).toUpperCase() + roles.slice(1)}
    </option>
  ))}
</select>
        </label>
        {formData.roles === 'encargado' && (
          <label>
            Local:
            <select name="local" value={formData.local} onChange={handleChange} required>
              <option value="" disabled>
                Selecciona un local
              </option>
              {locals.map((local) => (
                <option key={local.id} value={local.id}>
                  {local.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="buttons-container">
          <button className="save-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Creando...' : 'Crear Usuario'}
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => navigate('/users')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;