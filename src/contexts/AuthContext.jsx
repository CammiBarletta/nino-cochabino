import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // 🟦 1) Recuperar usuario de localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUsuario(JSON.parse(savedUser));
    }
  }, []);

  //  2) Recuperar token falso si querés mantenerlo
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const emailGuardado = localStorage.getItem("authEmail");
    if (token) {
      const username = token.replace("fake-token-", "");
      setUsuario({
        nombre: username,
        email: emailGuardado || "",
      });
    }
  }, []);

  //  3) Iniciar sesión (login persistente real)
  const iniciarSesion = (username) => {
    const nuevoUsuario = {
      nombre: username,
      email: "", // o lo que corresponda
    };

    // Persistir correctamente
    localStorage.setItem("user", JSON.stringify(nuevoUsuario));
    localStorage.setItem("authToken", `fake-token-${username}`);

    setUsuario(nuevoUsuario);
  };

  //  4) Cerrar sesión (limpio todo)
  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    localStorage.removeItem("user");
    setUsuario(null);
  };

  const value = {
    usuario,
    iniciarSesion,
    cerrarSesion,

    // Alias para compatibilidad con Navbar que usa "user" y "logout"
    user: usuario,
    login: iniciarSesion,
    logout: cerrarSesion,

    isAuthenticated: !!usuario,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}

export const useAuth = useAuthContext;
