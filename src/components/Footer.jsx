import React from 'react';
import '../styles/Footer.css';

const Footer = () => (
  <footer className="footer bg-dark text-light pt-4 pb-2 mt-auto">
    <div className="container">
      <div className="row text-center text-md-start">
        <div className="col-md-4 mb-3">
          <h5 className="footer-title">DotNerdNest</h5>
          <p className="footer-text">Tech, innovation and comfort for your setup.</p>
        </div>
        <div className="col-md-4 mb-3">
          <h6 className="footer-nav-title">Navigation</h6>
          <ul className="footer-nav-list list-unstyled">
            <li><a href="/" className="footer-nav-link">Home</a></li>
            <li><a href="/search" className="footer-nav-link">Search</a></li>
            <li><a href="/cart" className="footer-nav-link">Cart</a></li>
            <li><a href="/checkout" className="footer-nav-link">Checkout</a></li>
          </ul>
        </div>
        <div className="col-md-4 mb-3">
          <h6 className="footer-contact-title">Contact</h6>
          <p className="footer-contact-item">Email: support@dotnerdnest.com</p>
          <p className="footer-contact-item">Phone: +39 0123 456789</p>
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


