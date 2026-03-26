import  { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal, faListUl } from "@fortawesome/free-solid-svg-icons";
import API_BASE from "../config";

function Products() {
	const navigate = useNavigate();
	const location = useLocation();

	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("all");
	const [category, setCategory] = useState("");
	const [orderAD, setOrderAD] = useState("");
	const [productsPerPage, setProductsPerPage] = useState("");
	const [currentPage, setCurrentPage] = useState("");
	const [totalPages, setTotalPages] = useState("");//state 12
	const [totalResults, setTotalResults] = useState(0);//state 13
	const [showCard, setShowCard] = useState(false);//state 14
	

	const baseUrl = API_BASE;

	// we make a db call with location.search as string query
	useEffect(()=>{
		fetch(`${baseUrl}/products${location.search}`)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.results);
				setTotalPages(data.pages);
				setTotalResults(data.resultCount);
				setProductsPerPage(data.rpp)
				setCurrentPage(data.page)
			})
			.catch(console.error);
	},[location.search])
	//updating location.search based on state variables
	useEffect(()=>{
		const qS = new URLSearchParams();
			if (search) qS.set("search", search);
			if (sort && sort !== "all") qS.set("sort", sort);
			if (category) qS.set("cat", category);
			if (orderAD) qS.set("order", orderAD);
			if (productsPerPage) qS.set("rpp", productsPerPage);
			if (currentPage) qS.set("page", currentPage);
			navigate({ search: qS.toString() }, { replace: true });
	},[currentPage, productsPerPage, sort, orderAD, category, search])
	//checking when location.search changes
	useEffect(()=>{
		const qS = new URLSearchParams(location.search);
		if(qS.get("page")!="") setCurrentPage(qS.get("page"))
		if(qS.get("rpp")!="") setProductsPerPage(qS.get("rpp"))
		if(qS.get("sort")!="") setSort(qS.get("sort"))
		if(qS.get("search")!="") setSearch(qS.get("search"))
		if(qS.get("order")!="") setOrderAD(qS.get("order"))   
		if(qS.get("cat")!="") setCategory(qS.get("cat"))   
			navigate({ search: qS.toString() }, { replace: true });
	},[location.search])
	
	useEffect(() => {
		//set categories
		fetch(`${baseUrl}/categories`)
			.then((r) => r.json())
			.then(setCategories)
			.catch(console.error);
		//set default variables
		setCurrentPage(1);
		setProductsPerPage(8);
	}, []);



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
									onChange={(e) => {
										setSearch(e.target.value)}}
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
									setCurrentPage(1);
									setSort(v);
										if (v !== "category") setCategory("");
									  else setCategory(categories[0].name);
								}}
							>
								<option value="all">All products</option>
								<option value="category">Category</option>
								<option value="latest">Latest arrivals</option>
								<option value="popular">Best sellers</option>
								<option value="discounted">On Sale!</option>
							</select>
						</div>

						{/* Category selector */}
						{sort === "category" && (
							<div className="col-6 col-md-4 col-lg-2">
								<select
									className="form-select hn-select"
									value={category}
									onChange={(e) => {
										setCategory(e.target.value)
										setCurrentPage(1);}}
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
								onChange={(e) => {
									setOrderAD(e.target.value)
									setCurrentPage(1);}}
							>
								<option value="">Price filter</option>
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
									setCurrentPage(1);
									const v = e.target.value;
									setProductsPerPage(v === "All" ? totalResults : Number(v));
								}}
							>
								
								{totalResults > 4 && <option value={4}>4 items</option>}
								{totalResults > 8 && <option value={8}>8 items</option>}
								{totalResults > 12 && <option value={12}>12 items</option>}
								{totalResults > 16 && <option value={16}>16 items</option>}
								{totalResults > 20 && <option value={20}>20 items</option>}
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



