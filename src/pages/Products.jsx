import React, { useEffect, useState } from "react";
import "../styles/Products.css";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal, faListUl } from "@fortawesome/free-solid-svg-icons";

function Products() {
	const [categories, setCategories] = useState([]);
	const [products, setProducts] = useState([]);
	const [totalResults, setTotalResults] = useState(0);
	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [showCard, setShowCard] = useState(false);

	const baseUrl = "http://localhost:3000";

	// --- Form state (user modifies freely) ---
	const [formValues, setFormValues] = useState({
		search: "",
		sort: "all",
		category: "",
		order: "price_DESC",
		rpp: 4,
	});

	// --- Active filters (used for fetch) ---
	const [filters, setFilters] = useState(formValues);

	// --- Fetch categories once ---
	useEffect(() => {
		fetch(`${baseUrl}/categories`)
			.then((r) => r.json())
			.then(setCategories)
			.catch(console.error);
	}, []);

	// --- Fetch products only when filters or page change ---
	useEffect(() => {
		const qs = new URLSearchParams(filters).toString();
		const url = `${baseUrl}/products?${qs}&page=${currentPage}`;
		console.log("📡 Fetching:", url);

		fetch(url)
			.then((r) => r.json())
			.then((data) => {
				setProducts(data.results || []);
				setTotalPages(data.pages || 1);
				setTotalResults(data.resultCount || 0);
			})
			.catch(console.error);
	}, [filters, currentPage]);

	// --- Handle form field change ---
	const handleChange = (key, value) => {
		setFormValues((prev) => ({ ...prev, [key]: value }));
	};

	// --- On submit, update active filters ---
	const handleSubmit = (e) => {
		e.preventDefault();
		setCurrentPage(1);
		setFilters(formValues);
	};

	return (
		<div id="products" className="container-fluid hn-main">
			{/* === SEARCH FORM === */}
			<div className="row justify-content-center">
				<div className="col-12 col-lg-10 col-xl-8">
					<form
						role="search"
						className="row gy-3 align-items-center justify-content-center hn-searchbar"
						onSubmit={handleSubmit}
					>
						{/* Search input */}
						<div className="col-12 col-md-6 col-lg-4">
							<div className="input-group shadow-sm">
								<input
									type="text"
									className="form-control hn-input"
									placeholder="🔍 Find your products..."
									value={formValues.search}
									onChange={(e) => handleChange("search", e.target.value)}
								/>
							</div>
						</div>

						{/* Sort selector */}
						<div className="col-6 col-md-4 col-lg-2">
							<select
								className="form-select hn-select"
								value={formValues.sort}
								onChange={(e) => {
									const v = e.target.value;
									handleChange("sort", v);
									if (v !== "category") handleChange("category", "");
									else if (categories.length) handleChange("category", categories[0].name);
								}}
							>
								<option value="all">All products</option>
								<option value="category">Category</option>
								<option value="latest">Latest arrivals</option>
								<option value="popular">Best sellers</option>
							</select>
						</div>

						{/* Category selector */}
						{formValues.sort === "category" && (
							<div className="col-6 col-md-4 col-lg-2">
								<select
									className="form-select hn-select"
									value={formValues.category}
									onChange={(e) => handleChange("category", e.target.value)}
								>
									{categories.length === 0 ? (
										<option>Loading...</option>
									) : (
										categories.map((cat, i) => (
											<option key={i} value={cat.name}>
												{cat.name}
											</option>
										))
									)}
								</select>
							</div>
						)}

						{/* Order selector */}
						<div className="col-6 col-md-4 col-lg-2">
							<select
								className="form-select hn-select"
								value={formValues.order}
								onChange={(e) => handleChange("order", e.target.value)}
							>
								<option value="price_ASC">Price ↑</option>
								<option value="price_DESC">Price ↓</option>
							</select>
						</div>

						{/* Results per page */}
						<div className="col-6 col-md-4 col-lg-2">
							<select
								className="form-select hn-select"
								value={formValues.rpp}
								onChange={(e) => handleChange("rpp", Number(e.target.value))}
							>
								<option value={4}>4 items</option>
								<option value={8}>8 items</option>
								<option value={16}>16 items</option>
							</select>
						</div>

						{/* --- Search button --- */}
						<div className="col-12 text-center">
							<button type="submit" className="btn hn-search-btn mt-2">
								Search
							</button>
						</div>
					</form>
				</div>
			</div>

			{/* === RESULTS + TOGGLE ROW (always visible) === */}
			<div className="row mt-4 mb-2">
				<div className="col-12 d-flex align-items-center justify-content-between results-row">
					<div className="flex-grow-1 text-center text-white fw-bold">
						{totalResults} result{totalResults !== 1 ? "s" : ""}, {totalPages} page
						{totalPages !== 1 ? "s" : ""}
					</div>
					<button
						type="button"
						aria-label="Toggle view"
						className="btn hn-toggle-btn ms-auto"
						onClick={() => setShowCard((v) => !v)}
						title="Toggle view"
					>
						<FontAwesomeIcon icon={showCard ? faGripHorizontal : faListUl} />
					</button>
				</div>
			</div>

			{/* === PRODUCT LIST === */}
			<div className="row">
				<div className="col-12 ps-section mt-2 mb-5">
					<div className="row justify-content-start g-3">
						{products.length ? (
							products.map((p) =>
								showCard ? (
									<ProductList key={p.id} product={p} />
								) : (
									<div key={p.id} className="col-12 col-md-6 col-lg-3">
										<ProductCard product={p} />
									</div>
								)
							)
						) : (
							<h3 className="text-white text-center">Nessun Risultato Trovato</h3>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Products;


