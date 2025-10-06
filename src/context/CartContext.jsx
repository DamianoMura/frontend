// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage at start
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    if (!cart.some(item => item.product_id === product.product_id)) {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function removeFromCart(productId) {
    setCart(cart.filter(item => item.product_id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function updateQuantity(productId, quantity) {
    setCart(cart.map(item => item.product_id === productId ? { ...item, quantity } : item));
  }

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
    }}>
      {children}
    </CartContext.Provider>
  );
}
