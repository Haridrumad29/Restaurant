import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchFilter from './components/SearchFilter';
import MenuSection from './components/MenuSection';
import Offers from './components/Offers';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import Toast from './components/Toast';
import { menuData } from './data/menuData';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCartModal, setShowCartModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const addToCart = (id, name, price, image) => {
    const existingItem = cart.find(item => item.id === parseInt(id));
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === parseInt(id)
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: parseInt(id),
        name,
        price: parseInt(price),
        image,
        quantity: 1
      }]);
    }
    displayToast(`${name} added to cart!`);
  };

  const removeFromCart = (id) => {
    const item = cart.find(item => item.id === parseInt(id));
    if (item) {
      if (item.quantity > 1) {
        setCart(cart.map(item =>
          item.id === parseInt(id)
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ));
      } else {
        setCart(cart.filter(item => item.id !== parseInt(id)));
      }
    }
  };

  const increaseQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === parseInt(id)
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const deleteFromCart = (id) => {
    const item = cart.find(item => item.id === parseInt(id));
    if (item) {
      setCart(cart.filter(item => item.id !== parseInt(id)));
      displayToast(`${item.name} removed from cart`);
    }
  };

  const clearCart = () => {
    setCart([]);
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
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal > 0 ? 30 : 0;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + delivery + tax;
    return { subtotal, delivery, tax, total };
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
      <main>
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
          title="Cold Drinks"
          id="drinks"
          items={menuData.drinks}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          getCartItemQuantity={getCartItemQuantity}
          currentFilter={currentFilter}
          searchTerm={searchTerm}
        />
        <MenuSection
          title="Smoothies"
          id="smoothies"
          items={menuData.smoothies}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          getCartItemQuantity={getCartItemQuantity}
          currentFilter={currentFilter}
          searchTerm={searchTerm}
        />
        <MenuSection
          title="Hot & Cold Beverages"
          id="beverages"
          items={menuData.beverages}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          getCartItemQuantity={getCartItemQuantity}
          currentFilter={currentFilter}
          searchTerm={searchTerm}
        />
        <Offers />
        <About />
        <Contact />
      </main>
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

export default App;
