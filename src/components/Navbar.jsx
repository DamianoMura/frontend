import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";
import nerdNestLogo from "../assets/imgs/nerdNest-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();

  // Calcola il numero totale di prodotti (inclusi i duplicati)
  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <nav className="navbar navbar-dark bg-dark border-body custom-navbar">
      <div className="container-fluid custom-navbar-container">
        <NavLink className="navbar-brand" to="/">
          <img src={nerdNestLogo} alt="NerdNest Logo" className="navbar-logo" />
          <span className="brand-text desktop">.nerdNest</span>
          <span className="brand-text mobile">.n</span>
        </NavLink>

        <ul className="navbar-nav custom-navbar-nav">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                "nav-link" + (isActive ? " nav-active fw-bold" : " fw-semibold")
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
                `nav-link nav-cart-icon position-relative${
                  isActive ? " nav-active fw-bold" : " fw-semibold"
                }`
              }
              to="/cart"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;




