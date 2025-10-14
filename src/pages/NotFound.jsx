import { Link } from "react-router-dom";
import mascotte from "../assets/imgs/mascotte.webp";
import "../styles/NotFound.css";
function NotFound() {
  return (
    <div className="notfound-container">
      <div className="col-7 mascotte-404 d-flex justify-content-center">
        <img src={mascotte} alt="Mascotte 404" />
      </div>
      <h1 className="notfound-title">404 - Page not found</h1>
      <p className="notfound-text">
        We're sorry, but we couldn't find any page
      </p>
      <Link to="/" className="text-decoration-none">
        <button className="notfound-button">
          <i className="fa-regular fa-house"></i>
          Back to Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
