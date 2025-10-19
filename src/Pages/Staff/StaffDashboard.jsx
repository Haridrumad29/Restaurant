import React from 'react';
import { Link } from 'react-router-dom';

function StaffDashboard() {
  const stats = {
    pendingOrders: 5,
    preparingOrders: 3,
    readyOrders: 2,
    servedToday: 45
  };

  return (
    <div className="staff-dashboard">
      <h1>Staff Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card pending">
          <h3>Pending Orders</h3>
          <p className="stat-value">{stats.pendingOrders}</p>
        </div>
        <div className="stat-card preparing">
          <h3>Preparing</h3>
          <p className="stat-value">{stats.preparingOrders}</p>
        </div>
        <div className="stat-card ready">
          <h3>Ready</h3>
          <p className="stat-value">{stats.readyOrders}</p>
        </div>
        <div className="stat-card served">
          <h3>Served Today</h3>
          <p className="stat-value">{stats.servedToday}</p>
        </div>
      </div>

      <div className="quick-actions">
        <Link to="/Staff/orders" className="action-btn">
          <span className="icon">📋</span>
          View Order Queue
        </Link>
      </div>
    </div>
  );
}

export default StaffDashboard;
