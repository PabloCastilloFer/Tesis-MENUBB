import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './routes/Login';
import Home from './routes/Home';
import TopBar from './components/TopBar.jsx';
import NavBar from './components/Navbar.jsx';

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <TopBar />} {/* Mostrar TopBar solo si está autenticado */}
      {isAuthenticated && <NavBar />} {/* Mostrar NavBar solo si está autenticado */}
      <Routes>
        <Route path="/auth" element={<Login />} /> {/* Ruta pública */}
        <Route path="/home" element={<Home />} /> {/* Ruta protegida */}
      </Routes>
    </>
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