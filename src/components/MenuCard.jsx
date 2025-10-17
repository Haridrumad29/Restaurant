import React from 'react';

function MenuCard({ item, quantity, onAdd, onIncrease, onDecrease }) {
  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
      starsHTML += '⭐';
    }

    if (hasHalfStar) {
      starsHTML += '✨';
    }

    return starsHTML;
  };

  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} className="menu-card__image" />
      <div className="menu-card__content">
        <div className="menu-card__header">
          <div>
            <h3 className="menu-card__title">{item.name}</h3>
            <div className="menu-card__meta">
              <div className="rating">
                <span className="rating__stars">{generateStars(item.rating)}</span>
                <span className="rating__text">{item.rating} ({item.reviews})</span>
              </div>
              <span className="prep-time">⏱ {item.prepTime}</span>
            </div>
          </div>
          <div className="menu-card__price">₹{item.price}</div>
        </div>
        <p className="menu-card__description">{item.description}</p>
        <div className="menu-card__tags">
          {item.tags.map(tag => (
            <span key={tag} className={`tag tag--${tag}`}>{tag}</span>
          ))}
        </div>
        <div className="menu-card__footer">
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={onDecrease}>-</button>
            <span className="quantity-display">{quantity}</span>
            <button className="quantity-btn" onClick={onIncrease}>+</button>
          </div>
          <button className="btn btn--primary btn--sm" onClick={onAdd}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
