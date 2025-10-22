/**
 * PulseLoader.jsx
 * 
 * A simple, reusable pulse animation loader built with React.
 * 
 * Features:
 * - Centered circular pulse animation using pure CSS.
 * - Lightweight, no external dependencies.
 * - Easy to customize (size, color, speed).
 * 
 * Usage:
 * <PulseLoader />
 * 
 * Author: mnvrohith
 * Date:22-10-2025
 */

import React from "react";

export default function PulseLoader() {
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

          .pulse-loader {
            width: 100px;
            height: 100px;
            background-color: #3b82f6;
            border-radius: 50%;
            animation: pulse 1.5s infinite ease-in-out;
          }

          @keyframes pulse {
            0% {
              transform: scale(0.9);
              opacity: 0.7;
            }
            50% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(0.9);
              opacity: 0.7;
            }
          }
        `}
      </style>

      <div className="loader-container">
        <div className="pulse-loader"></div>
      </div>
    </>
  );
}
