// src/components/ProductCard.jsx
import React from 'react';
import '../styles/ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if (!product) {
    return <div>Product not available</div>;
  }

  return (
    <div className="product-card card shadow-sm">
      <img
        src={`http://localhost:3000/images/${product.image_url}`}
        alt={product.name}
        className="product-card-img card-img-top"
      />
      <div className="product-card-body card-body d-flex flex-column">
        <h5 className="product-card-title card-title">{product.name}</h5>
        <p className="product-card-price card-text">{product.price} €</p>
        <Link
          to={`/products/${product.product_id}`}
          className="btn btn-outline-primary product-card-btn"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

