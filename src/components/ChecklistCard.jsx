import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function ChecklistCard({ orderSent }) {
  const {
    customer_name,
    customer_email,
    address_street,
    address_street_number,
    address_city,
    postal_code,
    country,
    items,
    discount_code_id,
    id,
  } = orderSent;
  const total = items.map((item)=> total+=item.price)
  return (
    <div className="card p-4">
      <h2 className="text-center mb-4" style={{ color: "#e100c7" }}>
        Order Summary
      </h2>

      <div className="mb-3">
        <h5 className="fw-bold">Customer Details</h5>
        <p>
          <strong>Name:</strong> {customer_name}
        </p>
        <p>
          <strong>email:</strong> {customer_email}
        </p>
      </div>

      <div className="mb-3">
        <h5 className="fw-bold">Shipping address</h5>
        <p>
          {address_street} {address_street_number},<br />
          {address_city} ({postal_code})<br />
          {country}
        </p>
      </div>

      <h5 className="fw-bold mb-3">
        <FontAwesomeIcon icon={faCartShopping} className="me-2" />
        Purchased Items
      </h5>

      <ul className="list-group mb-3">
        {items.map((item) => (
          <li
            key={item.product_id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{item.name}</strong>
              <span className=""> ({item.brand}) </span>
              <div className="">Quantity: {item.quantity}</div>
            </div>
            <span className="badge bg-primary rounded-pill">
              {(item.price * item.quantity).toFixed(2)} €
            </span>
          </li>
        ))}
      </ul>

      <hr />

      <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bold" style={{ color: "#e100c7" }}>
          Total
        </h4>
        <h4 className="fw-bold" style={{ color: "#e100c7" }}>
          {Number(total).toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
          €
        </h4>
      </div>
    </div>
  );
}

export default ChecklistCard;
