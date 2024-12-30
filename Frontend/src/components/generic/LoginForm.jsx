import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import '../../styles/generic/Login.css';

function LoginForm() {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth(); // Para actualizar el estado global
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data); // Llama al servicio de login
      setAuthenticated(true); // Actualiza el estado de autenticación
      window.location.href = '/home'; // Recarga la página
    } catch (error) {
      console.error('Error en el login:', error.message);
      alert('Error en el login: ' + error.message);
    }
  };

  return (
<div className="login-container">
  <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
    <div className="avatar">👤</div>
    <h2>Inicio de Sesión</h2>
    <div className="form-group">
      <input
        type="email"
        id="email"
        placeholder="Correo institucional"
        {...register('email', { required: 'Este campo es obligatorio' })}
      />
      {errors.email && <span className="error">{errors.email.message}</span>}
    </div>
    <div className="form-group">
      <input
        type="password"
        id="password"
        placeholder="Contraseña"
        {...register('password', { required: 'Este campo es obligatorio' })}
      />
      {errors.password && <span className="error">{errors.password.message}</span>}
    </div>
    <button type="submit">Iniciar sesión</button>
    <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
  </form>
</div>
  );
}

export default LoginForm;