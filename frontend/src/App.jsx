// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/login';
import Register from './pages/Register';
import AdminDashBoard from './pages/AdminDashBoard';
import Home from './pages/Home'
import Logout from './pages/Logout';
// Tách phần Routes thành một component để có thể dùng hook
const AppRoutes = () => {
  const location = useLocation();


  return (
    <>
      <Routes>

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashBoard />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
