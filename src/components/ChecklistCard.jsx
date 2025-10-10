import React from "react";
import "../styles/ChecklistCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function ChecklistCard({ orderSent, cart, total, appliedDiscount }) {
  const {
    customer_name,
    customer_email,
    address_street,
    address_street_number,
    address_city,
    postal_code,
    country,
  } = orderSent;

  const deliveryFee = total >= 1500 ? 0 : 1.9;
  const discountPercent = appliedDiscount?.discount_percent || 0;
  const discountValue =
    discountPercent > 0
      ? (total * discountPercent) / (100 - discountPercent)
      : 0;
  const subtotal = total - deliveryFee + discountValue;

  return (
    <div className="card-checklist">
      <h2>Order Summary</h2>

      {/* CUSTOMER SECTION */}
      <div className="section">
        <h5>
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Customer Details
        </h5>
        <p>
          <strong>Name:</strong> {customer_name}
        </p>
        <p>
          <strong>Email:</strong> {customer_email}
        </p>
      </div>

      {/* SHIPPING SECTION */}
      <div className="section">
        <h5>
          <FontAwesomeIcon icon={faLocationDot} className="me-2" />
          Shipping Address
        </h5>
        <p>
          {address_street} {address_street_number},<br />
          {address_city} ({postal_code})<br />
          {country}
        </p>
      </div>

      {/* ITEMS SECTION */}
      <div className="section">
        <h5>
          <FontAwesomeIcon icon={faCartShopping} className="me-2" />
          Purchased Items
        </h5>
        <ul className="list-group">
          {cart.map((item) => (
            <li key={item.product_id} className="list-group-item">
              <div>
                <strong>{item.name}</strong>
                <span> ({item.brand})</span>
                <div>Quantity: {item.quantity}</div>
              </div>
              <span className="badge rounded-pill">
                {(item.price * item.quantity).toFixed(2)} €
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="divider"></div>

      {/* SUMMARY SECTION */}
      <div className="summary-box">
        <div className="summary-row">
          <strong>Subtotal:</strong>
          <span>
            {subtotal.toLocaleString("it-IT", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            €
          </span>
        </div>

        {discountPercent > 0 && (
          <div className="summary-row discount-text">
            <strong>Discount ({discountPercent}%):</strong>
            <span>
              -
              {(subtotal * (discountPercent / 100)).toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €
            </span>
          </div>
        )}

        <div className="summary-row">
          <strong>Delivery Fee:</strong>
          <span>
            {deliveryFee === 0 ? "Free" : `${deliveryFee.toFixed(2)} €`}
          </span>
        </div>

        <div className="summary-row total">
          <strong>Total:</strong>
          <span>
            {total.toLocaleString("it-IT", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            €
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChecklistCard;
