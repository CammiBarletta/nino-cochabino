import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { useAuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaShoppingCart, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Helmet } from "react-helmet";

export default function Juguetes() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { usuario } = useAuthContext();
  const navigate = useNavigate();

  // búsqueda y paginación
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;

  // Traer productos 
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
        toast.error(
          "No se pudieron cargar los productos, se usan datos de ejemplo."
        );
      }
    };

    fetchProductos();
  }, []);

  //  Filtro por nombre / categoría
  const productosFiltrados = productos.filter((prod) => {
    const texto = busqueda.toLowerCase();
    return (
      prod.nombre.toLowerCase().includes(texto) ||
      (prod.categoria && prod.categoria.toLowerCase().includes(texto))
    );
  });

  
  const totalPaginas =
    productosFiltrados.length === 0
      ? 1
      : Math.ceil(productosFiltrados.length / productosPorPagina);

  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indiceInicio,
    indiceInicio + productosPorPagina
  );

  const cambiarPagina = (num) => {
    setPaginaActual(num);
  };

  // 👉 función para agregar al carrito + toast
  const handleAddToCart = (prod) => {
    addToCart(prod);
    toast.success(`${prod.nombre} se agregó al carrito 🧸`);
  };

  return (
    <>
      {/* SEO con React Helmet */}
      <Helmet>
        <title>Cochabino | Catálogo de juguetes</title>
        <meta
          name="description"
          content="Catálogo de juguetes de Cochabino: peluches, muñecos, juegos de mesa y más para chicos."
        />
      </Helmet>

      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            {/* Barra de búsqueda */}
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Buscar juguetes por nombre o categoría..."
              value={busqueda}
              onChange={(e) => {
                setBusqueda(e.target.value);
                setPaginaActual(1); // cuando busco, vuelvo a la pag 1
              }}
            />

            <div className="productos-container">
              {productosActuales.map((prod, index) => (
                <div
                  key={prod.id}
                  className="card"
                  style={{
                    animationDelay: `${0.1 * (index + 1)}s`,
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
                    <button
                      className="card-btn"
                      onClick={() => handleAddToCart(prod)}
                      aria-label={`Agregar ${prod.nombre} al carrito`}
                    >
                      <FaShoppingCart
                        style={{ marginRight: 6 }}
                        aria-hidden="true"
                      />
                      Agregar al carrito
                    </button>

                    <Link
                      to={`/juguetes/${prod.id}`}
                      className="btn-link"
                      style={{ padding: "8px 12px" }}
                    >
                      Ver detalle
                    </Link>

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
                            navigate("/formulario-producto", {
                              state: { producto: prod },
                            })
                          }
                        >
                          <FaEdit
                            style={{ marginRight: 4 }}
                            aria-hidden="true"
                          />
                          Editar
                        </button>

                        <button
                          className="card-btn"
                          style={{ backgroundColor: "#dc3545" }}
                          onClick={() =>
                            navigate("/eliminar-producto", {
                              state: { producto: prod },
                            })
                          }
                        >
                          <FaTrashAlt
                            style={{ marginRight: 4 }}
                            aria-hidden="true"
                          />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {productosFiltrados.length === 0 && (
                <p style={{ textAlign: "center", marginTop: 20 }}>
                  No se encontraron juguetes que coincidan con la búsqueda.
                </p>
              )}
            </div>

            {/* Paginador - Estilo simplificado */}
            {productosFiltrados.length > productosPorPagina && (
              <div className="d-flex justify-content-center my-4">
                {Array.from({ length: totalPaginas }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`btn mx-1 ${
                      paginaActual === index + 1
                        ? "btn-primary"
                        : "btn-outline-primary"
                    }`}
                    onClick={() => cambiarPagina(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Información de la página actual */}
            {productosFiltrados.length > 0 && (
              <div className="text-center text-muted mt-2">
                <small>
                  Mostrando {productosActuales.length} productos (página{" "}
                  {paginaActual} de {totalPaginas})
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
