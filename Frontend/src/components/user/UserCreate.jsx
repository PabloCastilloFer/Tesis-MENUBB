import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { createUser } from '../../services/user.service'; // Importa el servicio de creación de usuario
import '../../styles/user/UserCreate.css';

const UserCreate = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa el navegador para redirecciones
  const roles = ['admin', 'encargado', 'user']; // Opciones predefinidas

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.role) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setError(null);

    try {
      // Llama al servicio para crear el usuario
      await createUser(form);
      console.log('Usuario creado exitosamente:', form);
      navigate('/users'); // Redirige a la página de usuarios
    } catch (err) {
      console.error('Error al crear el usuario:', err);
      setError('Hubo un error al crear el usuario. Intenta nuevamente.');
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
            value={form.username}
            onChange={handleChange}
            placeholder="Ingresa el nombre de usuario"
          />
        </label>
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ingresa el correo electrónico"
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Ingresa la contraseña"
          />
        </label>
        <label>
          Rol:
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="" disabled>
              Selecciona un rol
            </option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <div className="buttons-container">
          <button className="save-button" type="submit">
            Crear Usuario
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => navigate('/users')} // Redirige al cancelar
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate;