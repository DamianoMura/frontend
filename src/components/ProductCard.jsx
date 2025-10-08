import React from "react";
import "../styles/ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	if (!product) {
		return <div>Product not available</div>;
	}

	return (
		<div className="product-card card shadow-sm">
			<div className="product-card-img-wrapper">
				<img
					src={product.image_url}
					alt={product.name}
					className="product-card-img card-img-top"
				/>
			</div>
			<div className="product-card-body card-body d-flex flex-column">
				<span className="product-card-title card-title fw-bold">
					Name: {product.name}
				</span>
				<p className="product-card-price card-text">Price: €{product.price}</p>
				<Link
					to={`/products/${product.slug}`}
					className="btn btn-outline-primary product-card-btn"
				>
					Details
				</Link>
			</div>
		</div>
	);
};

export default ProductCard;
