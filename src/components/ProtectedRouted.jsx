import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, soloAdmin = false }) => {
  const { usuario } = useAuthContext();
  const location = useLocation();

  // Mientras se carga el usuario
  if (usuario === undefined) {
    return <p style={{ textAlign: "center" }}>Cargando usuario...</p>;
  }

  // Si no hay usuario logueado → al login
  if (!usuario) {
    console.log("Usuario actual:", usuario);
    return <Navigate to="/login" state={location.state} replace />;
  }

  // Si la ruta requiere admin y el usuario no lo es
  if (soloAdmin && usuario.nombre !== "admin") {
    return <Navigate to="/juguetes" replace />;
  }

  // Si todo está bien → mostrar la página protegida
  return children;
};

export default ProtectedRoute;
