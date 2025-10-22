import { useState, useContext } from "react"; 
import { CartContext } from "../components/CartContext";
import carritoIcono from "../assets/carrito_icono.png";
import { Link, useLocation } from "react-router-dom"; 

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // Obtenemos todo lo necesario del CartContext
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const links = [
    { name: "Inicio", path: "/" },
    { name: "Juguetes", path: "/juguetes" },
   
  ];

  // Total real sumando precio * cantidad
  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  // Contador rojo sumando todas las cantidades
  const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

  // Función para determinar si el link está activo
  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
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
        </ul>
      </div>

      <div className="cart-container" onClick={() => setCartOpen(!cartOpen)}>
        <img src={carritoIcono} alt="Carrito" className="cart-img" />
        {totalItems > 0 && <span className="cart-count">{totalItems}</span>}

        {cartOpen && (
          <div className="mini-cart">
            <h3>Carrito</h3>
            {cartItems.length === 0 ? (
              <p>El carrito está vacío</p>
            ) : (
              <>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id} className="mini-cart-item">
                      <img src={item.avatar} alt={item.nombre} />
                      <div className="mini-cart-info">
                        <h4>{item.nombre}</h4>
                        <p>${item.precio}</p>
                        <div className="mini-cart-qty">
                          <button onClick={() => removeFromCart(item.id)}>-</button>
                          <span>{item.cantidad}</span>
                          <button onClick={() => addToCart(item)}>+</button>
                        </div>
                      </div>
                      <span>${item.precio * item.cantidad}</span>
                    </li>
                  ))}
                </ul>
                <p className="mini-cart-total">Total: ${total}</p>
                <button className="mini-cart-clear" onClick={clearCart}>
                  Vaciar Carrito
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
