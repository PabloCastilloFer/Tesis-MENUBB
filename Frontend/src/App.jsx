import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './routes/generic/Login';
import Home from './routes/generic/Home';
import TopBar from './components/generic/TopBar.jsx';
import NavBar from './components/generic/Navbar.jsx';
import './styles/generic/App.css'; // Global styles
import './styles/generic/Layout.css'; // Layout-specific styles

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated ? (
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