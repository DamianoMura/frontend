import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import CartSummary from "../components/CartSummary";
import RelatedProducts from "../components/RelatedProducts";

const ProductDetail = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const { cart, addToCart, removeFromCart } = useCart();

	useEffect(() => {
		setLoading(true);
		setError(false);

		fetch(`http://localhost:3000/products/${id}`)
			.then((res) => res.json())
			.then((data) => {
				if (data && data.product_id) {
					setProduct(data);
				} else {
					setError(true);
				}
			})
			.catch((err) => {
				console.error("Errore nel recupero del prodotto:", err);
				setError(true);
			})
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <div>Caricamento in corso...</div>;
	if (error || !product)
		return (
			<div
				className="d-flex justify-content-center align-items-center text-center mt-4"
				style={{ fontSize: "50px", color: "fuchsia" }}
			>
				Prodotto non trovato!
			</div>
		);

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
					<h2>
						{product.brand} - {product.name}
					</h2>
					<p>{product.description}</p>
					<p className="product-card-price card-text d-flex">
						<span
							className={`me-2  ${
								product.discount_percent ? "discounted" : ""
							} text-white`}
						>
							€{product.price}
						</span>
						{product.discount_percent ? (
							<div>
								<span>discounted -{product.discount_percent}%</span>
								<span className="disc-applied-price">
									{" "}
									€
									{product.price -
										((product.price / 100) * product.discount_percent).toFixed(
											2
										)}
								</span>
							</div>
						) : (
							""
						)}
					</p>
					<p></p>
				</div>

				<div className="product-summary-col">
					<CartSummary className="cart-summary-card" data={product} />
				</div>
			</div>

			{/* Summary */}
			<div className="container">
				<div className="row">
					<div className="col-12">
						<RelatedProducts
							excludeSlug={product.slug}
							title={"Potrebbero interessarti dalla stessa categoria"}
							category={product.category_name}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
