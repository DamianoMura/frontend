import React, { useState, useEffect } from "react";
import "../styles/Checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCirclePlus,
  faCircleMinus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import axios from "axios";
import ChecklistCard from "../components/ChecklistCard";

const API_BASE = "http://localhost:3000";
const DELIVERY_FEE = 1.9;
const FREE_DELIVERY_THRESHOLD = 1500;

const Checkout = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const [order, setOrder] = useState({
    customer_name: "",
    customer_email: "",
    address_street: "",
    address_street_number: "",
    address_city: "",
    postal_code: "",
    country: "",
    discount_code_id: null,
  });

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountMsg, setDiscountMsg] = useState("");
  const [orderSent, setOrderSent] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [discountList, setDiscountList] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/discount-codes`)
      .then((res) => res.json())
      .then((data) => setDiscountList(data))
      .catch((err) => console.error(err));
  }, []);

  // Totale base dal carrello
  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const discountPercentage = appliedDiscount?.percentage || 0;
  const discountAmount = (subtotal * discountPercentage) / 100;

  const hasFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = hasFreeDelivery ? 0 : DELIVERY_FEE;

  const total = subtotal - discountAmount + deliveryFee;

  const handleApplyDiscount = () => {
    if (!discountCode) return;

    const discount = discountList.find(
      (d) => d.code.toUpperCase() === discountCode.toUpperCase()
    );

    if (discount) {
      setAppliedDiscount(discount);
      setDiscountMsg(`Discount "${discount.code}" applied!`);
    } else {
      setAppliedDiscount(null);
      setDiscountMsg("Invalid discount code");
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setConfirmMsg("Il carrello è vuoto. Aggiungi almeno un prodotto.");
      return;
    }

    try {
      const resp = await axios.post(`${API_BASE}/orders/`, {
        ...order,
        items: cart,
        discount_code_id: appliedDiscount?.code_id || null,
      });
      setOrderSent({
        ...resp.data,
        discount_percentage: appliedDiscount?.percentage || 0,
      });
      setConfirmMsg("Order placed successfully!");
    } catch (err) {
      console.error(err);
      setConfirmMsg("Error placing order. Please try again.");
    }
  };

  if (orderSent) {
    return (
      <div className="checkout-container container my-5">
        <h1 className="checkout-title">Your Order Details</h1>
        <ChecklistCard orderSent={orderSent} />
      </div>
    );
  }

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
            value={order.customer_name}
            onChange={(e) =>
              setOrder({ ...order, customer_name: e.target.value })
            }
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            value={order.customer_email}
            onChange={(e) =>
              setOrder({ ...order, customer_email: e.target.value })
            }
          />
        </div>

        {/* Shipping Section */}
        <div className="checkout-section mb-3">
          <h4>Shipping Details</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Address street"
            required
            value={order.address_street}
            onChange={(e) =>
              setOrder({ ...order, address_street: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Street Number"
            required
            value={order.address_street_number}
            onChange={(e) =>
              setOrder({ ...order, address_street_number: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="City"
            required
            value={order.address_city}
            onChange={(e) =>
              setOrder({ ...order, address_city: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Postal Code"
            required
            value={order.postal_code}
            onChange={(e) =>
              setOrder({ ...order, postal_code: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Country"
            required
            value={order.country}
            onChange={(e) => setOrder({ ...order, country: e.target.value })}
          />

          {/* Discount Code */}
          <div className="d-flex align-items-center mt-2 mb-1">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApplyDiscount}
            >
              Apply
            </button>
          </div>
          {discountMsg && (
            <div
              className={`mt-1 ${appliedDiscount ? "text-success" : "text-danger"
                }`}
            >
              {discountMsg}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="checkout-section mb-3">
          <h4 className="mb-3">
            <FontAwesomeIcon icon={faCartShopping} className="me-2" />
            Order Summary
          </h4>
          <ul className="list-unstyled mb-3">
            {cart.length > 0 ? (
              cart.map((item) => (
                <li key={item.product_id} className="checkout-summary-row">
                  <span className="checkout-summary-name">{item.name}</span>
                  <span className="checkout-summary-actions-box">
                    <button
                      type="button"
                      className="qty-btn-sm"
                      onClick={() =>
                        item.quantity > 1
                          ? updateQuantity(item.product_id, "rem")
                          : removeFromCart(item.product_id)
                      }
                    >
                      <FontAwesomeIcon icon={faCircleMinus} />
                    </button>
                    <span className="checkout-summary-qty-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="qty-btn-sm"
                      onClick={() =>
                        item.quantity < item.stock_quantity
                          ? updateQuantity(item.product_id, "add")
                          : null
                      }
                      disabled={item.quantity === item.stock_quantity}
                    >
                      <FontAwesomeIcon icon={faCirclePlus} />
                    </button>
                    <span className="checkout-summary-price-sm">
                      {(item.price * item.quantity).toLocaleString("it-IT", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </span>
                    <button
                      type="button"
                      className="qty-btn-sm qty-btn-trash"
                      onClick={() => removeFromCart(item.product_id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </span>
                </li>
              ))
            ) : (
              <li>Nessun prodotto nel carrello.</li>
            )}
          </ul>

          {/* Subtotal */}
          <div className="checkout-row mb-2">
            <span className="label fw-bold" style={{ color: "#9F2E8C" }}>
              Subtotal
            </span>
            <span className="total-value">
              {subtotal.toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} €
            </span>
          </div>

          {/* Delivery Fee */}
          <div className="checkout-row mb-2">
            <span className="label fw-bold" style={{ color: "#9F2E8C" }}>
              Delivery Fee
            </span>
            <span className="total-value">
              {deliveryFee.toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €{hasFreeDelivery && " (Free delivery!)"}
            </span>
          </div>

          {/* Discount */}
          {discountPercentage > 0 && (
            <div className="checkout-row mb-2 text-success">
              <span>Discount ({discountPercentage}%)</span>
              <span>
                -
                {discountAmount.toLocaleString("it-IT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                €
              </span>
            </div>
          )}

          {appliedDiscount && (
            <>
              <div className="checkout-row mb-2 text-success">
                <span className="fw-bold">
                  Discount Code: {appliedDiscount.code}
                </span>
                <span>-{discountPercentage}%</span>
              </div>

              <div className="checkout-row mb-2 text-success">
                <span>Amount Saved</span>
                <span>
                  -{discountAmount.toLocaleString("it-IT", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} €
                </span>
              </div>
            </>
          )}


          {/* Amount Saved */}
          {discountPercentage > 0 && (
            <div className="checkout-row mb-2 text-success">
              <span>Amount Saved</span>
              <span>
                -
                {discountAmount.toLocaleString("it-IT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} €
              </span>
            </div>
          )}

          {/* Total */}
          <div className="checkout-row mb-2">
            <span className="label fw-bold" style={{ color: "#9F2E8C" }}>
              Total
            </span>
            <span
              className="total-value fw-bold fs-5"
              style={{ color: "#9F2E8C" }}
            >
              {total.toLocaleString("it-IT", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              €
            </span>
          </div>
        </div>

        <button
          className="btn btn-success checkout-btn"
          type="submit"
          disabled={cart.length === 0}
        >
          Confirm Order
        </button>

        {confirmMsg && (
          <div className="checkout-confirm mt-3">{confirmMsg}</div>
        )}
      </form>
    </div>
  );
};

export default Checkout;
