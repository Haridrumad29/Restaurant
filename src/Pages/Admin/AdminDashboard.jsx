import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalItems: 0,
    totalCategories: 0,
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
   
    setStats({
      totalItems: 24,
      totalCategories: 4,
      totalOrders: 156,
      revenue: 45670
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Items</h3>
          <p className="stat-value">{stats.totalItems}</p>
        </div>
        <div className="stat-card">
          <h3>Categories</h3>
          <p className="stat-value">{stats.totalCategories}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p className="stat-value">₹{stats.revenue}</p>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/Admin/items" className="action-btn">
            <span className="icon">📦</span>
            Manage Items
          </Link>
          <Link to="/Admin/categories" className="action-btn">
            <span className="icon">📁</span>
            Manage Categories
          </Link>
          <Link to="/Admin/qr-generator" className="action-btn">
            <span className="icon">📱</span>
            Generate QR Codes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
