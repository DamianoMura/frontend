import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useCart } from "../context/CartContext";

function ChecklistCard({ orderSent }) {
  const { clearCart } = useCart();
  const [emailStatus, setEmailStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false); // nuovo stato per bloccare invii multipli

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
    discount_percent = 0,
    discount_code,
  } = orderSent;

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  const discountAmount = (subtotal * discount_percent) / 100;
  const total = subtotal - discountAmount;

  const handleSendOrder = async () => {
    setSending(true);
    try {
      await axios.post("http://localhost:3000/orders/send-email", {
        customer_name,
        customer_email,
        items,
        total,
      });
      setEmailStatus("Email inviata con successo! 📧");
      setEmailSent(true); // impedisce ulteriori invii
      clearCart(); // svuota il carrello
    } catch (err) {
      console.error(err);
      setEmailStatus("Errore durante l’invio della mail.");
    } finally {
      setSending(false);
    }
  };

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

      {discount_percent > 0 && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2 text-success">
            <h5 className="fw-bold">Discount ({discount_code})</h5>
            <h5>-{discount_percent}%</h5>
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

      <button
        className="btn btn-success mt-4"
        onClick={handleSendOrder}
        disabled={sending || emailSent} // bottone disabilitato se già inviata
      >
        {sending
          ? "Invio in corso..."
          : emailSent
          ? "Email già inviata"
          : "Send Order via Email"}
      </button>

      {emailStatus && (
        <div className="alert alert-info mt-3 text-center">{emailStatus}</div>
      )}
    </div>
  );
}

export default ChecklistCard;
