import React from 'react';
import MenuCard from './MenuCard';

function MenuSection({ 
  title, 
  id, 
  items, 
  addToCart, 
  removeFromCart, 
  getCartItemQuantity,
  currentFilter,
  searchTerm 
}) {
  const filterItems = (item) => {
    const matchesFilter = currentFilter === 'all' || item.tags.includes(currentFilter);
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  };

  const filteredItems = items.filter(filterItems);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <section id={id} className="menu-section">
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="menu-grid">
          {filteredItems.map(item => (
            <MenuCard 
              key={item.id}
              item={item}
              quantity={getCartItemQuantity(item.id)}
              onAdd={() => addToCart(item.id, item.name, item.price, item.image)}
              onIncrease={() => addToCart(item.id, item.name, item.price, item.image)}
              onDecrease={() => removeFromCart(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
