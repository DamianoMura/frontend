import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal, faListUl } from "@fortawesome/free-solid-svg-icons";

function Products() {
	const navigate = useNavigate();
	const location = useLocation();

	// Stati per prodotti e categorie
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);

	// Filtri e controlli
	const [search, setSearch] = useState("");
	const [searchParam, setSearchParam] = useState("");
	const [sort, setSort] = useState("all");
	const [category, setCategory] = useState("");
	const [orderAD, setOrderAD] = useState("price_DESC");
	const [productsPerPage, setProductsPerPage] = useState(4);

	// Paginazione
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalResults, setTotalResults] = useState(0);

	// Layout toggle e inizializzazione
	const [showCard, setShowCard] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);

	const baseUrl = "http://localhost:3000";

	const handleToggle = () => {
		setShowCard((prev) => !prev);
	};

	// 1) Leggi parametri da URL e imposta stati iniziali
	useEffect(() => {
		const params = new URLSearchParams(location.search);

		setSort(params.get("sort") || "all");
		setSearchParam(params.get("search") || "");
		setCategory(params.get("cat") || "");
		setOrderAD(params.get("order") || "price_DESC");
		setProductsPerPage(Number(params.get("rpp")) || 4);
		setCurrentPage(Number(params.get("page")) || 1);

		setIsInitialized(true);
	}, []);

	// 2) Sincronizza URL con stati dopo inizializzazione
	useEffect(() => {
		if (!isInitialized) return;

		const newParams = new URLSearchParams();
		if (searchParam) newParams.set("search", searchParam);
		if (sort && sort !== "all") newParams.set("sort", sort);
		if (category) newParams.set("cat", category);
		if (orderAD) newParams.set("order", orderAD);
		if (productsPerPage) newParams.set("rpp", productsPerPage);
		if (currentPage) newParams.set("page", currentPage);

		navigate({ search: newParams.toString() }, { replace: true });
	}, [
		searchParam,
		sort,
		category,
		orderAD,
		productsPerPage,
		currentPage,
		isInitialized,
		navigate,
	]);

	// 3) Fetch prodotti quando cambia la query string
	useEffect(() => {
		const url = `${baseUrl}/products${location.search}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.results);
				setTotalPages(data.pages);
				setTotalResults(data.resultCount);
			})
			.catch((err) => console.error(err));
	}, [location.search]);

	// 4) Fetch categorie una sola volta
	useEffect(() => {
		fetch(`${baseUrl}/categories`)
			.then((res) => res.json())
			.then((data) => setCategories(data))
			.catch((err) => console.error(err));
	}, []);

	// 5) Reset pagina quando cambiano filtri (non totalPages)
	useEffect(() => {
		if (!isInitialized) return;
		setCurrentPage(1);
	}, [searchParam, sort, category, orderAD, productsPerPage]);

	return (
		<div id="products" className="container-fluid hn-main">
			{/* Barra filtri e ricerca */}
			<div className="row justify-content-center hn-sections-container">
				<form role="search" className="row g-1">
					<div className="col-12 d-flex">
						<input
							type="text"
							className="form-control me-2 text-black"
							placeholder="Find your products"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button
							className="btn"
							onClick={(e) => {
								e.preventDefault();
								setSearchParam(search);
							}}
						>
							Search
						</button>
					</div>

					<div className="col-4 col-lg-2 d-flex">
						<select
							className="form-select mb-2"
							value={sort}
							onChange={(e) => {
								const val = e.target.value;
								setSort(val);
								if (val !== "category") {
									setCategory("");
								} else if (categories.length) {
									setCategory(categories[0].name);
								}
							}}
						>
							<option value="all">All products</option>
							<option value="category">Category:</option>
							<option value="latest">Latest arrivals</option>
							<option value="popular">Best seller</option>
						</select>
					</div>

					{sort === "category" && (
						<div className="col-4 col-md-4 col-lg-2 d-flex">
							<select
								className="form-select mb-2"
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

					<div className="col-4 col-lg-2 d-flex">
						<select
							className="form-select"
							value={orderAD}
							onChange={(e) => setOrderAD(e.target.value)}
						>
							<option value="price_ASC">PRICE ASC</option>
							<option value="price_DESC">PRICE DESC</option>
						</select>
					</div>

					<div className="col-6 col-lg-2 d-flex">
						<select
							className="form-select"
							value={productsPerPage}
							onChange={(e) => {
								const val = e.target.value;
								setProductsPerPage(val === "All" ? totalResults : Number(val));
							}}
						>
							<option value="All">All</option>
							<option value={4}>4 items</option>
							<option value={8}>8 items</option>
							{totalResults > 16 && <option value={16}>16 items</option>}
							{totalResults > 32 && <option value={32}>32 items</option>}
						</select>
					</div>

					<div className="col-6 d-flex flex-row-reverse">
						<button type="button" className="btn" onClick={handleToggle}>
							<FontAwesomeIcon icon={showCard ? faGripHorizontal : faListUl} />
						</button>
					</div>
				</form>
			</div>

			{/* Risultati */}
			<div className="row">
				{totalResults > 0 && (
					<div className="col-12 text-white fw-bold text-center">
						<span>
							{totalResults > 1
								? `${totalResults} results found`
								: `${totalResults} result found`}
							{totalPages > 1 && `, ${totalPages} pages`}
						</span>
					</div>
				)}

				<div className="col-12 ps-section my-5">
					<div className="row justify-content-start g-3">
						{products.length > 0 ? (
							products.map((product) =>
								showCard ? (
									<ProductList key={product.id} product={product} />
								) : (
									<div key={product.id} className="col-12 col-md-6 col-lg-3">
										<ProductCard product={product} />
									</div>
								)
							)
						) : (
							<h3 className="text-white text-center">
								Nessun Risultato Trovato
							</h3>
						)}
					</div>
				</div>

				{/* Navigazione pagine */}
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
