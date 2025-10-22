import React from "react";
import bannerImg from "../assets/banner_halloween.png";

export default function Banner() {
  const styles = {
    container: {
      width: "90%",
      maxWidth: "1200px",
      margin: "20px auto", // centrado horizontal con espacio arriba y abajo
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    },
    image: {
      width: "100%",
      height: "auto",
      display: "block",
      objectFit: "cover",
    },
  };

  return (
    <div style={styles.container}>
      <img src={bannerImg} alt="Banner Halloweek" style={styles.image} />
    </div>
  );
}
