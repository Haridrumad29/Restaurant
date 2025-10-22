import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍔 FlavorBurst {user?.role === 'admin' ? 'Admin' : 'Staff'}
        </Link>
        <div className="navbar-links">
          {user && (
            <>
              <span className="user-info">Welcome, {user.name}</span>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/dashboard">Dashboard</Link>
                  <Link to="/admin/categories">Categories</Link>
                  <Link to="/admin/items">Items</Link>
                  <Link to="/admin/qr-generator">QR Codes</Link>
                </>
              )}
              {user.role === 'staff' && (
                <>
                  <Link to="/staff/dashboard">Dashboard</Link>
                  <Link to="/staff/orders">Orders</Link>
                </>
              )}
              {user.role === 'user' && (
                <>
                  <Link to="/dashboard">My Dashboard</Link>
                  <Link to="/order-history">Order History</Link>
                </>
              )}
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
