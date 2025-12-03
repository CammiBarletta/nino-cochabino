import { useState, useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import carritoIcono from "../assets/carrito_icono.png";
import { Link, useLocation } from "react-router-dom";
import MiniCart from "../components/MiniCart";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Contextos
  const { cartItems = [], addToCart, removeFromCart, clearCart } =
    useContext(CartContext);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    clearCart();
    logout();
  };

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Juguetes", path: "/juguetes" },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.cantidad,
    0
  );

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      {/* IZQUIERDA: menú + links */}
      <div className="nav-left">
        <button
          className="menu-btn"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={isActive(link.path) ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {user?.nombre === "admin" && (
            <li>
              <Link
                to="/dashboard"
                className={isActive("/dashboard") ? "active admin-link" : "admin-link"}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* DERECHA: usuario + carrito */}
      <div className="nav-right">
        {/* Usuario */}
        <div className="user-controls">
          {user ? (
            <>
              <span className="user-greeting">
                Hola, {user.nombre || user.email.split("@")[0]}
              </span>
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Salir
              </button>
            </>
          ) : (
            <Link to="/login" className="login-link">
              Iniciar sesión
            </Link>
          )}
        </div>

        {/* Carrito */}
        <div
          className="cart-container"
          onClick={() => setCartOpen(!cartOpen)}
        >
          <img
            src={carritoIcono}
            alt="Carrito"
            className="cart-img"
          />
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}

          {cartOpen && (
            <div className="minicart-wrapper">
              <MiniCart
                cartItems={cartItems}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                total={total}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
