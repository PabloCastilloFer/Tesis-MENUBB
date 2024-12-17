import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/auth.service';
import { showError } from '../helpers/swaHelper'; // Asumiendo que tienes un helper para notificaciones
import '../assets/styles/Login.css';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      if (response.status === 200) {
        login(response.data.accessToken);
        navigate('/home');
      } else {
        await showError(response.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      await showError('Error inesperado al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="title is-4">Iniciar Sesión</h2>
        <div className="field">
          <label className="label">Correo Electrónico:</label>
          <input
            type="email"
            className="input"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="label">Contraseña:</label>
          <input
            type="password"
            className="input"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="control">
          <button className={`button is-link ${isLoading ? 'is-loading' : ''}`} type="submit">
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
}