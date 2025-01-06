import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updatePassword } from '../../services/user.service';
import '../../styles/user/UserEditPassword.css'; // Importa el CSS aquí

const EditPasswordUser = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ID del usuario
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación básica del password
    if (!newPassword || newPassword.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
  
    try {
      const payload = { password: newPassword }; // No necesitas incluir la ID en el cuerpo si ya está en la URL

      console.log('ID del usuario:', id);
      console.log('Datos enviados al backend:', payload);
      await updatePassword(id, payload); // Llama al servicio con la ID y el nuevo password
      alert('Contraseña actualizada correctamente.');
      navigate('/home'); // Redirige al inicio o a otra página deseada
    } catch (err) {
      console.error('Error al actualizar la contraseña:', err.response?.data || err);
      setError(err.response?.data?.message || 'Error al actualizar la contraseña.');
    }
  };

  return (
    <div className="update-password-container">
      <h1>Actualizar Contraseña</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nueva Contraseña:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Actualizar Contraseña</button>
      </form>
    </div>
  );
};

export default EditPasswordUser;