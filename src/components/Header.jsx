import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <nav
        className="navbar bg-dark border-bottom border-body p-0"
        data-bs-theme="dark"
      >
        <div className="container-fluid justify-space-evenly">
          <Link to="/" className="navbar-brand">
            <img className="booroad-logo" src="/booroad.png" alt="BooRoad" />
            <span className="first-part-title">.nerd</span>
            <span>Nest</span>
          </Link>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Cerca Prodotto"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Cerca
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
};

export default Header;
