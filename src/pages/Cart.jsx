// src/components/Cart.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Cart.css";
import CartSummary from "../components/CartSummary";

/**
 * Cart component
 * - Uses CartContext to access cart items
 * - Styled like a proper cart page
 */
const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div className="cart-container container my-5">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-white bold">Your cart is empty.</p>
      ) : (
        <CartSummary />
      )}
    </div>
  );
};

export default Cart;
