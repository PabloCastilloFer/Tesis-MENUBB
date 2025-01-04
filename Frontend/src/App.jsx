import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './routes/generic/Home';
import TopBar from './components/generic/TopBar.jsx';
import NavBar from './components/generic/Navbar.jsx';
import Footer from './components/generic/Footer.jsx';
import './styles/generic/App.css';

import Login from './routes/generic/Login';
import Register from './routes/generic/Register';
import Forgot from './routes/generic/Forgot';

import LocalView from './routes/local/LocalViewRoute.jsx';
import LocalViewMy from './routes/local/LocalViewMyRoute.jsx';
import LocalEditMySchedule from './routes/local/LocalEditScheduleRoute.jsx';
import LocalAllView from './routes/local/LocalViewAllRoute.jsx';
import LocalCreate from './routes/local/LocalCreateRoute.jsx';
import LocalEdit from './routes/local/LocalEditRoute.jsx';

import UserAllView from './routes/user/UserViewAllRoute.jsx';
import UserEdit from './routes/user/UserEditRoute.jsx';
import UserCreate from './routes/user/UserCreateRoute.jsx';
import UpdatePassword from './routes/user/UserEditPasswordRoute.jsx';

import Comidas from './routes/comida/ViewComidaRoutes.jsx';
import Comida from './routes/comida/Comida.jsx';
import UpdateComida from './routes/comida/UpdateComidaRoute.jsx';
import MyComidas from './routes/comida/ViewComidaMyRoutes.jsx';


function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="layout-wrapper">
      <div className="content-wrapper">
        {isAuthenticated ? (
          <>
            <TopBar />
            <NavBar />
            <main className="content">
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/local/:id" element={<LocalView />} />
                <Route path="/local/my-local" element={<LocalViewMy />} />
                <Route path="/local/:id/schedule" element={<LocalEditMySchedule />} />
                <Route path="/local" element={<LocalAllView />} />
                <Route path="/local/create" element={<LocalCreate />} />
                <Route path="/local/:id/edit" element={<LocalEdit />} />
                <Route path="/users" element={<UserAllView />} />
                <Route path="/users/:id/edit" element={<UserEdit />} />
                <Route path="/users/create" element={<UserCreate />} />
                <Route path="/comidas" element={<Comidas />} />
                <Route path="/crear-comida" element={<Comida />} />
                <Route path="/comida/modificar" element={<UpdateComida />} />
                <Route path="/mis-comidas" element={<MyComidas />} />
                <Route path="/users/:id/password" element={<UpdatePassword />} />
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/auth" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<Forgot />} />
          </Routes>
        )}
            <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;