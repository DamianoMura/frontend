import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import nerdNestLogo from "../assets/imgs/nerdNest-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-body">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">
        <img src={nerdNestLogo} alt="NerdNest Logo" className="navbar-logo" />
        <span className="brand-text desktop">.nerdNest</span>
        <span className="brand-text mobile">.n</span>
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link" +
                (isActive ? " nav-active fw-bold" : " fw-semibold")
              }
              to="/"
              end
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " nav-active fw-bold" : "")
              }
              to="/products"
            >
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " nav-active fw-bold" : "")
              }
              to="/cart"
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
