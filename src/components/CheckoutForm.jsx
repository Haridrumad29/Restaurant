import React, { useState } from "react";
import './CheckoutForm.css';

function CheckoutForm({ cart, total, onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    mobile: "",
    paymentMode: "cod",
  });

  const [showUpiQr, setShowUpiQr] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'mobile') {
     
      const cleanValue = value.replace(/[^0-9]/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (name === 'paymentMode') {
      setShowUpiQr(value === 'upi');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!formData.address.trim()) {
      alert('Please enter your address');
      return;
    }
    // Clean and validate mobile number
    const cleanMobile = formData.mobile.trim().replace(/[^0-9]/g, '');
    if (cleanMobile.length !== 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    const orderData = {
      ...formData,
      mobile: cleanMobile, // Use cleaned mobile number
      items: cart,
      total: typeof total === 'object' ? total.total : total,
      orderTime: new Date().toISOString(),
    };

    onSubmit(orderData);
  };

  return (
    <div className="checkout-form">
      <div className="checkout-header">
        <button className="back-button" onClick={onBack}>← Back to Cart</button>
        <h2>Checkout</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Delivery Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your complete address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile Number</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your 10-digit mobile number"
            pattern="\d{10}"
            required
          />
        </div>

        <div className="form-group">
          <label>Payment Mode</label>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMode"
                value="cod"
                checked={formData.paymentMode === 'cod'}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMode"
                value="upi"
                checked={formData.paymentMode === 'upi'}
                onChange={handleChange}
              />
              UPI Payment
            </label>
          </div>
        </div>

        {showUpiQr && (
          <div className="upi-section">
            <h3>Scan QR to Pay ₹{typeof total === 'object' ? total.total : total}</h3>
            <div className="qr-code">
              {/* TODO: Replace with your actual UPI QR code image */}
              <img
                src="/images/upi-qr.png"
                alt="UPI QR Code"
                style={{ width: '200px', height: '200px' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23666">QR Code</text></svg>';
                }}
              />
            </div>
            <p>Please complete the payment before placing the order</p>
            <p className="upi-id">UPI ID: your.upi.id@bank</p>
          </div>
        )}

        {typeof total === 'object' && (
          <div className="order-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{total.subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery:</span>
              <span>₹{total.delivery}</span>
            </div>
            <div className="summary-row">
              <span>Tax (5%):</span>
              <span>₹{total.tax}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total.total}</span>
            </div>
          </div>
        )}

        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutForm;
