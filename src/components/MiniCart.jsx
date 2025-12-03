import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function MiniCart({ cartItems, addToCart, removeFromCart, clearCart, total }) {
  const { usuario } = useAuth();

  console.log("Voy a pagar"); // 👈 agregalo antes del navigate
  const navigate = useNavigate();

  if (!cartItems) return null;

  const handlePay = () => {
  if (!usuario) {
  navigate("/login");
} else {
  navigate("/pagar");
}

};


return (
  <div className="mini-cart">
    <h3>Carrito</h3>
    {cartItems.length === 0 ? (
      <p>El carrito está vacío</p>
    ) : (
      <>
        <ul>
          {cartItems.map(item => (
            <li key={item.id} className="mini-cart-item">
              <span>{item.nombre} × {item.cantidad}</span>
              <span>${item.precio * item.cantidad}</span>
              <div className="mini-cart-qty">
                <button onClick={() => removeFromCart(item.id)}>-</button>
                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <p className="mini-cart-total">Total: ${total}</p>
        <button className="mini-cart-clear" onClick={clearCart}>Vaciar Carrito</button>
        <button className="mini-cart-pay" onClick={handlePay}>Pagar</button>
      </>
    )}
  </div>
);

}
