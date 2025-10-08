import React from "react";
import { useNavigate } from "react-router-dom";

const Error429 = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff4e5",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "0 20px",
      }}
    >
      <h1 style={{ fontSize: "6rem", margin: 0, color: "#ff9900" }}>429</h1>
      <h2 style={{ fontSize: "2rem", margin: "10px 0" }}>Too Many Requests</h2>
      <p style={{ fontSize: "1rem", color: "#555", marginBottom: "20px" }}>
        You have sent too many requests in a short period. Please try again
        later.
      </p>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#ff9900",
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

export default Error429;
