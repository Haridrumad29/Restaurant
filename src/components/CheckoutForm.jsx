import React, { useState } from "react";

function CheckoutForm({ cart, totals, onBack, onSubmit }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "Taste City",
        pincode: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const orderData = {
            items: cart,
            customer: formData,
            totals: totals,
            orderTime: new Date().toISOString(),
        };

        onSubmit(orderData);
    };

    return (
        <div className="checkout-form">
            <h3 style={{ marginBottom: "var(--space-24)" }}>Delivery Details</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="firstName">
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="lastName">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        className="form-input"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="address">
                        Delivery Address
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label" htmlFor="city">
                            City
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="pincode">
                            PIN Code
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="cart-actions" style={{ marginTop: "var(--space-24)" }}>
                    <button type="button" className="btn btn--secondary" onClick={onBack}>
                        Back to Cart
                    </button>
                    <button type="submit" className="btn btn--primary" disabled={loading}>
                        {loading ? (
                            <div className="loading">
                                <div className="spinner"></div>
                                Processing...
                            </div>
                        ) : (
                            "Place Order"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CheckoutForm;
