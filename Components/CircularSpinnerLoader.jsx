import React from "react";

export default function CircularSpinner() {
  return (
    <>
      <style>
        {`
          .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          .circular-spinner {
            width: 300px;
            height: 300px;
            border: 4px solid rgba(59, 130, 246, 0.2);
            border-top-color: #3b82f6;
            border-radius: 50%;
            animation: spin 0.9s linear infinite;
          }
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>

      <div className="loader-container">
        <div className="circular-spinner"></div>
      </div>
    </>
  );
}
