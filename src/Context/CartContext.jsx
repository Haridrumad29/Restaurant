import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState({
    subtotal: 0,
    delivery: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing stored cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      setTotal({
        subtotal: 0,
        delivery: 0,
        tax: 0,
        total: 0
      });
      localStorage.removeItem('cart');
      return;
    }

    try {
      // Calculate subtotal
      const subtotal = cart.reduce((sum, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        
        if (isNaN(price) || isNaN(quantity)) {
          console.error('Invalid price or quantity:', { item, price, quantity });
          return sum;
        }
        
        return sum + (price * quantity);
      }, 0);

      // Calculate other values
      const delivery = cart.length > 0 ? 30 : 0;
      const tax = Math.round(subtotal * 0.05);
      const finalTotal = subtotal + delivery + tax;

      // Update totals
      setTotal({
        subtotal: Math.round(subtotal),
        delivery,
        tax,
        total: Math.round(finalTotal)
      });

      // Save cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error calculating cart totals:', error);
      setTotal({
        subtotal: 0,
        delivery: 0,
        tax: 0,
        total: 0
      });
    }
  }, [cart]);

  const addToCart = (id, name, price, image) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === id);
      if (existingItem) {
        return prevCart.map(i => 
          i.id === id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevCart, { 
        id, 
        name, 
        price: Number(price), 
        image, 
        quantity: 1 
      }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => i.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(i =>
          i.id === itemId
            ? { ...i, quantity: i.quantity - 1 }
            : i
        );
      }
      return prevCart.filter(i => i.id !== itemId);
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{
      cart,
      total,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};