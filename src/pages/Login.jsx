import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {user ? (
        <>
          <h2>Hola, {user.name} 👋</h2>
          <button onClick={() => { logout(); navigate("/"); }}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <h2>Iniciar sesión</h2>
          <button onClick={() => { login("Camila"); navigate("/carrito"); }}>
            Entrar como Camila
          </button>
        </>
      )}
    </div>
  );
}
