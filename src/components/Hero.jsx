import React from 'react';

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">FlavorBurst Fast Food</h1>
          <p className="hero__subtitle">Where Flavor Meets Speed - Experience the perfect blend of taste and convenience</p>
          <div className="hero__cta">
            <a href="#burgers" className="btn btn--primary">Order Now</a>
            <a href="#about" className="btn btn--secondary">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
