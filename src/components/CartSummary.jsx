
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket,faCartShopping,faTrashCan,faCartPlus,faCartArrowDown} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import "../styles/CartSummary.css";

const CartSummary = () => {
  const { cart, total, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!cart || cart.length === 0) return null;

  return (
    <div className="cart-summary-card">
      <h4 className="mb-3">
        <FontAwesomeIcon icon={faCartShopping} className="me-2" />
        Cart Summary
      </h4>

      <ul className="list-unstyled mb-3">
        {cart.map(item => (
          <li key={item.product_id} className="mb-1">
            <div>
              <strong>{item.name}</strong>
              <span className="ms-2">{item.brand}</span>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div className="mt-3 d-flex gap-2">
                {/* Trash Icon */}
                <button
                  className="cart-s-btn"
                  onClick={() => removeFromCart(item.product_id)}
                  title="Rimuovi completamente"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>

                {/* Remove One Icon */}
                <button
                  className="cart-s-btn"
                  onClick={() => updateQuantity(item.product_id, "rem")}
                  title="Rimuovi una unità"
                  disabled={item.quantity <= 1}
                >
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </button>

                {/* Add One Icon */}
                <button
                  className="cart-s-btn"
                  onClick={() => updateQuantity(item.product_id, "add")}
                  title="Aggiungi una unità"
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
              </div>

              <span className="badge bg-primary ms-2 d-flex">
                {item.quantity > 1
                  ? `x ${item.quantity} = ${Number(item.quantity * item.price).toLocaleString("it-IT", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}`
                  : Number(item.price).toLocaleString("it-IT", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
              </span>
            </div>
            <br />
          </li>
        ))}
      </ul>

      <hr />

      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-bold" style={{ color: "#e100c7" }}>Total</span>
        <span className="fw-bold fs-5" style={{ color: "#e100c7" }}>
          {Number(total).toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })} €
        </span>
      </div>

      <button
        className="btn btn-outline-primary btn-checkout-inside mt-3 w-100"
        onClick={() => navigate("/checkout")}
        title="Vai al Checkout"
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" />
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;


