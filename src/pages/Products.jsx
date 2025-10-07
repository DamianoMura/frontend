// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  if (products.length === 0) {
    return <div className="container loading">Loading...</div>;
  }

  return (
    <div id="products" className="container-fluid">
      <form className="d-flex navbar-search-form" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Product"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <div className="row justify-content-center">
        <div className="col-12 text-center text-light">Products</div>
        <div className="row">
          <div className="col-12">
            <div className="row justify-content-center">
              {products.map((product) => (
                <div
                  className="col-12 col-sm-5 col-md-5 col-lg-3 m-4"
                  key={product.product_id}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
