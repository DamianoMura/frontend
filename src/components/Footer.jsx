
const Footer = () => (
  <footer className="bg-dark text-light pt-4 pb-2 mt-auto">
    <div className="container">
      <div className="row text-center text-md-start">
        {/* Branding */}
        <div className="col-md-4 mb-3">
          <h5 className="fw-bold">DotNerdNest</h5>
          <p className="small">Tech, innovazione e comfort per la tua postazione.</p>
        </div>

        {/* Link utili */}
        <div className="col-md-4 mb-3">
          <h6 className="text-uppercase">Navigazione</h6>
          <ul className="list-unstyled">
            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
            <li><a href="/search" className="text-light text-decoration-none">Cerca</a></li>
            <li><a href="/cart" className="text-light text-decoration-none">Carrello</a></li>
            <li><a href="/checkout" className="text-light text-decoration-none">Checkout</a></li>
          </ul>
        </div>

        {/* Contatti */}
        <div className="col-md-4 mb-3">
          <h6 className="text-uppercase">Contatti</h6>
          <p className="small mb-1">Email: support@dotnerdnest.com</p>
          <p className="small mb-0">Telefono: +39 0123 456789</p>
        </div>
      </div>

      <hr className="border-secondary" />

      <div className="text-center small">
        &copy; 2025 DotNerdNest. Tutti i diritti sono riservati.
      </div>
    </div>
  </footer>
);

export default Footer;


