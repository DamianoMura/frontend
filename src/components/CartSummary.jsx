import { useNavigate } from "react-router-dom";


import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToBracket,
  faCartShopping,
  faTrashCan,
  faCartPlus,
  faCartArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import "../styles/CartSummary.css";
import { useState, useEffect } from "react";

const CartSummary = (props) => {
  const { cart, total, updateQuantity, removeFromCart, addToCart } = useCart();
  const [presence, setPresence] = useState(false);
  const navigate = useNavigate();

  // --- Check if product is already in the cart ---
  useEffect(() => {
    if (props?.data) {
      const found = cart.find(
        (item) => item.product_id === props.data.product_id
      );
      setPresence(!!found);
    }
  }, [cart, props]);

  return (
    <div className="cart-summary-box">
      <h4 className="cart-summary-title">
        <FontAwesomeIcon icon={faCartShopping} className="me-2" />
        Cart Summary
      </h4>

      {/* --- Cart Items --- */}
      <ul className="cart-summary-list">
        {cart.map((item) => (
          <li key={item.product_id} className="cart-summary-item">
            <div className="item-main">
              <span className="item-name">{item.name}</span>
              <span className="item-brand">{item.brand}</span>
            </div>

            <div className="item-actions">
              <div className="qty-controls">
                {item.quantity === 1 ? (
                  <button
                    className="qty-btn-trash"
                    onClick={() => {
                      removeFromCart(item.product_id);
                      if (props?.data?.product_id === item.product_id)
                        setPresence(false);
                    }}
                    title="Remove item"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                ) : (
                  <button
                    className="qty-btn-sm"
                    onClick={() => updateQuantity(item.product_id, "rem")}
                    title="Remove one unit"
                  >
                    <FontAwesomeIcon icon={faCartArrowDown} />
                  </button>
                )}

                <span className="cart-summary-qty-sm">{item.quantity}</span>

                <button
                  className="qty-btn-sm"
                  onClick={() => updateQuantity(item.product_id, "add")}
                  title="Add one unit"
                >
                  <FontAwesomeIcon icon={faCartPlus} />
                </button>
              </div>

              <span className="cart-summary-price-sm">
                €{" "}
                {Number(item.price * item.quantity).toLocaleString("it-IT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </li>
        ))}

        {/* --- If current product not in cart --- */}
        {!presence && props?.data && (
          <li className="cart-summary-item not-in-cart">
            <div className="item-main">
              <span className="item-name">{props.data.name}</span>
              <span className="item-brand">{props.data.brand}</span>
            </div>

            <div className="item-actions">
              <span className="item-missing">Item not in your cart</span>
              <button
                className="add-btn"
                onClick={() => {
                  addToCart(props.data);
                  setPresence(true);
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} /> Add to cart
              </button>
            </div>
          </li>
        ))}
      </ul>

      <hr className="cart-divider" />

      {/* --- Total --- */}
      <div className="cart-total-row">
        <span className="cart-total-label">Total</span>
        <span className="cart-total-value">
          €{" "}
          {Number(total).toLocaleString("it-IT", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>

      <button
        className="cart-checkout-btn"
        onClick={() => navigate("/checkout")}
        disabled={cart.length === 0}
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" />
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
