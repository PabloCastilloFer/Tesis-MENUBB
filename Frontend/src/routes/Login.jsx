import LoginForm from '../components/LoginForm.jsx';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();


  return (
    <div>
      <LoginForm />
    </div>
  );
}

export default Login;