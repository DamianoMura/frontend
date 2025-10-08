import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) return null;

  return (
    <div>
      <h4 className="mb-3">
        <FontAwesomeIcon icon={faCartShopping} className="me-2" />
        Cart Summary
      </h4>
      <ul className="list-unstyled mb-3">
        {cart.map(item => (
          <li key={item.product_id} className="mb-1">
            <strong>{item.name}</strong>
            <span className="text-muted ms-2">{item.brand}</span>
            <span className="badge bg-primary ms-2">
              {Number(item.price).toFixed(2)} €
            </span>
          </li>
        ))}
      </ul>
      <hr />
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-bold" style={{ color: "#e100c7" }}>Total</span>
        <span className="fw-bold fs-5" style={{ color: "#e100c7" }}>
          {Number(total).toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
        </span>
      </div>
      <button
        className="btn btn-outline-primary btn-checkout-inside mt-3 w-100"
        onClick={() => navigate("/checkout")}
        title="Go to Checkout"
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" />
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;

