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
  const [orderSent, setOrderSent] = useState({
    customer_name: "",
    customer_email: "",
    address_street: "",
    address_city: "",
    address_street_number: "",
    postal_code: "",
    country: "",
    discount_code_id: null,
    id: "",
    billing: "",
    order_date: "",
  });

  const [order, setOrder] = useState({
    customer_name: "",
    customer_email: "",
    address_street: "",
    address_city: "",
    address_street_number: "",
    postal_code: "",
    country: "",
    discount_code_id: null,
  });

  const [confirmMsg, setConfirmMsg] = useState("");
  const [discountList, setDiscountList] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const { cart, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    fetch(`${API_BASE}/discount-codes`)
      .then((res) => res.json())
      .then((data) => setDiscountList(data))
      .catch((err) => console.error(err));
  }, []);

  // Calcolo totale
  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  );
  const hasFreeDelivery = total >= FREE_DELIVERY_THRESHOLD;
  const effectiveDeliveryFee = hasFreeDelivery ? 0 : DELIVERY_FEE;
  const displayTotal = cart.length > 0 ? total + effectiveDeliveryFee : 0;

  // Totale scontato se applicato
  const discountedTotal = appliedDiscount?.discount_percent
    ? displayTotal * (1 - appliedDiscount.discount_percent / 100)
    : displayTotal;

  const handleApplyDiscount = () => {
    const found = discountList.find(
      (d) => d.code.toLowerCase() === discountCode.trim().toLowerCase()
    );
    if (found) {
      setAppliedDiscount(found);
      setConfirmMsg(
        `Valid ${found.code}! discount of ${found.discount_percent}% applied.`
      );
    } else {
      setAppliedDiscount(null);
      setConfirmMsg("Invalid discount code.");
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    const discount = discountList.find(
      (item) => item.code.toLowerCase() === discountCode.trim().toLowerCase()
    );
    const orderData = {
      ...order,
      items: cart,
      discount_code_id: discount?.code_id || null,
    };

    axios
      .post(`${API_BASE}/orders/`, orderData)
      .then((resp) => setOrderSent(resp.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="checkout-container container my-5">
        {orderSent.id === "" ? (
          <h1 className="checkout-title">Checkout</h1>
        ) : (
          <h1 className="checkout-title">Your Order Details</h1>
        )}
        {orderSent.id === "" ? (
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
                  setOrder({
                    ...order,
                    address_street_number: e.target.value,
                  })
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
                onChange={(e) =>
                  setOrder({ ...order, country: e.target.value })
                }
              />
              <h4 className="my-3">Discount Details</h4>

              <div className="d-flex align-items-center mt-2">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Enter your discount code"
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
            </div>

            {/* Order Summary Section */}
            <div className="checkout-section mb-3">
              <h4 className="mb-3">
                <FontAwesomeIcon icon={faCartShopping} className="me-2" />
                Order Summary
              </h4>
              <ul className="list-unstyled mb-3">
                {cart && cart.length > 0 ? (
                  cart.map((item) => (
                    <li key={item.product_id} className="checkout-summary-row">
                      <span className="checkout-summary-name">{item.name}</span>
                      <span className="checkout-summary-actions-box">
                        <button
                          type="button"
                          className="qty-btn-sm"
                          aria-label="Decrease quantity"
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
                          aria-label="Increase quantity"
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
                          {Number(item.price).toLocaleString("it-IT", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          €
                        </span>
                        <button
                          type="button"
                          className="qty-btn-sm qty-btn-trash"
                          aria-label="Remove item"
                          onClick={() => removeFromCart(item.product_id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </span>
                    </li>
                  ))
                ) : (
                  <li>No products in cart.</li>
                )}
              </ul>

              {cart.length > 0 && (
                <>
                  <hr />
                  {/* Delivery Fee */}
                  <div className="checkout-row mb-2">
                    <span className="label-multiline">
                      <span
                        className="label fw-bold"
                        style={{ color: "#9F2E8C" }}
                      >
                        Delivery Fee
                      </span>
                      {hasFreeDelivery && (
                        <span className="label-placeholder">&nbsp;</span>
                      )}
                    </span>
                    <span className="delivery-value-col">
                      {hasFreeDelivery ? (
                        <>
                          <span className="delivery-fee-inline">
                            <span className="strikethrough">
                              {DELIVERY_FEE.toLocaleString("it-IT", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}{" "}
                              €
                            </span>
                            <span className="free-value">0,00 €</span>
                          </span>
                          <span className="free-msg">
                            Congrats! Free delivery applied.
                          </span>
                        </>
                      ) : (
                        <span className="delivery-fee-normal">
                          <span
                            className="fw-bold fs-6"
                            style={{ color: "#9F2E8C" }}
                          >
                            {DELIVERY_FEE.toLocaleString("it-IT", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}{" "}
                            €
                          </span>
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Total row */}
                  <div className="checkout-row mb-2">
                    <span
                      className="label fw-bold"
                      style={{ color: "#9F2E8C" }}
                    >
                      Total
                    </span>
                    <span
                      className="total-value fw-bold fs-5"
                      style={{ color: "#9F2E8C" }}
                    >
                      {discountedTotal.toLocaleString("it-IT", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      €
                    </span>
                  </div>
                </>
              )}
            </div>

            <button className="btn btn-success checkout-btn" type="submit">
              Confirm Order
            </button>

            {confirmMsg && (
              <div className="checkout-confirm mt-3">{confirmMsg}</div>
            )}
          </form>
        ) : (
          <div key={orderSent.id}>
            <ChecklistCard
              orderSent={orderSent}
              cart={cart}
              total={discountedTotal}
              appliedDiscount={appliedDiscount}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
