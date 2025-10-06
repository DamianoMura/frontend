// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Checkout.css';

const API_BASE = 'http://localhost:3000';

/**
 * Checkout component
 * - Displays billing and shipping forms
 * - Shows order summary
 * - Allows submitting order to backend
 */
const Checkout = () => {
  const [billing, setBilling] = useState({ name: '', email: '' });
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [confirmMsg, setConfirmMsg] = useState('');
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items that are not yet ordered
  useEffect(() => {
    fetch(`${API_BASE}/order-items`)
      .then(res => res.json())
      .then(orderItems => {
        const cartItems = orderItems.filter(item => item.order_id === null);
        setCart(cartItems);
        setTotal(cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0));
      })
      .catch(err => console.error(err));
  }, []);

  // Handle order submission
  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: billing.name,
          customer_email: billing.email,
          address_street: shipping.address,
          address_city: shipping.city,
          postal_code: shipping.postalCode,
          country: shipping.country,
          billing: `${billing.name}, ${billing.email}`,
          order_date: new Date().toISOString().slice(0, 10),
          total_price: total,
          discount_code_id: null
        })
      });

      if (res.ok) setConfirmMsg('Order placed! Confirmation email sent.');
      else setConfirmMsg('There was an error processing your order.');
    } catch (err) {
      console.error(err);
      setConfirmMsg('There was an error processing your order.');
    }
  };

  return (
    <div className="checkout-container container my-5">
      <h1 className="checkout-title">Checkout</h1>

      <form className="checkout-form" onSubmit={handleOrder}>
        {/* Billing Section */}
        <div className="checkout-section mb-3">
          <h4>Billing Details</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            required
            value={billing.name}
            onChange={e => setBilling({ ...billing, name: e.target.value })}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            value={billing.email}
            onChange={e => setBilling({ ...billing, email: e.target.value })}
          />
        </div>

        {/* Shipping Section */}
        <div className="checkout-section mb-3">
          <h4>Shipping Details</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Address"
            required
            value={shipping.address}
            onChange={e => setShipping({ ...shipping, address: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="City"
            required
            value={shipping.city}
            onChange={e => setShipping({ ...shipping, city: e.target.value })}
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Postal Code"
            required
            value={shipping.postalCode}
            onChange={e => setShipping({ ...shipping, postalCode: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            required
            value={shipping.country}
            onChange={e => setShipping({ ...shipping, country: e.target.value })}
          />
        </div>

        {/* Order Summary Section */}
        <div className="checkout-section mb-3">
          <h4>Order Summary</h4>
          <ul>
            {cart.map(item => (
              <li key={item.order_item_id}>
                {item.name} x {item.quantity} - {(Number(item.price) * item.quantity).toFixed(2)} €
              </li>
            ))}
          </ul>
          <h5>Total: {total.toFixed(2)} €</h5>
        </div>

        {/* Submit Button */}
        <button className="btn btn-success" type="submit">Confirm Order</button>

        {/* Confirmation Message */}
        {confirmMsg && <div className="checkout-confirm mt-3">{confirmMsg}</div>}
      </form>
    </div>
  );
};

export default Checkout;
