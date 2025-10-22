import React, { useContext, useState } from "react";
import { CartContext } from "./CartContext";

export default function MiniCart({ cartItems, addToCart, removeFromCart, clearCart, total }) {
  if (!cartItems) return null;

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
        </>
      )}
    </div>
  );
}

