import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-body">
    <div className="container-fluid">
      <a className="navbar-brand navbar-title" href="/">Home</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item"><a className="nav-link" href="/products">Products</a></li>
          <li className="nav-item"><a className="nav-link" href="/cart">Cart</a></li>
        </ul>
        <form className="d-flex navbar-search-form" role="search">
          <input className="form-control me-2" type="search" placeholder="Search Product" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
);

export default Navbar;
