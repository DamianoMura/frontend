import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductSection.css";
import { Link } from "react-router-dom";
const API_BASE = "http://localhost:3000";

const getMaxItems = (width) => {
	if (width >= 1200) return 9;
	return 8;
};

const ProductSection = ({ title, filter }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${API_BASE}/products?sort=${filter}&rpp=8`);
				const data = await res.json();
				setProducts(data.results);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, [filter]);

	return (
		<div className="ps-section">
			<h2 className="ps-title">{title}</h2>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className="ps-grid">
					{products.slice(0, 6).map((p) => (
						<div key={p.product_id} className="ps-grid-item">
							<ProductCard product={p} />
						</div>
					))}
				</div>
			)}
			<Link className="btn mt-5" to={`/products?sort=${filter}`}>
				Lista completa
			</Link>
		</div>
	);
};

export default ProductSection;
