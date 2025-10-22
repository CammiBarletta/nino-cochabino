import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_nino.png";
import Navbar from "../pages/Navbar";
import MiniCart from "./MiniCart"; // ajustá la ruta según tu proyecto

import "../index.css";

export default function Header() {
  return (
    <header className="header-main">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="logo-link" aria-label="Inicio">
          <img src={logo} alt="Logo Juguetería" className="logo-img" />
        </Link>

        {/* Navbar */}
        <Navbar />
      </div>
    </header>
  );
}
