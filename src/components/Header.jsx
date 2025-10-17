import React, { useState, useEffect } from 'react';

function Header({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <div className="container">
        <div className="header__content">
          <a href="#" className="logo">
            <div className="logo__icon">🍔</div>
            <span>FlavorBurst</span>
          </a>
          <nav className="nav">
            <ul className="nav__links">
              <li><a href="#hero" className="nav__link">Home</a></li>
              <li><a href="#burgers" className="nav__link">Burgers</a></li>
              <li><a href="#pizzas" className="nav__link">Pizzas</a></li>
              <li><a href="#wraps" className="nav__link">Wraps</a></li>
              <li><a href="#drinks" className="nav__link">Drinks</a></li>
              <li><a href="#about" className="nav__link">About</a></li>
              <li><a href="#contact" className="nav__link">Contact</a></li>
            </ul>
            <button className="cart-button" onClick={onCartClick}>
              <span className="cart-count">{cartCount}</span> 🛒 Cart
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
