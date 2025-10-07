import React from "react";
import "../styles/Navbar.css";
import nerdNestLogo from "../assets/imgs/nerdNest-logo.png";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-body">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">
        <img src={nerdNestLogo} alt="NerdNest Logo" className="navbar-logo" />
        <span className="brand-text desktop">.nerdNest</span>
        <span className="brand-text mobile">.n</span>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link" href="/products">
              Products
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/cart">
              Cart
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
