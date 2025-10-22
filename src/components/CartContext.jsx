import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (producto) => {
    setCartItems(prev => {
      const itemExist = prev.find(item => item.id === producto.id);
      if (itemExist) {
        // si ya existe, aumenta la cantidad
        return prev.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          // si tiene más de 1, disminuye la cantidad
          if (item.cantidad > 1) return { ...item, cantidad: item.cantidad - 1 };
          // si solo queda 1, eliminar del carrito
          return null;
        }
        return item;
      }).filter(Boolean); // eliminar nulls
    });
  };

  const clearCart = () => setCartItems([]);

  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}
