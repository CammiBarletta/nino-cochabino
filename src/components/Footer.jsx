import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const showBackToTop = location.pathname !== "/";

  const iconStyle = {
    width: "30px",
    height: "30px",
    margin: "0 10px",
    cursor: "pointer",
    transition: "transform 0.2s",
  };

  const iconHover = (e) => {
    e.currentTarget.style.transform = "scale(1.2)";
  };

  const iconLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <footer
      style={{
        backgroundColor: "#8acbb5",
        color: "#ffffffff",
        padding: "10px 20px",
        textAlign: "center",
        marginTop: "40px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ marginBottom: "15px" }}>Nino Cochabino</h2>
        <p style={{ marginBottom: "20px" }}>
          &copy; 2025 - Proyecto de estudio React
        </p>

        {showBackToTop && (
          <Link
            to="/"
            style={{
              display: "inline-block",
              marginBottom: "20px",
              padding: "10px 20px",
              backgroundColor: "#e6546b",
              color: "#fff",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#da8f72")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e6546b")}
          >
            Volver al inicio
          </Link>
        )}

        {/* Redes sociales */}
        <div style={{ marginTop: "15px" }}>
          {/* Facebook */}
          <a
            href="https://www.facebook.com" // reemplaza por tu página de estudio si querés
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={iconHover}
            onMouseLeave={iconLeave}
          >
            <svg
              style={iconStyle}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.326-.597 1.326-1.326V1.326C24 .597 23.403 0 22.675 0z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={iconHover}
            onMouseLeave={iconLeave}
          >
            <svg
              style={iconStyle}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 011.675 1.025 4.92 4.92 0 011.025 1.675c.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 01-1.025 1.675 4.92 4.92 0 01-1.675 1.025c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 01-1.675-1.025 4.92 4.92 0 01-1.025-1.675c-.163-.46-.35-1.26-.403-2.43C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 011.025-1.675 4.92 4.92 0 011.675-1.025c.46-.163 1.26-.35 2.43-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.012 7.052.07 5.775.127 4.673.326 3.77.66a6.902 6.902 0 00-2.5 1.642A6.902 6.902 0 00.66 4.802c-.334.902-.533 2.005-.59 3.282C.012 8.741 0 9.15 0 12s.012 3.259.07 4.538c.057 1.277.256 2.38.59 3.282a6.902 6.902 0 001.642 2.5 6.902 6.902 0 002.5 1.642c.902.334 2.005.533 3.282.59C8.741 23.988 9.15 24 12 24s3.259-.012 4.538-.07c1.277-.057 2.38-.256 3.282-.59a6.902 6.902 0 002.5-1.642 6.902 6.902 0 001.642-2.5c.334-.902.533-2.005.59-3.282.058-1.279.07-1.688.07-4.538s-.012-3.259-.07-4.538c-.057-1.277-.256-2.38-.59-3.282a6.902 6.902 0 00-1.642-2.5 6.902 6.902 0 00-2.5-1.642c-.902-.334-2.005-.533-3.282-.59C15.259.012 14.85 0 12 0z" />
              <path d="M12 5.838A6.162 6.162 0 005.838 12 6.162 6.162 0 0012 18.162 6.162 6.162 0 0018.162 12 6.162 6.162 0 0012 5.838zm0 10.162A4 4 0 118 12a4 4 0 014 4zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
