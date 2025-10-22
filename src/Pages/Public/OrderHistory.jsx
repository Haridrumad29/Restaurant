import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNotification } from '../../Context/NotificationContext';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showNotification } = useNotification();

  useEffect(() => {
    // Simulated API call to fetch orders
    // Replace with actual API call
    setTimeout(() => {
      setOrders([
        {
          id: '1',
          date: '2025-10-22',
          total: 45.99,
          status: 'Delivered',
          items: [
            { name: 'Burger', quantity: 2, price: 15.99 },
            { name: 'Fries', quantity: 1, price: 4.99 }
          ]
        },
        // Add more orders as needed
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-history">
      <h1>Order History</h1>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <h3>Order #{order.id}</h3>
              <span className={`status status-${order.status.toLowerCase()}`}>
                {order.status}
              </span>
            </div>
            <div className="order-details">
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
            </div>
            <div className="order-items">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;