import React, { useState } from 'react';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import SearchFilter from '../../components/SearchFilter';
import MenuSection from '../../components/MenuSection';
import Offers from '../../components/Offers';
import About from '../../components/About';
import Contact from '../../components/Contact';
import Footer from '../../components/Footer';
import CartModal from '../../components/CartModal';
import Toast from '../../components/Toast';
import { menuData } from '../../data/menuData';
import '../../App.css';
import { useCart } from '../../hooks/useCart';
import { useNotification } from '../../hooks/useNotification';

function UserHome() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const { cart, addToCart, removeFromCart: removeItem, updateQuantity, clearCart: clearCartContext, total } = useCart();
  const { showNotification } = useNotification();

  const removeFromCart = (id) => {
    removeItem(parseInt(id));
    const item = cart.find(item => item.id === parseInt(id));
    if (item) {
      displayToast(`${item.name} removed from cart`);
    }
  };

  const increaseQuantity = (id) => {
    const item = cart.find(item => item.id === parseInt(id));
    if (item) {
      updateQuantity(parseInt(id), item.quantity + 1);
    }
  };

  const deleteFromCart = (id) => {
    const item = cart.find(item => item.id === parseInt(id));
    if (item) {
      removeItem(parseInt(id));
      displayToast(`${item.name} removed from cart`);
    }
  };

  const clearCart = () => {
    clearCartContext();
    displayToast('Cart cleared!');
  };

  const displayToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const getCartItemQuantity = (id) => {
    const item = cart.find(item => item.id === parseInt(id));
    return item ? item.quantity : 0;
  };

  const calculateTotals = () => {
    return total;
  };

  return (
    <div className="App">
      <Header 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCartModal(true)}
      />
      
      <Hero />
      
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />

      <MenuSection
        title="Burgers"
        id="burgers"
        items={menuData.burgers}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getCartItemQuantity={getCartItemQuantity}
        currentFilter={currentFilter}
        searchTerm={searchTerm}
      />

      <MenuSection
        title="Pizzas"
        id="pizzas"
        items={menuData.pizzas}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getCartItemQuantity={getCartItemQuantity}
        currentFilter={currentFilter}
        searchTerm={searchTerm}
      />

      <MenuSection
        title="Wraps"
        id="wraps"
        items={menuData.wraps}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getCartItemQuantity={getCartItemQuantity}
        currentFilter={currentFilter}
        searchTerm={searchTerm}
      />

      <MenuSection
        title="Drinks"
        id="drinks"
        items={menuData.drinks}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        getCartItemQuantity={getCartItemQuantity}
        currentFilter={currentFilter}
        searchTerm={searchTerm}
      />

      <Offers />
      <About />
      <Contact />
      <Footer />

      {showCartModal && (
        <CartModal
          cart={cart}
          onClose={() => setShowCartModal(false)}
          increaseQuantity={increaseQuantity}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          clearCart={clearCart}
          calculateTotals={calculateTotals}
          displayToast={displayToast}
        />
      )}

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}

export default UserHome;
