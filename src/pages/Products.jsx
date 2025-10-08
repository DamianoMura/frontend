import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import ProductList from "../components/ProductList";

function Products() {
	const [products, setProducts] = useState([]);
	const [onClick, setOnClick] = useState(false);
	const [filterProduct, setFilterProduct] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetch("http://localhost:3000/products")
			.then((res) => res.json())
			.then((data) => setProducts(data))
			.catch((err) => console.error(err));
	}, []);

	useEffect(() => {
		const filterProduct = products.filter((product) =>
			product.name.toLowerCase().includes(search.toLowerCase())
		);
		setFilterProduct(filterProduct);
	}, [search, products]);

	const [showCard, setShowCard] = useState(false);

	const handleToggle = () => {
		setShowCard((prev) => !prev);
	};

	if (products.length === 0) {
		return <div className="container loading">Loading...</div>;
	}

	return (
		<div id="products" className="container-fluid hn-main">
			<div className="row justify-content-center d-flex hn-sections-container">
				<div className="col-5 my-4 ">
					<form className="d-flex" role="search">
						<input
							type="text"
							className="form-control"
							placeholder="Find your products"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<button className="btn btn-outline-success ms-2" type="submit">
							Search
						</button>
					</form>
				</div>

				<div className="col-3 my-4 text-white text-center ">
					<button className="btn" onClick={handleToggle}>
						<FontAwesomeIcon icon={faGripHorizontal} />
					</button>
				</div>
			</div>

			<div className="row">
				<div className="col-12 ps-section my-5">
					<div>
						<div
							className={`row justify-content-start ${
								showCard ? "g-3" : "g-3"
							}`}
						>
							{filterProduct.map((product) =>
								showCard ? (
									<ProductCard product={product} />
								) : (
									<ProductList product={product} />
								)
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Products;
