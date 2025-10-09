import React, { useState, useEffect } from "react";
import "../styles/Checkout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import axios from 'axios';
const API_BASE = "http://localhost:3000";

const Checkout = () => {
  const { cart, total } = useCart();
  const [order, setOrder] = useState({
    customer_name: "", 
    customer_email: "",
    address_street: "",
    address_city: "",
    address_street_number: "",
    postal_code: "",
    country: "",
    discount_code_id : null
  });
  const [confirmMsg, setConfirmMsg] = useState("");
  const [discountList, setDiscountList] = useState([]);
  const [discountCode, setDiscountCode] = useState("");

  const discountUrl = "http://localhost:3000/discount-codes";

  // Fetch discount
  useEffect(() => {
    fetch(discountUrl)
      .then((res) => res.json())
      .then((data) => setDiscountList(data))
      .catch((err) => console.error(err));
  }, []);

    const handleOrder = (e)=> {
    e.preventDefault();
    const discount= discountList.find((item)=>item.code===discountCode)
    discount && setOrder({...order,discount_code_id : discount.code_id})
  axios({
  method: 'post',
  url: API_BASE+"/orders/",
  data: {...order,items:cart}
  }).then((resp)=>{
    console.log(resp)
   }).catch((err)=>{console.log(err)})
  };


  // Handle order submission
  // const handleOrder = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(`${API_BASE}/orders`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         customer_name: order.customer_name,
  //         customer_email: order.customer_email,
  //         address_street: order.address_street,
  //         address_street_number: order.address_street_number,
  //         address_city: order.address_city,
  //         postal_code: order.postal_code,
  //         country: order.country,
  //         discount_code_id: null,
  //       }),
  //     });

  //     if (res.ok) {
  //       setConfirmMsg("Order placed! Confirmation email sent.");
  //     } else {
  //       setConfirmMsg("There was an error processing your order.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setConfirmMsg("There was an error processing your order.");
  //   }
  // };

  return (
    <div>
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
              onChange={(e) => setOrder({ ...order, customer_name: e.target.value })}
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
            <input
              type="text"
              className="form-control mb-5"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) =>
                setDiscountCode(e.target.value)
              }
            />
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
                  <li key={item.product_id} className="mb-1">
                    <strong>{item.name}</strong>
                    <span className="text-muted ms-2">{item.brand}</span>
                    <span className="badge bg-primary ms-2">
                      {Number(item.price).toFixed(2)} €
                    </span>
                    <span className="badge bg-secondary ms-2">
                      x{item.quantity}
                    </span>
                  </li>
                ))
              ) : (
                <li>Nessun prodotto nel carrello.</li>
              )}
            </ul>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold" style={{ color: "#e100c7" }}>
                Total
              </span>
              <span className="fw-bold fs-5" style={{ color: "#e100c7" }}>
                {Number(total).toLocaleString("it-IT", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                €
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button className="btn btn-success checkout-btn" type="submit">
            Confirm Order
          </button>

          {/* Confirmation Message */}
          {confirmMsg && (
            <div className="checkout-confirm mt-3">{confirmMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Checkout;
