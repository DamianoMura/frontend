// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

// FontAwesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

// Context
import { useCart } from "../context/CartContext";

// Cart summary component
import CartSummary from "../components/CartSummary";

import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import ProductDetail from "./ProductDetail";

function Products() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();

  // Fetch product data from backend on mount or when id changes
  useEffect(() => {
    fetch(`http://localhost:3000/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  if (!products) {
    return <div>Loading...</div>; // Show loading state while fetching
  }

  console.log(products);
  // Check if product is already in cart
  const inCart = cart.some((item) => item.product_id === products.product_id);

  // Safely format price
  const displayPrice = !isNaN(Number(products.price))
    ? Number(products.price).toFixed(2)
    : "0.00";
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <section id="hero" role="region" aria-label="Hero">
                <div className="p-5 mb-5 container-fluid hero-container">
                  <h1 className="text-center">.nerdNest</h1>
                  <h3 className="text-center">
                    Il tuo rifugio per ogni innovazione
                  </h3>
                  <div className="d-flex justify-content-center">
                    <NavLink className="btn my-3" to="/">
                      Back Home
                    </NavLink>
                  </div>
                </div>
              </section>
            </div>
            <div className="row justify-content-center">
              {products.map((product) => (
                <div className="col-3 m-4 " key={product.product_id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
