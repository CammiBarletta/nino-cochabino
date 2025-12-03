import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const emailGuardado = localStorage.getItem("authEmail");
    if (token) {
      // Extraemos el nombre del token falso para persistir la sesión visualmente
      const username = token.replace("fake-token-", "");
      setUsuario({
        nombre: username,
        email: emailGuardado || "",
      });
    }
  }, []);

  // Función para iniciar sesión
  const iniciarSesion = (username) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);

    const emailGuardado = localStorage.getItem("authEmail");
    setUsuario({
      nombre: username,
      email: emailGuardado || "",
    });
  };

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authEmail");
    setUsuario(null);
  };

  const value = {
    // --- NOMBRES ORIGINALES (Español) ---
    usuario,
    iniciarSesion,
    cerrarSesion,
    
    // --- ALIAS PARA COMPATIBILIDAD CON NAVBAR (Inglés) ---
    // Esto conecta tu Navbar que pide 'user' con la variable 'usuario'
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

// Hook personalizado
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
}

// Alias para compatibilidad con componentes que usan useAuth()
export const useAuth = useAuthContext;