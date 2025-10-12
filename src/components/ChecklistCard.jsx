import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function ChecklistCard({ orderSent }) {
  if (!orderSent) return null;

  const {
    customer_name,
    customer_email,
    address_street,
    address_street_number,
    address_city,
    postal_code,
    country,
    items = [],
    discount_code_id,
  } = orderSent;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const discountPercentage = discount_code_id ? 10 : 0;
  const discountAmount = (subtotal * discountPercentage) / 100;
  const total = subtotal - discountAmount;

  return (
    <div className="card p-4 shadow-sm rounded-4">
      <h2 className="text-center mb-4" style={{ color: "#e100c7" }}>
        Order Summary
      </h2>

      <section className="mb-3">
        <h5 className="fw-bold">Customer Details</h5>
        <p>
          <strong>Name:</strong> {customer_name}
        </p>
        <p>
          <strong>Email:</strong> {customer_email}
        </p>
      </section>

      <section className="mb-3">
        <h5 className="fw-bold">Shipping Address</h5>
        <address className="mb-0">
          {address_street} {address_street_number},<br />
          {address_city} ({postal_code})<br />
          {country}
        </address>
      </section>

      <section>
        <h5 className="fw-bold mb-3">
          <FontAwesomeIcon icon={faCartShopping} className="me-2" />
          Purchased Items
        </h5>

        <ul className="list-group mb-3">
          {items.map(({ product_id, name, brand, quantity, price }) => (
            <li
              key={product_id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{name}</strong> <span>({brand})</span>
                <div>Quantity: {quantity}</div>
              </div>
              <span className="badge bg-primary rounded-pill">
                {(price * quantity).toFixed(2)} €
              </span>
            </li>
          ))}
        </ul>
      </section>

      <hr />

      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="fw-bold">Subtotal</h5>
        <h5>
          {subtotal.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          €
        </h5>
      </div>

      {discount_code_id && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2 text-success">
            <h5 className="fw-bold">Discount (Code: {discount_code_id})</h5>
            <h5>-{discountPercentage}%</h5>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-2 text-success">
            <span>Amount Saved</span>
            <span>
              -
              {discountAmount.toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €
            </span>
          </div>
        </>
      )}

      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4 className="fw-bold" style={{ color: "#e100c7" }}>
          Total
        </h4>
        <h4 className="fw-bold" style={{ color: "#e100c7" }}>
          {total.toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          €
        </h4>
      </div>
    </div>
  );
}

export default ChecklistCard;
