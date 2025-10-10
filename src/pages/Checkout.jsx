import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import axios from "axios";
import ChecklistCard from "../components/ChecklistCard";
import "../styles/Checkout.css";

const API_BASE = "http://localhost:3000";

const Checkout = () => {
  const { cart, total } = useCart();

  const [orderSent, setOrderSent] = useState({
    id: "",
    customer_name: "",
    customer_email: "",
    address_street: "",
    address_city: "",
    address_street_number: "",
    postal_code: "",
    country: "",
    discount_code: null,
    discount_percent: 0,
  });

  const [order, setOrder] = useState({
    customer_name: "",
    customer_email: "",
    address_street: "",
    address_city: "",
    address_street_number: "",
    postal_code: "",
    country: "",
  });

  const [discountList, setDiscountList] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [confirmMsg, setConfirmMsg] = useState("");

  useEffect(() => {
    fetch(`${API_BASE}/discount-codes`)
      .then((res) => res.json())
      .then((data) => setDiscountList(data))
      .catch((err) => console.error(err));
  }, []);

  const today = new Date();
  const validDiscounts = discountList.filter((d) => {
    const from = new Date(d.valid_from);
    const until = new Date(d.valid_until);
    return today >= from && today <= until;
  });

  const finalTotal = appliedDiscount
    ? total - (total * appliedDiscount.discount_percent) / 100
    : total;

  const handleApplyDiscount = () => {
    const found = validDiscounts.find(
      (d) => d.code.toLowerCase() === discountCode.trim().toLowerCase()
    );

    if (found) {
      setAppliedDiscount(found);
      setConfirmMsg(`Valid code! ${found.discount_percent}% discount applied.`);
    } else {
      setAppliedDiscount(null);
      setConfirmMsg("Invalid discount code.");
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    const discount = appliedDiscount;

    const orderData = {
      ...order,
      discount_code: discount ? discount.code : null,
      discount_percent: discount ? discount.discount_percent : 0,
      items: cart,
    };

    try {
      const resp = await axios.post(`${API_BASE}/orders/`, orderData);
      setOrderSent({ ...resp.data });
      setConfirmMsg("Ordine inviato con successo!");
    } catch (err) {
      console.error(err);
      setConfirmMsg("Errore durante l'invio dell'ordine.");
    }
  };

  return (
    <div className="checkout-container">
      {orderSent.id === "" ? (
        <form className="checkout-form" onSubmit={handleOrder}>
          <h1 className="text-center mb-4 text-white">Checkout</h1>

          {/* Billing Details */}
          <div className="mb-4 text-white">
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

          {/* Shipping Details */}
          <div className="mb-4 text-white">
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

          {/* Order Summary */}
          <div className="mb-4 text-white">
            <h4 className="mb-3">
              <FontAwesomeIcon icon={faCartShopping} className="me-2" /> Order
              Summary
            </h4>
            <ul className="list-group mb-3">
              {cart && cart.length > 0 ? (
                cart.map((item) => (
                  <li
                    key={item.product_id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong> <br />
                      <small className="text-muted">{item.brand}</small>
                    </div>
                    <div>
                      <span className="badge bg-primary rounded-pill me-2">
                        {Number(item.price).toFixed(2)} €
                      </span>
                      <span className="badge bg-secondary rounded-pill">
                        x{item.quantity}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li className="list-group-item">
                  Nessun prodotto nel carrello.
                </li>
              )}
            </ul>

            {appliedDiscount && (
              <div className="mb-2">
                <span>Prezzo originale: </span>
                <span className="text-decoration-line-through me-2">
                  {total.toLocaleString("it-IT", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </span>
                <span>Prezzo scontato: </span>
                <span>
                  {finalTotal.toLocaleString("it-IT", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  €
                </span>
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center fw-bold fs-5">
              <span>Total</span>
              <span>
                {finalTotal.toLocaleString("it-IT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                €
              </span>
            </div>
          </div>

          <button className="btn btn-success w-100" type="submit">
            Confirm Order
          </button>
          {confirmMsg && (
            <div className="text-center mt-3 text-warning fw-bold">
              {confirmMsg}
            </div>
          )}
        </form>
      ) : (
        <ChecklistCard orderSent={orderSent} cart={cart} total={finalTotal} />
      )}
    </div>
  );
};

export default Checkout;
