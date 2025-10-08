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
  const baseUrl = "http://localhost:3000/products";

  useEffect(() => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilterProduct(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "category_name") {
      filtered.sort((a, b) => a.category_name.localeCompare(b.category_name));
    } else if (sort === "latest_arrivals") {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    } else if (sort === "best_seller") {
      filtered.sort((a, b) => b.sold - a.sold);
    }

    setFilterProduct(filtered);
  }, [search, products, sort]);

  if (products.length === 0) {
    return <div className="container loading">Loading...</div>;
  }

  return (
    <div id="products" className="container-fluid hn-main">
      <div className="row justify-content-center d-flex hn-sections-container">
        <form
          className="d-flex"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
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
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort by...</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="category_name">Category</option>
              <option value="latest_arrivals">Latest arrivals</option>
              <option value="best_seller">Best seller</option>
            </select>
          </div>
          <div className="col-3 m-2 text-white text-center">
            <button
              type="button"
              className="btn"
              onClick={() => setOnClick(!onClick)}
            >
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
