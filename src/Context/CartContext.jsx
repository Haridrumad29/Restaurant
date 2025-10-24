import React, { createContext, useContext, useState, useEffect } from 'react';


const defaultCartContext = {
  cart: [],
  total: { subtotal: 0, delivery: 0, tax: 0, total: 0 },
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {}
};


const isValidCartItem = (item) => {
  return (
    item &&
    typeof item === 'object' &&
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    typeof item.name === 'string' &&
    !isNaN(Number(item.price)) &&
    !isNaN(Number(item.quantity)) &&
    item.quantity > 0
  );
};

export const CartContext = createContext(defaultCartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(defaultCartContext.cart);
  const [total, setTotal] = useState({
    subtotal: 0,
    delivery: 0,
    tax: 0,
    total: 0
  });

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (!storedCart) return;

      const parsedCart = JSON.parse(storedCart);
      if (!Array.isArray(parsedCart)) {
        console.error('Stored cart is not an array');
        localStorage.removeItem('cart');
        return;
      }

      
      const validCart = parsedCart.filter(item => {
        const isValid = isValidCartItem(item);
        if (!isValid) {
          console.error('Invalid cart item:', item);
        }
        return isValid;
      });

      setCart(validCart);
    } catch (error) {
      console.error('Error loading stored cart:', error);
      localStorage.removeItem('cart');
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
      
      const subtotal = cart.reduce((sum, item) => {
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        
        if (isNaN(price) || isNaN(quantity)) {
          console.error('Invalid price or quantity:', { item, price, quantity });
          return sum;
        }
        
        return sum + (price * quantity);
      }, 0);

     
      const delivery = cart.length > 0 ? 30 : 0;
      const tax = Math.round(subtotal * 0.05);
      const finalTotal = subtotal + delivery + tax;

     
      setTotal({
        subtotal: Math.round(subtotal),
        delivery,
        tax,
        total: Math.round(finalTotal)
      });

      
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

  const validateItem = (id, name, price) => {
    if (!id || typeof id !== 'string' && typeof id !== 'number') {
      console.error('Invalid item ID:', id);
      return false;
    }
    if (!name || typeof name !== 'string') {
      console.error('Invalid item name:', name);
      return false;
    }
    if (!price || isNaN(Number(price))) {
      console.error('Invalid item price:', price);
      return false;
    }
    return true;
  };

  const addToCart = (id, name, price, image) => {
    if (!validateItem(id, name, price)) {
      return;
    }

    setCart(prevCart => {
      try {
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
          image: image || '', 
          quantity: 1 
        }];
      } catch (error) {
        console.error('Error adding item to cart:', error);
        return prevCart;
      }
    });
  };

  const removeFromCart = (itemId) => {
    if (!itemId || (typeof itemId !== 'string' && typeof itemId !== 'number')) {
      console.error('Invalid item ID:', itemId);
      return;
    }

    setCart(prevCart => {
      try {
        const existingItem = prevCart.find(i => i.id === itemId);
        if (existingItem && existingItem.quantity > 1) {
          return prevCart.map(i =>
            i.id === itemId
              ? { ...i, quantity: i.quantity - 1 }
              : i
          );
        }
        return prevCart.filter(i => i.id !== itemId);
      } catch (error) {
        console.error('Error removing item from cart:', error);
        return prevCart;
      }
    });
  };

  const updateQuantity = (itemId, quantity) => {
    if (!itemId || (typeof itemId !== 'string' && typeof itemId !== 'number')) {
      console.error('Invalid item ID:', itemId);
      return;
    }

    const newQuantity = Number(quantity);
    if (isNaN(newQuantity) || newQuantity < 0) {
      console.error('Invalid quantity:', quantity);
      return;
    }

    if (newQuantity === 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => {
      try {
        const existingItem = prevCart.find(item => item.id === itemId);
        if (!existingItem) {
          console.error('Item not found in cart:', itemId);
          return prevCart;
        }

        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        );
      } catch (error) {
        console.error('Error updating quantity:', error);
        return prevCart;
      }
    });
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