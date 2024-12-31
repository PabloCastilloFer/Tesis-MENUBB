import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './routes/generic/Login';
import Home from './routes/generic/Home';
import TopBar from './components/generic/TopBar.jsx';
import NavBar from './components/generic/Navbar.jsx';
import Footer from './components/generic/Footer.jsx';
import './styles/generic/App.css';

import LocalView from './routes/local/LocalViewRoute.jsx';
import LocalViewMy from './routes/local/LocalViewMyRoute.jsx';
import LocalEditMySchedule from './routes/local/LocalEditScheduleRoute.jsx';
import LocalAllView from './routes/local/LocalViewAllRoute.jsx';
import LocalCreate from './routes/local/LocalCreateRoute.jsx';
import LocalEdit from './routes/local/LocalEditRoute.jsx';

import UserAllView from './routes/user/UserViewAllRoute.jsx';
import UserEdit from './routes/user/UserEditRoute.jsx';
import UserCreate from './routes/user/UserCreateRoute.jsx';

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