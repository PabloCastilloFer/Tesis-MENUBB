import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Comida from './routes/Comida.jsx';
import Comidas from './routes/ViewComidaRoutes.jsx';
import UpdateComida from './routes/UpdateComidaRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/home',
        element: <App />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/comida',
    element: <Comida/>,
  },
  {
    path: '/verComidas',
    element: <Comidas/>,
  },
  {
    path: '/comida/modificar',
    element: <UpdateComida/>,
  },
  

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);