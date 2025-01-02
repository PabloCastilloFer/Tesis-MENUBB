import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/auth.service'; // Servicio para solicitar restablecimiento
import '../../styles/generic/ForgotPassword.css'; // Estilos del formulario

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }); // Llama al servicio para solicitar restablecimiento
      setSuccess('Se ha enviado un enlace de restablecimiento a tu correo.');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al solicitar el restablecimiento.');
      setSuccess(null);
    }
  };

  const handleBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <div className="avatar-forgot">🔒</div>
          <h2 className="forgot-password-title">Restablecer Contraseña</h2>
          {error && <p className="forgot-password-error">{error}</p>}
          {success && <p className="forgot-password-success">{success}</p>}
          <div className="form-group-forgot">
            <input
              type="email"
              name="email"
              className="forgot-password-input"
              value={email}
              onChange={handleChange}
              placeholder="Ingresa tu correo"
              required
            />
          </div>
          <button type="submit" className="forgot-password-button-submit">Enviar</button>
        </form>
        <button className="forgot-password-back-button" onClick={handleBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;