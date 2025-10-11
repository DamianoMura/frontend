
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket,faCartShopping,faTrashCan,faCartPlus,faCartArrowDown} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import "../styles/CartSummary.css";
import { useState,useEffect } from "react";
const CartSummary = (props) => {
  
  props && console.log("cart summary",props.data)//we receive this from the Product Detail Page
  
  const { cart, total, updateQuantity, removeFromCart, addToCart } = useCart();
  const [presence,setPresence]=useState();
  const navigate = useNavigate();
  // let isInCart = cart.map((item)=>{
  //   (item.product_id===props.data.product_id);
  // });
  // console.log(isInCart.length)
  const isInCart = () =>{
     let check = cart.find((item)=> cart.product_id===props.data.product_id)
    if (check.length>0) setPresence(true)
    else setPresence(false)
  }
   
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
                {item.quantity==1 && <button
                  className="cart-s-btn"
                  onClick={() => {
                    removeFromCart(item.product_id)
                    setPresence(false)
                  }}
                  title="Rimuovi completamente"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>}

                {/* Remove One Icon */}
                {item.quantity>1 && 
                <button
                  className="cart-s-btn"
                  onClick={() => updateQuantity(item.product_id, "rem")}
                  title="Rimuovi una unità"
                  
                >
                  <FontAwesomeIcon icon={faCartArrowDown} />
                </button>
                }

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
        {
         
          (!presence)&& (
            <li key={props.data.slug} className="mb-1">
            <div>
              <strong>{props.data.name}</strong>
              <span className="ms-2">{props.data.brand}</span>
            </div>

            <div className="d-flex align-items-center justify-content-between">
              <div className="mt-3 d-flex gap-2">
                item is  not in your cart

                

                {/* Add One Icon */}
                <button
                  className="cart-s-btn"
                  onClick={() => {
                    addToCart(props.data)
                    setPresence(true)
                  }}
                  title="Aggiungi al carrello"
                >
                 add to cart <FontAwesomeIcon icon={faCartPlus} />
                </button>
              </div>

              
            </div>
            <br />
          </li>
          )
        } 
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
        disabled={cart.length===0}
      >
        <FontAwesomeIcon icon={faArrowRightToBracket} className="me-2" />
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;


