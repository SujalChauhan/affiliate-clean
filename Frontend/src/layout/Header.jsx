import { Link } from "react-router-dom";
function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top py-2">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          Affiliate++
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto gap-2">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
