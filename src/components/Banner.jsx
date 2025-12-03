import React from "react";
 import videoBanner from "../assets/banner_video.mp4";

export default function Banner() {
const styles = {
    container: {
      width: "100%",
      margin: "0",
      padding: "0",
      overflow: "hidden",
      position: "relative", // Necesario para evitar huecos extraños
      // Si quieres una altura fija (ej. tipo cine), descomenta esto:
     height: "600px", 
    },
    video: {
      width: "100%",
      height: "100%",    // Se adapta al contenedor
      objectFit: "cover", // ESTO ES CLAVE: evita que el video se deforme o deje bordes negros
      display: "block",   // Quita el pequeño margen que a veces dejan los videos inline
    },
  };

  return (
    <div style={styles.container}>
    
      <video
        src={videoBanner}
        style={styles.video}
        autoPlay       // Se reproduce solo
        loop           // Se repite infinitamente
        muted          // OBLIGATORIO para que funcione el autoplay en Chrome/Edge
        playsInline    // OBLIGATORIO para que funcione bien en iPhone
      />
    </div>
  );
}
