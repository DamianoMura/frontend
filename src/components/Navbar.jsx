import React from "react";
import "../styles/Navbar.css";
import nerdNestLogo from "../assets/imgs/nerdNest-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-body">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">
        <img src={nerdNestLogo} alt="NerdNest Logo" className="navbar-logo" />
        <span className="brand-text desktop">.nerdNest</span>
        <span className="brand-text mobile">.n</span>
      </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link fw-semibold" href="/">
              Home
            </a>
          </li>
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
