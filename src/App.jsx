import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductsProvider } from "./contexts/ProductsContext";
import ProtectedRoute from "./components/ProtectedRouted";
import Dashboard from "./pages/Dashboard";

import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { ToastContainer } from "react-toastify";


// Páginas
import Inicio from "./pages/Inicio";
import Juguetes from "./pages/JuguetesTemp";
import DetalleJuguete from "./pages/DetalleJuguete";
import Login from "./pages/Login";
import Carrito from "./components/CarritoTotal";
import Pagar from "./pages/Pagar";
import FormularioProducto from "./pages/FormularioProducto";
import EliminarProducto from "./pages/EliminarProducto";

export default function App() {
  const location = useLocation();
  const [fadeClass, setFadeClass] = useState("page-transition");

  useEffect(() => {
    setFadeClass("page-transition");
    const timeout = setTimeout(
      () => setFadeClass("page-transition active"),
      50
    );
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return ( 
    <AuthProvider>
      <CartProvider>
        <ProductsProvider> 
        {/*  Header y Footer FUERA del contenedor que cambia */}
        <Header />

        {/* Contenedor con animación entre páginas */}
        <main className={`main-container ${fadeClass}`}>
          <Routes>
            {/* Públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/juguetes" element={<Juguetes />} />
            <Route path="/juguetes/:id" element={<DetalleJuguete />} />

            {/* Protegidas */}
           <Route
             path="/carrito"
               element={
               <ProtectedRoute>
                <Carrito />
              </ProtectedRoute>
  }
/>
            <Route
               path="/pagar"
              element={
             <ProtectedRoute>
             <Pagar />
           </ProtectedRoute>
  }
/>
        <Route
         path="/dashboard"
       element={
          <ProtectedRoute soloAdmin={true}>
            <Dashboard />
          </ProtectedRoute>
  }
  
/>        <Route
  path="/formulario-producto"
  element={
    <ProtectedRoute soloAdmin={true}>
      <FormularioProducto />
    </ProtectedRoute>
  }
/>

    <Route
  path="/eliminar-producto"
  element={
    <ProtectedRoute soloAdmin={true}>
      <EliminarProducto />
    </ProtectedRoute>
  }
/>
          </Routes>
        </main>

        <Footer />
        
        </ProductsProvider>

      </CartProvider>
    </AuthProvider>
  );
}
