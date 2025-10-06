// src/components/CartSummary.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../styles/CartSummary.css'; // <-- assicurati di importare il CSS

const CartSummary = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0
  );

  if (cart.length === 0) return null;

  const handleClick = () => navigate("/cart");

  return (
    <div
      className="cart-summary-card shadow-sm p-3 rounded"
      onClick={handleClick}
      title="Go to Cart"
    >
      <div className="d-flex align-items-center mb-3">
        <FontAwesomeIcon
          icon={faShoppingCart}
          className="me-2"
          style={{ fontSize: "1.7rem", color: "#007bff" }}
        />
        <h4 className="mb-0">Cart Summary</h4>
      </div>
      <ul className="list-group mb-3">
        {cart.map((item) => (
          <li
            key={item.product_id}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{
              border: "none",
              background: "transparent",
              padding: "0.75rem 1rem",
            }}
          >
            <div>
              <span className="fw-semibold">{item.name}</span>
              <span className="text-muted ms-2">{item.brand}</span>
            </div>
            <span className="badge bg-primary rounded-pill">
              {Number(item.price).toLocaleString("en-US")} €
            </span>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between align-items-center border-top pt-3">
        <span className="fw-bold">Total</span>
        <span className="fs-5 fw-bold text-success">
          {totalPrice.toLocaleString("en-US")} €
        </span>
      </div>
    </div>
  );
};

export default CartSummary;

