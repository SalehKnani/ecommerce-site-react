import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          ShopHub
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/checkout">Cart ({totalItems})</Link>
        </div>

        <div className="nav-auth">
          {!isLoggedIn ? (
            <>
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="nav-user">Hi, {user?.email}</span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}