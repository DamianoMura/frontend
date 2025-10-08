import React from "react";
import "../styles/Footer.css";

const Footer = () => (
  <footer className="footer bg-dark text-light pt-4 pb-2 ">
    <div className="container">
      <div className="row">
        {/* Brand: tutto a sinistra */}
        <div className="col-12 col-md-5 mb-3 text-start d-flex flex-column justify-content-center">
          <h5 className="footer-title">.nerdNest</h5>
          <p className="footer-text">
            Tech, innovation and comfort for your setup.
          </p>
        </div>
        {/* Navigation + Contact: tutto a destra */}
        <div className="col-12 col-md-7 mb-3 d-flex flex-column flex-md-row justify-content-md-end align-items-start">
          <div className="footer-nav-col me-md-5">
            <h6 className="footer-nav-title">Navigation</h6>
            <ul className="footer-nav-list list-unstyled">
              <li>
                <a href="/" className="footer-nav-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="footer-nav-link">
                  Products
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-contact-col">
            <h6 className="footer-contact-title">Contact</h6>
            <p className="footer-contact-item">
              Email: support@dotnerdnest.com
            </p>
            <p className="footer-contact-item">Phone: +39 0123 456789</p>
          </div>
        </div>
      </div>
      <hr className="border-secondary" />
      <div className="footer-copyright text-center small">
        &copy; 2025 DotNerdNest. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
