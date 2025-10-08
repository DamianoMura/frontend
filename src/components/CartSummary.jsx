import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faCartShopping,faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const { cart, total, updateQuantity, removeFromCart } = useCart();
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
            <span className="ms-2">{item.brand}</span>
            <span className="badge bg-primary ms-2">
              {
              item.quantity>1 
              ? `x${item.quantity} = ${Number(item.quantity*item.price).toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`  
              :Number(item.price).toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
              }
            </span>
              <br/>
              <button className="btn" onClick={() => updateQuantity(item.  product_id,"add")}> + </button>
              {
                item.quantity>1 
                ? <button className="btn px-3" onClick={() => updateQuantity(item.product_id,"rem")}> - </button>
                : <button className="btn" onClick={() => removeFromCart(item.product_id)}>
                  <FontAwesomeIcon icon={faTrashCan} className="me-2" />
                </button>
              }
              
            
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

