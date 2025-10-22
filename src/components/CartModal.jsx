import React, { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useNotification } from '../hooks/useNotification';
import CheckoutForm from './CheckoutForm';
import './CartModal.css';

function CartModal({ onClose }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const { cart, removeFromCart, updateQuantity: increaseQuantity, clearCart, total } = useCart();
  const { showNotification } = useNotification();

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  const handleOrderSubmit = (orderData) => {
    const message = orderData.paymentMode === 'cod' 
      ? "Order placed successfully! We'll deliver to your address in 30-45 minutes." 
      : "Payment received! Order placed successfully. We'll deliver to your address in 30-45 minutes.";

    onClose();
    setShowCheckout(false);
    showNotification(message, 'success');
    clearCart();
  };

  return (
    <div className="cart-modal show" onClick={onClose}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <button className="close-cart" onClick={onClose}>&times;</button>
        </div>
        
        {!showCheckout ? (
          <>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart__icon">🛒</div>
                <p>Your cart is empty</p>
                <p>Add some delicious items to get started!</p>
              </div>
            ) : (
              <>
                <ul className="cart-items">
                  {cart.map(item => (
                    <li key={item.id} className="cart-item">
                      <div className="cart-item__image-container">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="cart-item__image"
                          onError={(e) => {
                            e.target.src = '/default-food-image.png'; // Fallback image
                          }}
                        />
                      </div>
                      <div className="cart-item__details">
                        <div className="cart-item__name">{item.name}</div>
                        <div className="cart-item__price">₹{item.price} each</div>
                      </div>
                      <div className="cart-item__controls">
                        <div className="quantity-controls">
                          <button className="quantity-btn" onClick={() => removeFromCart(item.id)}>-</button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button className="quantity-btn" onClick={() => increaseQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button 
                          className="remove-item" 
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          &times;
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="cart-summary">
                  <div className="cart-summary__row">
                    <span>Subtotal:</span>
                    <span>₹{total.subtotal}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Delivery:</span>
                    <span>₹{total.delivery}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Tax (5%):</span>
                    <span>₹{total.tax}</span>
                  </div>
                  <div className="cart-summary__row total">
                    <span>Total:</span>
                    <span>₹{total.total}</span>
                  </div>
                </div>
                
                <div className="cart-actions">
                  <button className="btn btn--secondary" onClick={clearCart}>Clear Cart</button>
                  <button className="btn btn--primary" onClick={handleCheckout}>Checkout</button>
                </div>
              </>
            )}
          </>
        ) : (
          <CheckoutForm 
            cart={cart}
            total={total}
            onBack={handleBackToCart}
            onSubmit={handleOrderSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default CartModal;
