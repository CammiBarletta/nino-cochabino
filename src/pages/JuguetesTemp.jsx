import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../components/CartContext";

export default function Juguetes() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch(
          "https://68d9896490a75154f0da9e49.mockapi.io/api/cochabino/productos"
        );
        if (!res.ok) throw new Error("Error al traer datos de MockAPI");
        const data = await res.json();

        // Normalizo para que todos tengan "avatar"
        const normalizados = data.map((p) => ({
          ...p,
          avatar: p.avatar || p.imagen || p.image || "",
        }));

        setProductos(normalizados);
      } catch (error) {
        console.error(error);
        // fallback a datos locales si MockAPI falla
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
      {productos.map((prod) => (
        <div key={prod.id} className="card">
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
            }}
          >
            <button className="card-btn" onClick={() => addToCart(prod)}>
              Agregar al carrito
            </button>

            {/*  Enlace a ruta dinámica */}
            <Link
              to={`/juguetes/${prod.id}`}
              className="btn btn-link"
              style={{ padding: "8px 12px" }}
            >
              Ver detalle
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
