import React, { useState } from 'react';
import CheckoutForm from './CheckoutForm';

function CartModal({ 
  cart, 
  onClose, 
  increaseQuantity, 
  removeFromCart, 
  deleteFromCart,
  clearCart,
  calculateTotals,
  displayToast
}) {
  const [showCheckout, setShowCheckout] = useState(false);
  const totals = calculateTotals();

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  const handleOrderSubmit = (orderData) => {
    // Simulate order processing
    setTimeout(() => {
      onClose();
      setShowCheckout(false);
      displayToast("Order placed successfully! We'll deliver in 30-45 minutes.");
      clearCart();
    }, 2000);
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
                      <img src={item.image} alt={item.name} className="cart-item__image" />
                      <div className="cart-item__details">
                        <div className="cart-item__name">{item.name}</div>
                        <div className="cart-item__price">₹{item.price} each</div>
                      </div>
                      <div className="cart-item__controls">
                        <div className="quantity-controls">
                          <button className="quantity-btn" onClick={() => removeFromCart(item.id)}>-</button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button className="quantity-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                        </div>
                        <button 
                          className="remove-item" 
                          onClick={() => deleteFromCart(item.id)}
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
                    <span>₹{totals.subtotal}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Delivery:</span>
                    <span>₹{totals.delivery}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Tax (5%):</span>
                    <span>₹{totals.tax}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Total:</span>
                    <span>₹{totals.total}</span>
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
            totals={totals}
            onBack={handleBackToCart}
            onSubmit={handleOrderSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default CartModal;
