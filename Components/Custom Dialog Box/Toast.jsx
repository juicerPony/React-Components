import React, { useState, useEffect } from "react";

export default function Toast({ 
  message, 
  type = "info", 
  duration = 3000, 
  position = "top-right",
  isVisible,
  onClose 
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          setShow(false);
          setTimeout(() => onClose?.(), 300); // Wait for fade out animation
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setShow(false);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const getPositionClass = () => {
    switch (position) {
      case "top-left": return "toast-top-left";
      case "top-right": return "toast-top-right";
      case "bottom-left": return "toast-bottom-left";
      case "bottom-right": return "toast-bottom-right";
      case "top-center": return "toast-top-center";
      case "bottom-center": return "toast-bottom-center";
      default: return "toast-top-right";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "success": return "✓";
      case "error": return "✕";
      case "warning": return "⚠";
      case "info": return "ℹ";
      default: return "ℹ";
    }
  };

  return (
    <>
      <style>
        {`
          .toast-container {
            position: fixed;
            z-index: 1100;
            pointer-events: none;
          }

          .toast-top-left {
            top: 20px;
            left: 20px;
          }

          .toast-top-right {
            top: 20px;
            right: 20px;
          }

          .toast-bottom-left {
            bottom: 20px;
            left: 20px;
          }

          .toast-bottom-right {
            bottom: 20px;
            right: 20px;
          }

          .toast-top-center {
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
          }

          .toast-bottom-center {
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
          }

          .toast {
            display: flex;
            align-items: center;
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            min-width: 300px;
            max-width: 500px;
            backdrop-filter: blur(8px);
            pointer-events: auto;
            cursor: pointer;
            transition: all 0.3s ease;
            animation: ${show ? 'toastSlideIn' : 'toastSlideOut'} 0.3s ease-out forwards;
          }

          .toast.success {
            background-color: rgba(34, 197, 94, 0.9);
            color: white;
            border-left: 4px solid #15803d;
          }

          .toast.error {
            background-color: rgba(239, 68, 68, 0.9);
            color: white;
            border-left: 4px solid #dc2626;
          }

          .toast.warning {
            background-color: rgba(245, 158, 11, 0.9);
            color: white;
            border-left: 4px solid #d97706;
          }

          .toast.info {
            background-color: rgba(59, 130, 246, 0.9);
            color: white;
            border-left: 4px solid #2563eb;
          }

          .toast:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 20px -3px rgba(0, 0, 0, 0.15), 0 6px 8px -2px rgba(0, 0, 0, 0.08);
          }

          .toast-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            margin-right: 12px;
            font-weight: bold;
            flex-shrink: 0;
          }

          .toast-message {
            flex: 1;
            font-size: 14px;
            line-height: 1.4;
          }

          .toast-close {
            margin-left: 12px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
            font-weight: bold;
            flex-shrink: 0;
          }

          .toast-close:hover {
            opacity: 1;
          }

          @keyframes toastSlideIn {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes toastSlideOut {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(100%);
            }
          }

          /* Animations for different positions */
          .toast-top-left .toast,
          .toast-bottom-left .toast {
            animation: ${show ? 'toastSlideInLeft' : 'toastSlideOutLeft'} 0.3s ease-out forwards;
          }

          .toast-top-center .toast,
          .toast-bottom-center .toast {
            animation: ${show ? 'toastSlideInCenter' : 'toastSlideOutCenter'} 0.3s ease-out forwards;
          }

          @keyframes toastSlideInLeft {
            from {
              opacity: 0;
              transform: translateX(-100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes toastSlideOutLeft {
            from {
              opacity: 1;
              transform: translateX(0);
            }
            to {
              opacity: 0;
              transform: translateX(-100%);
            }
          }

          @keyframes toastSlideInCenter {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }

          @keyframes toastSlideOutCenter {
            from {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
            to {
              opacity: 0;
              transform: translateX(-50%) translateY(-20px);
            }
          }
        `}
      </style>

      <div className={`toast-container ${getPositionClass()}`}>
        <div 
          className={`toast ${type}`}
          onClick={() => {
            setShow(false);
            setTimeout(() => onClose?.(), 300);
          }}
        >
          <div className="toast-icon">
            {getTypeIcon()}
          </div>
          <div className="toast-message">
            {message}
          </div>
          <div className="toast-close">
            ×
          </div>
        </div>
      </div>
    </>
  );
}