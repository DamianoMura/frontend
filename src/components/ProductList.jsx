import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProductList.css";

const ProductList = ({ product }) => {
	if (!product) {
		return <div>Product not available</div>;
	}

	return (
		<div className="col-12 product-list">
			<div className="product-card">
				<div className="product-card-img-wrapper">
					<img
						src={product.image_url}
						alt={product.name}
						className="product-card-img"
					/>
				</div>
				<div className="card-body">
					<div className="card-header d-flex justify-content-between">
						<h5 className="card-title">{product.name}</h5>
						<p className="card-text">
							<small className="text-body-secondary">
								{product.category_name}
							</small>
						</p>
					</div>
					<p className="card-text">{product.specs}</p>
					<p className="card-text">{product.description}</p>
					<p className="card-text-price">€ {product.price}</p>
					<Link
						to={`/products/${product.slug}`}
						className="btn btn-outline-primary product-card-btn"
					>
						Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
