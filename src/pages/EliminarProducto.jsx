import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const URL_BASE =
  "https://68d9896490a75154f0da9e49.mockapi.io/api/cochabino/productos";

function EliminarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto;

  const [cargando, setCargando] = useState(false);

  const eliminarProducto = async () => {
    if (!producto) return;

    setCargando(true);
    try {
      const respuesta = await fetch(`${URL_BASE}/${producto.id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        throw new Error("Error al eliminar el producto.");
      }

      alert("Producto eliminado correctamente.");

      navigate("/juguetes");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      console.error(error.message);
      alert("Hubo un problema al eliminar el producto.");
    } finally {
      setCargando(false);
    }
  };

  const manejarEliminar = () => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmar) {
      eliminarProducto();
    }
  };

  if (!producto) {
    return (
      <div style={{ padding: 20 }}>
        <p>No se encontró el producto para eliminar.</p>
        <button onClick={() => navigate("/juguetes")}>Volver</button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ color: "#dc3545", marginBottom: "20px" }}>
        Eliminar producto
      </h2>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "30px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h3 style={{ color: "#dc3545" }}>
          ¿Estás segura de que deseas eliminar este producto?
        </h3>

        <div style={{ textAlign: "left", margin: "20px 0" }}>
          <p>
            <strong>Nombre:</strong> {producto.nombre}
          </p>
          <p>
            <strong>Precio:</strong> ${producto.precio}
          </p>
          <p>
            <strong>Categoría:</strong>{" "}
            {producto.categoria || "Sin categoría"}
          </p>
          <p>
            <strong>Descripción:</strong> {producto.descripcion}
          </p>
          {producto.avatar && (
            <img
              src={producto.avatar}
              alt="Producto a eliminar"
              style={{ maxWidth: "200px", marginTop: "10px" }}
            />
          )}
        </div>

        <p style={{ color: "#666", fontStyle: "italic" }}>
          Esta acción no se puede deshacer. El producto será eliminado
          permanentemente.
        </p>
      </div>

      <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
        <button
          onClick={manejarEliminar}
          disabled={cargando}
          style={{
            padding: "12px 24px",
            backgroundColor: cargando ? "#ccc" : "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: cargando ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {cargando ? "Eliminando..." : "Sí, eliminar"}
        </button>

        <button
          onClick={() => navigate("/juguetes")}
          disabled={cargando}
          style={{
            padding: "12px 24px",
            backgroundColor: cargando ? "#ccc" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: cargando ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
export default EliminarProducto;
