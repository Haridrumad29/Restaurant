import React from 'react';
import { useCart } from '../hooks/useCart';
import './Offers.css';
import { useNotification } from '../hooks/useNotification';
import { specialOffers } from '../data/offersData';

function Offers() {
  const { addToCart, cart } = useCart();
  const { showNotification } = useNotification();

  const handleComboDeal = () => {
    // Add all combo items to cart
    specialOffers.comboDeal.items.forEach(item => {
      addToCart(item);
    });
    showNotification('Combo Deal added to cart!', 'success');
  };

  const handlePizzaParty = () => {
    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal >= specialOffers.pizzaParty.minimumOrder) {
      // Logic for buy 2 get 1 free will be handled in cart total calculation
      showNotification('Pizza Party offer applied! Add 3 pizzas to cart to get one free!', 'success');
    } else {
      showNotification(`Add items worth ₹${specialOffers.pizzaParty.minimumOrder - cartTotal} more to avail this offer`, 'info');
    }
  };

  const handleStudentSpecial = () => {
    // In a real app, you'd verify student ID here
    showNotification('Please show your student ID at checkout to avail 20% discount', 'info');
  };
  return (
    <section className="offers" id="offers">
      <div className="container">
        <h2 className="section-title">Special Offers</h2>
        <div className="offers-grid">
          <div className="offer-card">
            <h3 className="offer-title">Combo Deal</h3>
            <p className="offer-description">Any Burger + Drink + Fries</p>
            <div className="offer-price">
              <span className="offer-price__current">₹180</span>
              <span className="offer-price__original">₹220</span>
              <span className="offer-savings">Save ₹40</span>
            </div>
            <button className="btn btn--primary" onClick={handleComboDeal}>
              Add Combo to Cart
            </button>
          </div>
          <div className="offer-card">
            <h3 className="offer-title">Pizza Party</h3>
            <p className="offer-description">Buy 2 Pizzas, Get 1 FREE</p>
            <p className="offer-terms">On orders above ₹500</p>
            <button className="btn btn--primary" onClick={handlePizzaParty}>
              Apply Offer
            </button>
          </div>
          <div className="offer-card">
            <h3 className="offer-title">Student Special</h3>
            <p className="offer-description">20% off on all items</p>
            <p className="offer-terms">With valid student ID</p>
            <button className="btn btn--primary" onClick={handleStudentSpecial}>
              Apply Student Discount
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offers;
