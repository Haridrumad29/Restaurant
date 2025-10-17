import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">FlavorBurst</h3>
            <p className="footer__text">Where Flavor Meets Speed. Experience the perfect blend of taste and convenience.</p>
            <div className="social-links">
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
              <a href="#" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
            </div>
          </div>
          <div className="footer__section">
            <h3 className="footer__title">Quick Links</h3>
            <p className="footer__text">
              <a href="#burgers" style={{ color: 'var(--color-gray-300)', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Menu</a>
              <a href="#offers" style={{ color: 'var(--color-gray-300)', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Offers</a>
              <a href="#about" style={{ color: 'var(--color-gray-300)', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>About Us</a>
              <a href="#contact" style={{ color: 'var(--color-gray-300)', textDecoration: 'none', display: 'block' }}>Contact</a>
            </p>
          </div>
          <div className="footer__section">
            <h3 className="footer__title">Contact Info</h3>
            <p className="footer__text">
              📞 +91 73404 52164<br />
              📧 Jhalaharidrumad@gmail.com<br />
              📍 Jayshree Nagar,teetardi,behind Udaipur Juniors
            </p>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; 2025 FlavorBurst Fast Food. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
