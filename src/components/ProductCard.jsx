import React from "react";
import "../styles/ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
	

	return (
		(!product) ?
		<div>Product not available</div>:
	
		<div className="product-card card shadow-sm">
			<div className="product-card-img-wrapper position-relative">
				<img
					src={product.image_url}
					alt={product.name}
					className="product-card-img card-img-top"
				/>
				{product.discount_percent && <span className="discount-tag">-{product.discount_percent}%</span>}
			</div>
			<div className="product-card-body card-body d-flex flex-column">
				<span className="product-card-title card-title fw-bold">
					{product.name}
				</span>
				<p className="product-card-price card-text d-flex"> 
					<span className={`me-2  ${product.discount_percent ? "discounted" : ""}`}>
						€{product.price} 
					</span>
					{product.discount_percent 
					? <span className="disc-applied-price"> €{(product.price-((product.price/100)* product.discount_percent)).toFixed(2)}</span>
					: ""}
					</p>
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
