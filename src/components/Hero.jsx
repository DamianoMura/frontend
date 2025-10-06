// src/components/Hero.jsx
import { Link } from "react-router-dom";
import "../styles/Hero.css";

export default function Hero({
	title = "Benvenuto",
	subtitle = "Scopri i nostri prodotti",
	cta = "Scopri",
}) {
	return (
		<section id="hero" role="region" aria-label="Hero">
			<div className="p-5 container-fluid hero-container">
				<h1 className="text-center">.nerdNest</h1>
				<h3 className="text-center my-3">
					Il tuo rifugio per ogni innovazione
				</h3>
				<div className="d-flex justify-content-center">
					<Link to="/products" className="btn">
						{subtitle}
					</Link>
				</div>
			</div>
		</section>
	);
}
