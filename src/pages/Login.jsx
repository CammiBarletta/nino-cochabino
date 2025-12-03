import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function IniciarSesion() {
  // AGREGAMOS "user" ACA PARA SABER SI YA ESTÁ LOGUEADO
  const { iniciarSesion, user } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  // Estados para manejo de UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({ nombre: "", email: "" });

  // --- LÓGICA DE PROTECCIÓN ---
  // Si el usuario ya existe, lo mandamos al inicio sin mostrar el formulario
  if (user) {
    return <Navigate to="/" replace />;
  }
  // ----------------------------

  const manejarEnvio = (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores previos
    setLoading(true); // Activar spinner o estado de carga

    // Simulamos una pequeña demora para que se sienta "real" (500ms)
    setTimeout(() => {
      const { nombre, email } = formulario;

      // 1. Lógica de ADMIN
      if (nombre === "admin" && email === "1234@admin") {
        localStorage.setItem("authEmail", email);
        iniciarSesion("admin"); // Esto actualizará el 'user' en el contexto
        // La redirección ocurrirá automáticamente por el Navigate de arriba o el navigate abajo
        navigate("/dashboard");
      }
      // 2. Lógica de USUARIO NORMAL
      else if (nombre && email && nombre !== "admin") {
        localStorage.setItem("authEmail", email);
        iniciarSesion(nombre);

        // Redirección inteligente (Carrito o Juguetes)
        if (ubicacion.state?.carrito) {
          navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
        } else {
          navigate("/juguetes");
        }
      }
      // 3. Lógica de ERROR
      else {
        setError("Credenciales incorrectas. Revisá los datos.");
        setLoading(false); // Importante: desactivar carga si falla
      }
    }, 800);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Encabezado */}
        <h1 style={styles.title}>¡Hola! 👋</h1>
        <p style={styles.subtitle}>Ingresá tus datos para continuar</p>

        <form onSubmit={manejarEnvio} style={styles.form}>
          {/* Input Nombre */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Ej: Juan Perez"
              value={formulario.nombre}
              onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              required
              disabled={loading} // Deshabilitar mientras carga
            />
          </div>

          {/* Input Email */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              placeholder="tucorreo@ejemplo.com"
              value={formulario.email}
              onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          {/* Mensaje de Error (en lugar de Alert) */}
          {error && <div style={styles.errorMessage}>{error}</div>}

          {/* Botones */}
          <div style={styles.buttonGroup}>
            <button 
              type="submit" 
              style={{...styles.buttonPrimary, opacity: loading ? 0.7 : 1}}
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
            
            <button
              type="button"
              onClick={() => navigate("/productos")}
              style={styles.buttonSecondary}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* Hint para pruebas (Más discreto) */}
        <div style={styles.hintBox}>
          <p style={{margin: 0, fontWeight: 'bold'}}>🔧 Modo Developer:</p>
          <code style={{fontSize: '0.85rem'}}>admin / 1234@admin</code>
        </div>
      </div>
    </div>
  );
}

// --- Estilos en objeto (CSS-in-JS simple) ---
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh", // Ocupa casi toda la pantalla
    backgroundColor: "#f3f4f6", // Gris muy suave de fondo
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "2.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)", // Sombra suave
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#1f2937",
    fontSize: "1.8rem",
  },
  subtitle: {
    margin: "0 0 25px 0",
    color: "#6b7280",
    fontSize: "0.95rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  inputGroup: {
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "1rem",
    boxSizing: "border-box", // Para que el padding no rompa el ancho
    transition: "border-color 0.2s",
  },
  errorMessage: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "0.9rem",
    textAlign: "center",
    border: "1px solid #f87171",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
  buttonPrimary: {
    backgroundColor: "#2563eb", // Azul lindo
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    color: "#6b7280",
    padding: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  hintBox: {
    marginTop: "30px",
    padding: "15px",
    backgroundColor: "#eff6ff",
    borderRadius: "8px",
    color: "#1e40af",
    fontSize: "0.85rem",
    border: "1px dashed #bfdbfe",
  },
};