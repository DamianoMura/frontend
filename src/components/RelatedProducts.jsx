import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductSection.css";
import { Link } from "react-router-dom";

// Definita direttamente qui, come avevi fatto tu
const API_BASE = "http://localhost:3000";

const ProductSection = ({ title, filter, category, excludeId }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Mischia array per selezione casuale
	const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

	useEffect(() => {
		let ignore = false;

		const fetchProducts = async () => {
			setLoading(true);
			setError(null);

			try {
				const qs = new URLSearchParams();
				if (filter) qs.set("sort", filter);
				if (category) qs.set("cat", category);

				const res = await fetch(`${API_BASE}/products?${qs.toString()}`);
				if (!res.ok) throw new Error("Errore nella risposta dal server");

				const data = await res.json();

				if (!ignore) {
					// Escludi il prodotto in primo piano
					let filtered = (data.results || []).filter(
						(p) => p.product_id !== excludeId
					);

					// Mischia e prendi 3 random
					filtered = shuffleArray(filtered).slice(0, 3);

					setProducts(filtered);
				}
			} catch (err) {
				if (!ignore) setError("Impossibile caricare i prodotti");
			} finally {
				if (!ignore) setLoading(false);
			}
		};

		fetchProducts();
		return () => {
			ignore = true;
		};
	}, [filter, category, excludeId]);

	return (
		<div className="ps-section">
			<h2 className="ps-title">{title}</h2>

			{loading && <div>Loading...</div>}
			{error && <div className="error">{error}</div>}

			{!loading && !error && (
				<div className="ps-grid">
					{products.map((p) => (
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
