import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth.service'; // Servicio para registrar usuarios
import '../../styles/generic/Register.css'; // Estilos del registro

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form); // Llama al servicio para registrar al usuario
      alert('Usuario registrado correctamente.');
      navigate('/auth'); // Redirige al login después del registro
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar el usuario.');
    }
  };

  const handleBack = () => {
    navigate(-1); // Vuelve a la página anterior
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="avatar-register">👤</div>
          <h2 className="register-title">Registrar Usuario</h2>
          {error && <p className="register-error">{error}</p>}
          <div className="form-group-register">
            <input
              type="text"
              name="username"
              className="register-input"
              value={form.username}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>
          <div className="form-group-register">
            <input
              type="email"
              name="email"
              className="register-input"
              value={form.email}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <button type="submit" className="register-button-submit">Registrar</button>
        </form>
        <button className="register-back-button" onClick={handleBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;