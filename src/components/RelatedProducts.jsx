import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductSection.css";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:3000";

const ProductSection = ({ title, filter, category }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const qs = new URLSearchParams();
				if (filter) qs.set("sort", filter);
				if (category) qs.set("cat", category);

				const res = await fetch(`${API_BASE}/products?${qs.toString()}`);
				const data = await res.json();
				setProducts(data.results || []);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, [filter, category]);

	return (
		<div className="ps-section">
			<h2 className="ps-title">{title}</h2>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="ps-grid">
					{products.slice(0, 3).map((p) => (
						<div key={p.product_id} className="ps-grid-item">
							<ProductCard product={p} />
						</div>
					))}
				</div>
			)}
			<Link
				className="btn mt-5"
				to={`/products?sort=${filter}${category ? `&cat=${category}` : ""}`}
			>
				Lista completa
			</Link>
		</div>
	);
};

export default ProductSection;
