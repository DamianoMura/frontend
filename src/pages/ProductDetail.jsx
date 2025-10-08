import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const inCart = cart.some((item) => item.product_id === product.product_id);
  const displayPrice = !isNaN(Number(product.price))
    ? Number(product.price).toFixed(2)
    : "0.00";

  return (
    <div className="product-detail-root text-white">
      <div className="product-detail-row">
        {/* Immagine */}
        <div className="product-image-col">
          <img
            src={product.image_url}
            alt={product.name}
            className="product-detail-img"
          />
        </div>

        {/* Dettagli */}
        <div className="product-details-col">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {displayPrice} €</p>
          <p>Brand: {product.brand}</p>
          <div className="my-3">
            {!inCart ? (
              <button
                className="btn"
                onClick={() => addToCart(product)}
                title="Add to cart"
              >
                <FontAwesomeIcon icon={faCartPlus} />
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(product.product_id)}
                title="Remove from cart"
              >
                <FontAwesomeIcon icon={faCartArrowDown} />
              </button>
            )}
          </div>
        </div>

        {/* Colonna sempre presente per il summary */}
        <div className="product-summary-col">
          {cart && cart.length > 0 ? (
            <div className="cart-summary-card">
              <CartSummary />
            </div>
          ) : (
            <div className="cart-summary-card cart-summary-placeholder"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
