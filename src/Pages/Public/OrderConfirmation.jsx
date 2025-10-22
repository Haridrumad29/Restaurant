import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function OrderConfirmation() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="order-confirmation">
      <div className="confirmation-card">
        <h1>Order Confirmed!</h1>
        <div className="success-checkmark">✓</div>
        <p>Thank you for your order, {user?.name || 'Guest'}!</p>
        <p>Your order has been successfully placed.</p>
        <div className="order-actions">
          <button 
            onClick={() => navigate('/')}
            className="primary-button"
          >
            Back to Menu
          </button>
          <button 
            onClick={() => navigate('/order-history')}
            className="secondary-button"
          >
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;