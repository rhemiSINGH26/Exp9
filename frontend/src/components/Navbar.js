import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1>📦 Warehouse Management System</h1>
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <nav>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/warehouses">Warehouses</Link>
              <Link to="/suppliers">Suppliers</Link>
            </nav>
            <span style={{ color: '#ecf0f1' }}>Welcome, {user?.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <nav>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
