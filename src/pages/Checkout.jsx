import React, { useState } from 'react';
import '../styles/Checkout.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const API_BASE = 'http://localhost:3000';

const Checkout = () => {
  const { cart, total } = useCart();
  const [billing, setBilling] = useState({ name: '', email: '' });
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [confirmMsg, setConfirmMsg] = useState('');

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
    <div>
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
            <h4 className="mb-3">
              <FontAwesomeIcon icon={faCartShopping} className="me-2" />
              Order Summary
            </h4>
            <ul className="list-unstyled mb-3">
              {cart && cart.length > 0 ? (
                cart.map(item => (
                  <li key={item.product_id} className="mb-1">
                    <strong>{item.name}</strong>
                    <span className="text-muted ms-2">{item.brand}</span>
                    <span className="badge bg-primary ms-2">
                      {Number(item.price).toFixed(2)} €
                    </span>
                    <span className="badge bg-secondary ms-2">
                      x{item.quantity}
                    </span>
                  </li>
                ))
              ) : (
                <li>Nessun prodotto nel carrello.</li>
              )}
            </ul>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold" style={{ color: "#e100c7" }}>Total</span>
              <span className="fw-bold fs-5" style={{ color: "#e100c7" }}>
                {Number(total).toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn btn-success checkout-btn" type="submit">Confirm Order</button>

          {/* Confirmation Message */}
          {confirmMsg && <div className="checkout-confirm mt-3">{confirmMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default Checkout;