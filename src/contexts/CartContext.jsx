import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
export const CartContext = createContext();

// Proveedor del contexto
export function CartProvider({ children }) {
  //   Cargar carrito desde localStorage al iniciar
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto
  const addToCart = (producto) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === producto.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...producto, cantidad: 1 }];
      }
    });
    alert(`Producto ${producto.nombre} agregado.`);
  };

  // Quitar una unidad
  const decreaseQuantity = (idProducto) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === idProducto
            ? { ...item, cantidad: Math.max((item.cantidad || 1) - 1, 0) }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // Aumentar cantidad
  const increaseQuantity = (idProducto) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === idProducto
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item
      )
    );
  };

  // Eliminar producto
  const removeFromCart = (id) =>
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

  // Vaciar carrito
  const clearCart = () => setCartItems([]);

  // Calcular total
  const total = cartItems.reduce((sum, item) => {
    const cantidad = item.cantidad || 1;
    return sum + Number(item.precio) * cantidad;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    total,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// Hook personalizado
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de un CartProvider");
  }
  return context;
}
