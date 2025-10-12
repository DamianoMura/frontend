import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal, faListUl } from "@fortawesome/free-solid-svg-icons";

function Products() {
	const navigate = useNavigate();
	const location = useLocation();
	const skipUrlSync = useRef(true);

	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("all");
	const [category, setCategory] = useState("");
	const [orderAD, setOrderAD] = useState("price_DESC");
	const [productsPerPage, setProductsPerPage] = useState(4);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalResults, setTotalResults] = useState(0);
	const [showCard, setShowCard] = useState(false);

	const baseUrl = "http://localhost:3000";

	useEffect(() => {
		const qp = new URLSearchParams(location.search);
		setSort(qp.get("sort") || "all");
		setSearch(qp.get("search") || "");
		setCategory(qp.get("cat") || "");
		setOrderAD(qp.get("order") || "price_DESC");
		setProductsPerPage(Number(qp.get("rpp")) || 4);
		setCurrentPage(Number(qp.get("page")) || 1);
	}, []);

	useEffect(() => {
		const qs = new URLSearchParams();
		if (search) qs.set("search", search);
		if (sort && sort !== "all") qs.set("sort", sort);
		if (category) qs.set("cat", category);
		if (orderAD) qs.set("order", orderAD);
		if (productsPerPage) qs.set("rpp", productsPerPage);
		if (currentPage) qs.set("page", currentPage);

		const url = `${baseUrl}/products?${qs.toString()}`;
		console.log("🔍 Fetching", url);

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.results || []);
				setTotalPages(data.pages || 1);
				setTotalResults(data.resultCount || 0);
			})
			.catch(console.error);
	}, [search, sort, category, orderAD, productsPerPage, currentPage]);

	useEffect(() => {
		if (skipUrlSync.current) {
			skipUrlSync.current = false;
			return;
		}
		const qs = new URLSearchParams();
		if (search) qs.set("search", search);
		if (sort && sort !== "all") qs.set("sort", sort);
		if (category) qs.set("cat", category);
		if (orderAD) qs.set("order", orderAD);
		if (productsPerPage) qs.set("rpp", productsPerPage);
		if (currentPage) qs.set("page", currentPage);

		navigate({ search: qs.toString() }, { replace: true });
	}, [
		search,
		sort,
		category,
		orderAD,
		productsPerPage,
		currentPage,
		navigate,
	]);

	useEffect(() => {
		fetch(`${baseUrl}/categories`)
			.then((r) => r.json())
			.then(setCategories)
			.catch(console.error);
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [search, sort, category, orderAD, productsPerPage]);

	return (
		<div id="products" className="container-fluid hn-main">
			{/* --- SEARCH BAR CENTRATA E PIÙ STRETTA --- */}
			<div className="row justify-content-center">
				<div className="col-12 col-lg-10 col-xl-8">
					<form
						role="search"
						className="row gy-3 align-items-center justify-content-center hn-searchbar"
						onSubmit={(e) => e.preventDefault()}
					>
						{/* Barra di ricerca */}
						<div className="col-12 col-md-6 col-lg-4">
							<div className="input-group shadow-sm">
								<input
									type="text"
									className="form-control hn-input"
									placeholder="🔍 Find your products..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>
						</div>

						{/* Sort selector */}
						<div className="col-6 col-md-4 col-lg-2">
							<select
								className="form-select hn-select"
								value={sort}
								onChange={(e) => {
									const v = e.target.value;
									setSort(v);
									if (v !== "category") setCategory("");
									else if (categories.length) setCategory(categories[0].name);
								}}
							>
								<option value="all">All products</option>
								<option value="category">Category</option>
								<option value="latest">Latest arrivals</option>
								<option value="popular">Best sellers</option>
							</select>
						</div>

						{/* Category selector */}
						{sort === "category" && (
							<div className="col-6 col-md-4 col-lg-2">
								<select
									className="form-select hn-select"
									value={category}
									onChange={(e) => setCategory(e.target.value)}
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
								value={orderAD}
								onChange={(e) => setOrderAD(e.target.value)}
							>
								<option value="price_ASC">Price ↑</option>
								<option value="price_DESC">Price ↓</option>
							</select>
						</div>

						{/* Results per page */}
						<div className="col-6 col-md-4 col-lg-2">
							<select
								className="form-select hn-select"
								value={productsPerPage}
								onChange={(e) => {
									const v = e.target.value;
									setProductsPerPage(v === "All" ? totalResults : Number(v));
								}}
							>
								<option value="All">All</option>
								<option value={4}>4 items</option>
								<option value={8}>8 items</option>
								{totalResults > 16 && <option value={16}>16 items</option>}
								{totalResults > 32 && <option value={32}>32 items</option>}
							</select>
						</div>
					</form>
				</div>
			</div>

			{/* --- Fascia risultati (testo centrato + toggle destra) --- */}
			{totalResults > 0 && (
				<div className="row mt-4 mb-2">
					<div className="col-12 d-flex align-items-center justify-content-between results-row">
						<div className="flex-grow-1 text-center text-white fw-bold">
							{totalResults} result{totalResults > 1 ? "s" : ""}, {totalPages} page{totalPages > 1 ? "s" : ""}
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
			)}

			{/* --- Lista prodotti --- */}
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

				{/* --- Pagination --- */}
				{totalPages > 1 && (
					<div className="col-12 d-flex justify-content-center align-items-center mt-4 gap-3">
						<button
							className="btn"
							onClick={(e) => {
								e.preventDefault();
								setCurrentPage((p) => Math.max(p - 1, 1));
							}}
							disabled={currentPage === 1}
						>
							← Prev
						</button>
						<span className="fw-bold text-white">
							{currentPage}/{totalPages}
						</span>
						<button
							className="btn"
							onClick={(e) => {
								e.preventDefault();
								setCurrentPage((p) => Math.min(p + 1, totalPages));
							}}
							disabled={currentPage === totalPages}
						>
							Next →
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default Products;



