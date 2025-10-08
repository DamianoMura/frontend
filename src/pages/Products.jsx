import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";

function Products() {
  const [products, setProducts] = useState([]);
  const [onClick, setOnClick] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(""); // Sort option
  const [query, setQuery] = useState("");
  const baseUrl = "http://localhost:3000/products";

  useEffect(() => {
    fetch(`${baseUrl}${filterProduct}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilterProduct(data);
      })
      .catch((err) => console.error(err));
  }, []);

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
    <div id="products" className="container-fluid hn-main">
      <div className="row justify-content-center d-flex hn-sections-container">
        <form className="d-flex" role="search">
          <div className="col-4 m-2">
            <input
              type="text"
              className="form-control"
              placeholder="Find your products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-4 m-2">
            <select
              className="form-select mb-2"
              value={search}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="category_name">Category</option>
              <option value="latest_arrivals">latest_arrivals</option>
              <option value="best_seller">best_seller</option>
            </select>
          </div>
          <div className="col-2 m-2">
            <button className="btn btn-outline-success ms-2" type="submit">
              Search
            </button>
          </div>
          <div className="col-3 m-2 text-white text-center ">
            <button className="btn" onClick={() => setOnClick(!onClick)}>
              <FontAwesomeIcon icon={faGripHorizontal} />
            </button>
          </div>
        </form>
      </div>

      <div className="row">
        <div className="col-12 ps-section my-5">
          <div className="row justify-content-start">
            {filterProduct.map((product) => (
              <div
                className={
                  !onClick
                    ? "col-12 col-md-6 col-lg-3 my-2"
                    : "col-12 col-sm-5 col-md-5 col-lg-4 m-3"
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
  );
}

export default Products;
