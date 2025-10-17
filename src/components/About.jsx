import React from "react";

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">About FlavorBurst</h2>
        <div className="about__content">
          <p className="about__text">
            Experience the perfect blend of taste and convenience at
            FlavorBurst. Our carefully crafted menu features fresh ingredients,
            bold flavors, and quick service that never compromises on quality.
            We're passionate about bringing you delicious food that satisfies
            your cravings and fits your busy lifestyle.
          </p>
          <div className="about__features">
            <div className="feature">
              <div className="feature__icon">⚡</div>
              <h3 className="feature__title">Fast Service</h3>
              <p className="feature__description">
                Quick preparation without compromising quality
              </p>
            </div>
            <div className="feature">
              <div className="feature__icon">🌿</div>
              <h3 className="feature__title">Fresh Ingredients</h3>
              <p className="feature__description">
                Locally sourced, premium quality ingredients
              </p>
            </div>
            <div className="feature">
              <div className="feature__icon">👨‍🍳</div>
              <h3 className="feature__title">Expert Chefs</h3>
              <p className="feature__description">
                Skilled culinary team creating amazing flavors
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
