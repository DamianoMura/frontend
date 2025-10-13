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
    const {product_id, name, description,specs,price,stock_quantity, brand}=product;
    
    if (!cart.some(item => item.product_id === product.product_id)) {
      setCart([...cart, { product_id,
                          name,
                          brand,
                          description,
                          specs,
                          price : product.discount_percent ? price-((price/100)* product.discount_percent) : price,
                          stock_quantity,
                          quantity: 1 
                        }]);
      
    }
   
  }

  function removeFromCart(productId) {
   
    setCart(cart.filter(item => item.product_id !== productId));
    
  }

  function clearCart() {
    setCart([]);
  }

  function updateQuantity(productId, operator) {
    
    const cartProduct= cart.find(item=>item.product_id===productId)
    let quantity=cartProduct.quantity;
    const stock=cartProduct
    switch (operator){
      case "add" :
       (quantity < cartProduct.stock_quantity) && quantity++ ;
      break
      case "rem":
        (quantity>1) && quantity --;
      break
    }
    setCart(cart.map(item => item.product_id === productId ? { ...item, quantity } : item));
    
  }

  // Calcola il totale in modo robusto (no NaN)
  const total = cart.reduce((sum, item) => {
    const price = Number(item.price);
    const qty = Number(item.quantity || 1);
    // Somma solo se il prezzo è un numero valido
    return sum + (!isNaN(price) && !isNaN(qty) ? price * qty : 0);
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      total,
    }}>
      {children}
    </CartContext.Provider>
  );
}
