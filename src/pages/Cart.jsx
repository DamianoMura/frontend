// src/components/Cart.jsx
import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';

/**
 * Cart component
 * - Uses CartContext to access cart items
 * - Styled like a proper cart page
 */
const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

  return (
    <div className="cart-container container my-5">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table cart-table mb-4">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item.product_id} className="align-middle">
                  <td>{item.name}</td>
                  <td>
                    <input
                      type="number"
                      className="cart-qty-input"
                      min="1"
                      value={item.quantity || 1}
                      readOnly
                    />
                  </td>
                  <td>{Number(item.price).toFixed(2)} €</td>
                  <td>{(Number(item.price) * (item.quantity || 1)).toFixed(2)} €</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="cart-total">
        <h4>Total: {total.toFixed(2)} €</h4>
      </div>
    </div>
  );
};

export default Cart;


