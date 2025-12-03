import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import { CartContext } from "../contexts/CartContext"; // si querés agregar al carrito

export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("https://68d9896490a75154f0da9e49.mockapi.io/api/cochabino/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Tomamos solo los 3 primeros para la preview
  const productosPreview = productos.slice(0, 3);

  return (
    <>
          <Banner />

    <div className="inicio-container">

      <section className="productos-preview">
        <br></br>
        <h2>      ¡Productos destacados!</h2>

        <div className="productos-container">
          {productosPreview.map((prod) => (
            <div key={prod.id} className="card">
              <div className="card-img-container">
                <img src={prod.avatar} alt={prod.nombre} className="card-img" />
              </div>
              <h3 className="card-title">{prod.nombre}</h3>
              <p className="card-precio">${prod.precio}</p>
              <button
                className="card-btn"
                onClick={() => addToCart && addToCart(prod)}
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
    
        <Link to="/Juguetes" className="btn-primary">
          Más info
        </Link>
      </section>
    </div>
       </>
  );
 
}

