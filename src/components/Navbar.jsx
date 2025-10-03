
const Navbar = () => (
  <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
    <div className="container-fluid">
      <a className="navbar-brand text-light fw-bold" href="/">Home</a>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link text-light" href="/products">Prodotti</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/cart">Carrello</a>
          </li>
        </ul>

        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Cerca Prodotto" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Cerca</button>
        </form>
      </div>
    </div>
  </nav>
);

export default Navbar;
