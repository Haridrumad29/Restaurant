import React from 'react';

function Offers() {
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
          </div>
          <div className="offer-card">
            <h3 className="offer-title">Pizza Party</h3>
            <p className="offer-description">Buy 2 Pizzas, Get 1 FREE</p>
            <p className="offer-terms">On orders above ₹500</p>
          </div>
          <div className="offer-card">
            <h3 className="offer-title">Student Special</h3>
            <p className="offer-description">20% off on all items</p>
            <p className="offer-terms">With valid student ID</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offers;
