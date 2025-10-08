import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";

function Products() {
	const [products, setProducts] = useState([]);
	const [onClick, setOnClick] = useState(false);
	const [filterProduct, setFilterProduct] = useState([]);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("");
	const baseUrl = "http://localhost:3000/products";

	// paginazione
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 8;
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filterProduct.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	const totalPages = Math.ceil(filterProduct.length / productsPerPage);

	const navigate = useNavigate();
	const location = useLocation();

	// Leggi i parametri dalla URL al primo caricamento
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const searchParam = params.get("search") || "";
		const sortParam = params.get("sort") || "";
		setSearch(searchParam);
		setSort(sortParam);
	}, [location.search]);

	// switch componente card
	const [showCard, setShowCard] = useState(false);

	const handleToggle = () => {
		setShowCard((prev) => !prev);
	};

	// Fetch iniziale
	useEffect(() => {
		fetch(baseUrl)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
				setFilterProduct(data);
			})
			.catch((err) => console.error(err));
	}, []);

	// Filtro + ordinamento + aggiornamento URL
	useEffect(() => {
		let filtered = products.filter((product) =>
			product.name.toLowerCase().includes(search.toLowerCase())
		);

		if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
		else if (sort === "price") filtered.sort((a, b) => a.price - b.price);
		else if (sort === "price_desc") filtered.sort((a, b) => b.price - a.price);
		else if (sort === "category_name")
			filtered.sort((a, b) => a.category_name.localeCompare(b.category_name));
		else if (sort === "latest_arrivals")
			filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		else if (sort === "best_seller") filtered.sort((a, b) => b.sold - a.sold);

		setFilterProduct(filtered);

		// Aggiorna la URL senza ricaricare la pagina
		const params = new URLSearchParams();
		if (search) params.set("search", search);
		if (sort) params.set("sort", sort);
		navigate({ search: params.toString() }, { replace: true });
	}, [search, sort, products, navigate]);

	if (products.length === 0) {
		return <div className="container loading">Loading...</div>;
	}

	return (
		<div id="products" className="container-fluid hn-main">
			<div className="row justify-content-center d-flex hn-sections-container">
				<form
					className="d-flex"
					role="search"
					onSubmit={(e) => e.preventDefault()}
				>
					<div className="col-4 m-2">
						<input
							type="text"
							className="form-control"
							placeholder="Find your products"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<div className="col-4 m-2">
						<select
							className="form-select mb-2"
							value={sort}
							onChange={(e) => setSort(e.target.value)}
						>
							<option value="">Sort by...</option>
							<option value="name">Name</option>
							<option value="price">Price: lower</option>
							<option value="price_desc">Price: higher</option>
							<option value="category_name">Category</option>
							<option value="latest_arrivals">Latest arrivals</option>
							<option value="best_seller">Best seller</option>
						</select>
					</div>
					<div className="col-3 m-2 text-white text-center">
						<button type="button" className="btn" onClick={handleToggle}>
							<FontAwesomeIcon icon={faGripHorizontal} />
						</button>
					</div>
				</form>
			</div>

			<div className="row">
				<div className="col-12 ps-section my-5">
					<div
						className={`row justify-content-start ${showCard ? "g-3" : "g-3"}`}
					>
						{currentProducts.map((product) =>
							showCard ? (
								<ProductList product={product} />
							) : (
								<div className="col-12 col-md-6 col-lg-3">
									<ProductCard product={product} />
								</div>
							)
						)}
					</div>
				</div>
				{/* paginazione */}
				<div className="d-flex justify-content-center align-items-center mt-4 gap-3">
					<button
						className="btn"
						onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
					>
						← Prev
					</button>

					<span className="fw-bold text-white">
						Pagina {currentPage} di {totalPages}
					</span>

					<button
						className="btn"
						onClick={() =>
							setCurrentPage((prev) => Math.min(prev + 1, totalPages))
						}
						disabled={currentPage === totalPages}
					>
						Next →
					</button>
				</div>
			</div>
		</div>
	);
}

export default Products;
