// src/components/Hero.jsx
import { Link } from "react-router-dom";
import "../styles/Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Hero({
  title = "Benvenuto",
  subtitle = "Find your next gadget",
  subtitle2 = " Cerca un prodotto",
  cta = "Scopri",
}) {
  return (
    <section id="hero" role="region" aria-label="Hero">
      <div className="p-5 container-fluid hero-container">
        <h1 className="text-center">.nerdNest</h1>
        <h3 className="text-center my-3">Your refuge for all things tech.</h3>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/products" className="btn">
            {subtitle}
          </Link>
        </div>
      </div>
    </section>
  );
}
