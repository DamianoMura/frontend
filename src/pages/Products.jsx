// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { Link, NavLink } from "react-router-dom";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [onClick, setOnClick] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  //   filtraggio per nome del film
  useEffect(() => {
    const filterProduct = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilterProduct(filterProduct);
  }, [search, products]);

  if (products.length === 0) {
    return <div className="container loading">Loading...</div>;
  }

  return (
    <div id="products" className="container-fluid">
      <div className="row justify-content-center">
        <section id="hero" role="region" aria-label="Hero">
          <div className="p-5 container-fluid">
            <h1 className="text-center">Products</h1>
            <div className="d-flex justify-content-center">
              <Link to="/home" className="btn">
                Home
              </Link>
            </div>
          </div>
        </section>
        <div className="row justify-content-center d-flex ">
          <div className="col-5 my-4">
            <form className="d-flex" role="search">
              <input
                type="text"
                className="form-control"
                placeholder="Find your products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
          <div className="col-3 my-4 text-white text-center">
            <button className="btn" onClick={() => setOnClick(!onClick)}>
              <FontAwesomeIcon icon={faGripHorizontal} />
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="row justify-content-center">
              {filterProduct.map((product) => (
                <div
                  className={
                    !onClick
                      ? "col-12 col-sm-5 col-md-5 col-lg-3 m-4"
                      : "col-12 col-sm-5 col-md-5 col-lg-5 m-2"
                  }
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
