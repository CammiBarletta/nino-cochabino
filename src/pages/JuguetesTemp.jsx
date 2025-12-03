import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";

export default function Juguetes() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useContext(CartContext);

  const { usuario } = useAuthContext();   //  acá sabemos si es admin o no
  const navigate = useNavigate();         //  para ir a editar / eliminar

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(
          "https://68d9896490a75154f0da9e49.mockapi.io/api/cochabino/productos"
        );
        if (!res.ok) throw new Error("Error al traer datos de MockAPI");
        const data = await res.json();

        const normalizados = data.map((p) => ({
          ...p,
          avatar: p.avatar || p.imagen || p.image || "",
        }));

        setProductos(normalizados);
      } catch (error) {
        console.error(error);
        setProductos([
          {
            id: 1,
            nombre: "Pelota de fútbol",
            precio: 1500,
            avatar:
              "https://http2.mlstatic.com/D_NQ_NP_733698-CBT92133316835_092025-O.webp",
          },
          {
            id: 2,
            nombre: "Muñeca",
            precio: 2000,
            avatar:
              "https://http2.mlstatic.com/D_NQ_NP_821671-MLA88897838203_072025-O.webp",
          },
          {
            id: 3,
            nombre: "Dinosaurio",
            precio: 1800,
            avatar:
              "https://http2.mlstatic.com/D_NQ_NP_711371-MLA88777977958_082025-O.webp",
          },
        ]);
      }
    };

    fetchProductos();
  }, []);

  return (
   <div className="productos-container">
  {productos.map((prod, index) => (
    <div
      key={prod.id}
      className="card"
      style={{
        animationDelay: `${0.1 * (index + 1)}s`
      }}
    >
      <img
        src={prod.avatar || prod.imagen || ""}
        alt={prod.nombre}
        className="card-img"
      />
      <h3 className="card-title">{prod.nombre}</h3>
      <p className="card-precio">${prod.precio}</p>

      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginTop: 8,
          flexWrap: "wrap",
        }}
      >

            <button className="card-btn" onClick={() => addToCart(prod)}>
              Agregar al carrito
            </button>

            <Link
              to={`/juguetes/${prod.id}`}
              className="btn btn-link"
              style={{ padding: "8px 12px" }}
            >
              Ver detalle
            </Link>

            {/* 🔐 Botones solo para ADMIN */}
            {usuario?.nombre === "admin" && (
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginTop: 8,
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <button
                  className="card-btn"
                  style={{ backgroundColor: "#6c757d" }}
                  onClick={() =>
                    navigate("/formulario-producto", { state: { producto: prod } })
                  }
                >
                  Editar
                </button>

                <button
                  className="card-btn"
                  style={{ backgroundColor: "#dc3545" }}
                  onClick={() =>
                    navigate("/eliminar-producto", { state: { producto: prod } })
                  }
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
