import { Link } from "react-router-dom";
import "./Navbar.css";   // ✅ IMPORTANT


export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/checkout">Cart</Link>
        </div>

        <div className="nav-auth">
          <Link to="/auth" className="btn btn-secondary">
            Login
          </Link>
          <Link to="/auth" className="btn btn-primary">
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}