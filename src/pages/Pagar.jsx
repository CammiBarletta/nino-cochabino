import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useCartContext } from "../contexts/CartContext";

export default function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { cartItems, total, clearCart } = useCartContext(); // 👈 nombres reales
  const navigate = useNavigate();

  const tokenActual = localStorage.getItem("authToken");

  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    clearCart(); //  coincide con tu contexto real
    navigate("/juguetes"); //  ruta válida en tu app
  };

  return (
    <div className="pagar-container">
      {/* Info del usuario */}
      <div className="pagar-usuario">
        <h2>Hola {usuario?.nombre}</h2>
        <p>Email: {usuario?.email}</p>

        <div
          style={{
            background: "#f0f0f0",
            padding: "8px",
            borderRadius: "4px",
            margin: "10px 0",
            fontSize: "12px",
            wordBreak: "break-all",
          }}
        >
          <strong>Token:</strong> {tokenActual}
        </div>

        <button onClick={cerrarSesion}>Cerrar sesión</button>
        <hr />
      </div>

      {/* Carrito */}
      <div className="pagar-resumen">
        <h2>Tu compra:</h2>

        {cartItems.length > 0 ? (
          <>
            {cartItems.map((producto) => {
              const cantidad = Number(producto.cantidad || 1);
              const precioUnitario = Number(producto.precio || 0);
              const subtotal = cantidad * precioUnitario;

              return (
                <div
                  key={producto.id}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <img src={producto.avatar} alt={producto.nombre} width="60" />
                  <div>
                    <div>{producto.nombre}</div>
                    <div>Precio unidad: ${precioUnitario.toFixed(2)}</div>
                    <div>Cantidad: {cantidad}</div>
                    <div>
                      <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
            <h3>Total a pagar: ${total.toFixed(2)}</h3>
          </>
        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </div>

      <div className="pagar-botones">
        {cartItems.length > 0 && (
          <button onClick={comprar}>Confirmar y Pagar</button>
        )}
        <button onClick={() => navigate("/juguetes")}>
          {cartItems.length > 0
            ? "Seguir Comprando"
            : "Volver a Juguetes"}
        </button>
      </div>
    </div>
  );
}
