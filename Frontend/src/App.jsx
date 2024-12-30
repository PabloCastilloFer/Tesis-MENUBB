import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './routes/generic/Login';
import Home from './routes/generic/Home';
import TopBar from './components/generic/TopBar.jsx';
import NavBar from './components/generic/Navbar.jsx';
import Footer from './components/generic/Footer.jsx';
import './styles/generic/App.css'; // Global styles

import LocalView from './routes/local/LocalViewRoute.jsx';
import LocalViewMy from './routes/local/LocalViewMyRoute.jsx';

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
              </Routes>
            </main>
          </>
        ) : (
          <Routes>
            <Route path="/auth" element={<Login />} />
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