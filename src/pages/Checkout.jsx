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
  });

  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountMsg, setDiscountMsg] = useState("");
  const [orderSent, setOrderSent] = useState(null);
  const [confirmMsg, setConfirmMsg] = useState("");
  const [discountList, setDiscountList] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/discount-codes`)
      .then((res) => setDiscountList(res.data))
      .catch((err) => console.error(err));
  }, []);

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  );

  const discountPercentage = appliedDiscount?.discount_percent || 0;
  const discountAmount = (subtotal * discountPercentage) / 100;

  const hasFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const deliveryFee = hasFreeDelivery ? 0 : DELIVERY_FEE;

  const total = subtotal - discountAmount + deliveryFee;

  const formatPrice = (value) =>
    value.toLocaleString("it-IT", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €";

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      setDiscountMsg("Inserisci un codice sconto.");
      setAppliedDiscount(null);
      return;
    }

    const discount = discountList.find(
      (d) => d.code.toUpperCase() === discountCode.toUpperCase()
    );

    if (discount) {
      setAppliedDiscount(discount);
      setDiscountMsg(`Sconto "${discount.code}" applicato!`);
    } else {
      setAppliedDiscount(null);
      setDiscountMsg("Codice sconto non valido.");
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
        discount_percent: appliedDiscount?.discount_percent || 0,
      });
      setConfirmMsg("Ordine effettuato con successo!");
    } catch (err) {
      console.error(err);
      setConfirmMsg("Errore durante l'invio dell'ordine. Riprova.");
    }
  };

  if (orderSent) {
    return (
      <div className="checkout-container container my-5">
        <h1 className="checkout-title">Order Summary</h1>
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
          <h4>Dettagli Cliente</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nome"
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
          <h4>Dettagli Spedizione</h4>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Via"
            required
            value={order.address_street}
            onChange={(e) =>
              setOrder({ ...order, address_street: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Numero civico"
            required
            value={order.address_street_number}
            onChange={(e) =>
              setOrder({ ...order, address_street_number: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Città"
            required
            value={order.address_city}
            onChange={(e) =>
              setOrder({ ...order, address_city: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="CAP"
            required
            value={order.postal_code}
            onChange={(e) =>
              setOrder({ ...order, postal_code: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Paese"
            required
            value={order.country}
            onChange={(e) => setOrder({ ...order, country: e.target.value })}
          />

          {/* Discount Code */}
          <div className="d-flex align-items-center mt-2 mb-1">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Codice sconto"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleApplyDiscount}
              disabled={!discountCode.trim()}
            >
              Apply
            </button>
          </div>
          {discountMsg && (
            <div
              className={`mt-1 ${
                appliedDiscount ? "text-success" : "text-danger"
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
                      {formatPrice(item.price * item.quantity)}
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
              <li>Nothing in the cart.</li>
            )}
          </ul>

          <div className="checkout-row mb-2">
            <span className="label fw-bold" style={{ color: "#9F2E8C" }}>
              Subtotale
            </span>
            <span className="total-value">{formatPrice(subtotal)}</span>
          </div>

          <div className="checkout-row mb-2">
            <span className="label fw-bold" style={{ color: "#9F2E8C" }}>
              Shipping Fee
            </span>
            <span className="total-value">
              {formatPrice(deliveryFee)} {hasFreeDelivery && "(Gratuita)"}
            </span>
          </div>

          {appliedDiscount && (
            <div className="checkout-row mb-2 text-success">
              <span>Discount ({appliedDiscount.code})</span>
              <span>-{formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="checkout-row mb-2">
            <span className="label fw-bold" style={{ color: "#9F2E8C" }}>
              Totale
            </span>
            <span
              className="total-value fw-bold fs-5"
              style={{ color: "#9F2E8C" }}
            >
              {formatPrice(total)}
            </span>
          </div>
        </div>

        <button
          className="btn btn-success checkout-btn"
          type="submit"
          disabled={cart.length === 0}
        >
          Confirm and Pay
        </button>

        {confirmMsg && (
          <div className="checkout-confirm mt-3">{confirmMsg}</div>
        )}
      </form>
    </div>
  );
};

export default Checkout;
