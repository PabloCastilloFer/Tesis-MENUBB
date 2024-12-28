import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './routes/Login';
import Home from './routes/Home';
import TopBar from './components/TopBar.jsx';
import NavBar from './components/Navbar.jsx';
import './styles/App.css'; // Global styles
import './styles/Layout.css'; // Layout-specific styles

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        /* Diseño con barras para rutas protegidas */
        <div className="layout-wrapper">
          <TopBar />
          <NavBar />
          <main className="content">
            <Routes>
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
        </div>
      ) : (
        /* Diseño sin barras para rutas públicas */
        <Routes>
          <Route path="/auth" element={<Login />} />
        </Routes>
      )}
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