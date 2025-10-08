import React from "react";

const CircularLoader = ({ size = 50, color = "#333" }) => {
  const spinnerStyle = {
    width: size,
    height: size,
    border: `${size / 10}px solid #f3f3f3`,
    borderTop: `${size / 10}px solid ${color}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default CircularLoader;
