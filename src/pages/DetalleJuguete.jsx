// src/pages/DetalleJuguete.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";

const FALLBACK_IMG = "https://via.placeholder.com/600x400?text=Sin+imagen";

export default function DetalleJuguete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        const res = await fetch(
          `https://68d9896490a75154f0da9e49.mockapi.io/api/cochabino/productos/${id}`
        );
        if (!res.ok) throw new Error("No encontrado");
        const data = await res.json();
        const normalized = {
          ...data,
          avatar:
            data.avatar || data.imagen || data.image || data.photo || FALLBACK_IMG,
        };
        setProducto(normalized);
      } catch (err) {
        console.error(err);
        setProducto(null);
      } finally {
        setLoading(false);
      }
    };
    fetchOne();
  }, [id]);

  if (loading) return <p style={{ padding: 20 }}>Cargando...</p>;
  if (!producto) return <p style={{ padding: 20 }}>Producto no encontrado</p>;

  return (
    <div
      style={{
        maxWidth: 950,
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Imagen del producto */}
        <div
          style={{
            flex: "1 1 350px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={producto.avatar}
            alt={producto.nombre}
            style={{
              width: "100%",
              maxWidth: 350,
              height: "auto",
              objectFit: "contain",
              borderRadius: 12,
              backgroundColor: "#f9f9f9",
              padding: "10px",
            }}
            onError={(e) => (e.currentTarget.src = FALLBACK_IMG)}
          />
        </div>

        {/* Información del producto */}
        <div
          style={{
            flex: "1 1 300px",
            minWidth: "280px",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "var(--color1)",
              marginBottom: "10px",
              fontSize: "1.6rem",
            }}
          >
            {producto.nombre}
          </h2>

          <p
            style={{
              color: "#555",
              lineHeight: "1.6",
              margin: "10px 0 15px",
            }}
          >
            {producto.descripcion}
          </p>

          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.4rem",
              color: "var(--color2)",
              marginBottom: "20px",
            }}
          >
            ${producto.precio}
          </p>

          {/* Botones */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <button
              className="card-btn"
              style={{
                padding: "10px 15px",
                minWidth: "150px",
              }}
              onClick={() => addToCart(producto)}
            >
              🛒 Agregar al carrito
            </button>

            <button
              className="card-btn"
              style={{
                backgroundColor: "var(--color1)",
                padding: "10px 15px",
                minWidth: "150px",
              }}
              onClick={() => navigate(-1)}
            >
              ← Volver a Juguetes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

