import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "../styles/ProductSection.css";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:3000";

const ProductSection = ({ title, filter, category, excludeSlug }) => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

	// Deduplica per product_id se presente, altrimenti per slug
	const uniqueProducts = (arr) => {
		const seen = new Set();
		return arr.filter((p) => {
			const key = p.product_id ?? p.slug;
			if (!key) return false; // scarta se non ha identificativo
			if (seen.has(key)) return false;
			seen.add(key);
			return true;
		});
	};

	useEffect(() => {
		let ignore = false;

		const fetchProducts = async () => {
			setLoading(true);
			setError(null);

			try {
				const qs = new URLSearchParams();
				if (filter) qs.set("sort", filter);
				if (category) qs.set("cat", category);

				const res = await fetch(`${API_BASE}/products?${qs.toString()}&rpp=8`);
				if (!res.ok) throw new Error("Errore dal server");

				const { results = [] } = await res.json();

				if (!ignore) {
					// 1) Escludi lo slug del featured (se fornito)
					let list = results.filter((p) => {
						if (excludeSlug) return p.slug !== excludeSlug;
						return true;
					});

					// 2) Rimuovi eventuali duplicati (product_id o slug)
					list = uniqueProducts(list);

					// 3) Mischia e prendi fino a 6
					list = shuffleArray(list).slice(0, 6);

					setProducts(list);
				}
			} catch {
				if (!ignore) setError("Impossibile caricare i prodotti");
			} finally {
				if (!ignore) setLoading(false);
			}
		};

		fetchProducts();
		return () => {
			ignore = true;
		};
	}, [filter, category, excludeSlug]);

	return (
		<div className="ps-section">
			<h2 className="ps-title">{title}</h2>
			{loading && <div>Loading...</div>}
			{error && <div className="error">{error}</div>}

			{!loading && !error && (
				<div className="ps-grid">
					{products.map((p) => (
						<div key={p.product_id ?? p.slug} className="ps-grid-item">
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
