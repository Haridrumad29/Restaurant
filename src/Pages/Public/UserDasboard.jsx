import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [recentOrders, setRecentOrders] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: user?.displayName || 'User',
    email: user?.email || '',
    phone: '',
    preferredAddress: ''
  });

  useEffect(() => {
    // Fetch user data, recent orders, favorites, etc.
    // This would typically come from your backend
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Mock data - replace with actual API calls
    setRecentOrders([
      { id: 1, date: '2025-10-21', total: 45.99, status: 'Delivered' },
      { id: 2, date: '2025-10-19', total: 32.50, status: 'Delivered' },
      { id: 3, date: '2025-10-15', total: 28.75, status: 'Delivered' }
    ]);

    setFavoriteItems([
      { id: 1, name: 'Classic Burger', price: 12.99 },
      { id: 2, name: 'Pepperoni Pizza', price: 15.99 },
      { id: 3, name: 'Caesar Salad', price: 8.99 }
    ]);

    setAddresses([
      { id: 1, label: 'Home', address: '123 Main St, City, State 12345' },
      { id: 2, label: 'Work', address: '456 Office Ave, City, State 12345' }
    ]);
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Update profile logic
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p className="stat-number">24</p>
              </div>
              <div className="stat-card">
                <h3>Total Spent</h3>
                <p className="stat-number">$342.50</p>
              </div>
              <div className="stat-card">
                <h3>Reward Points</h3>
                <p className="stat-number">450</p>
              </div>
              <div className="stat-card">
                <h3>Favorite Items</h3>
                <p className="stat-number">{favoriteItems.length}</p>
              </div>
            </div>
            
            <div className="recent-activity">
              <h3>Recent Orders</h3>
              <div className="orders-list">
                {recentOrders.map(order => (
                  <div key={order.id} className="order-item">
                    <div className="order-info">
                      <span className="order-date">{order.date}</span>
                      <span className="order-amount">${order.total}</span>
                    </div>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="profile-section">
            <form onSubmit={handleProfileUpdate}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  value={userProfile.phone}
                  onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                />
              </div>
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        );

      case 'favorites':
        return (
          <div className="favorites-section">
            <div className="favorites-grid">
              {favoriteItems.map(item => (
                <div key={item.id} className="favorite-item">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <button className="order-again-btn">Order Again</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="addresses-section">
            <div className="addresses-list">
              {addresses.map(address => (
                <div key={address.id} className="address-card">
                  <h4>{address.label}</h4>
                  <p>{address.address}</p>
                  <div className="address-actions">
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <button className="add-address-btn">+ Add New Address</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {userProfile.name}!</h1>
        <p>Manage your orders and account settings</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-nav">
          <button
            className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={`nav-btn ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            Favorites
          </button>
          <button
            className={`nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
            onClick={() => setActiveTab('addresses')}
          >
            Addresses
          </button>
        </div>

        <div className="dashboard-main">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
