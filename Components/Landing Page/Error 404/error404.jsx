import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "0 20px",
      }}
    >
      <h1 style={{ fontSize: "8rem", margin: 0, color: "#ff4d4f" }}>404</h1>
      <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>
        Oops! Page not found
      </h2>
      <p style={{ fontSize: "1rem", color: "#555", marginBottom: "20px" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Error404;
