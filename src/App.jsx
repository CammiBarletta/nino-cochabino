import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRouted";
import "./index.css";

// Páginas
import Inicio from "./pages/Inicio";
import Juguetes from "./pages/JuguetesTemp";
import DetalleJuguete from "./pages/DetalleJuguete";
import Login from "./pages/Login";
import Carrito from "./components/CarritoTotal";

export default function App() {
  const location = useLocation();
  const [fadeClass, setFadeClass] = useState("page-transition");

  useEffect(() => {
    // Cada vez que cambia la ruta, reinicia el fade
    setFadeClass("page-transition");
    const timeout = setTimeout(() => setFadeClass("page-transition active"), 50);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <AuthProvider>
      <CartProvider>
        <Header />

        {/* Contenedor con animación entre páginas */}
        <div className={`main-container ${fadeClass}`}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/juguetes" element={<Juguetes />} />
            <Route path="/juguetes/:id" element={<DetalleJuguete />} />
            <Route
              path="/carrito"
              element={
                <ProtectedRoute>
                  <Carrito />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
