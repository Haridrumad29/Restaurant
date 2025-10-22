import React, { useState } from "react";
import './CheckoutForm.css';

function CheckoutForm({ cart, total, onBack, onSubmit }) {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        mobile: "",
        paymentMode: "cod"
    });

    const [showUpiQr, setShowUpiQr] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

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
        if (!formData.mobile.trim() || !/^[0-9]{10}$/.test(formData.mobile)) {
            alert('Please enter a valid 10-digit mobile number');
            return;
        }

        const orderData = {
            ...formData,
            items: cart,
            total: total,
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
                        pattern="[0-9]{10}"
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
                        <h3>Scan QR to Pay ₹{total.total}</h3>
                        <div className="qr-code">
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                                alt="UPI QR Code"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                        <p>Please complete the payment before placing the order</p>
                    </div>
                )}

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

                <button type="submit" className="place-order-btn">
                    Place Order
                </button>
            </form>
        </div>
    );
}

export default CheckoutForm;
