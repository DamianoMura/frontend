import React from "react";
import "../styles/DefaultLayout.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

/**
 * DefaultLayout
 * - Wraps pages with Navbar and Footer
 * - Ensures footer stays at the bottom using flex layout
 */
const DefaultLayout = () => {
	return (
		<div className="default-layout">
			<Navbar />
			<main className="default-main bg-violet">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default DefaultLayout;
