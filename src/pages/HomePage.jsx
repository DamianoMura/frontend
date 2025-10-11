import React from "react";
import "../styles/HomePage.css";
import ProductSection from "../components/ProductSection";
import Hero from "../components/Hero";

const HomePage = () => {
	return (
		<>
			<Hero />
			<main className="hn-main">
				{/* Hero Section */}

				{/* Sections side by side */}
				<section className="hn-sections-container">
					<div className="hn-section-column">
						<ProductSection
							title="Latest Arrivals"
							filter="latest"
						/>
					</div>
					<div className="hn-section-column">
						<ProductSection
							title="Best Sellers"
							filter="popular"
						/>
					</div>
				</section>
			</main>
		</>
	);
};

export default HomePage;
