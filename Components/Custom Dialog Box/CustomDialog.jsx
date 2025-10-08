import React, { useState, useEffect } from "react";

export default function CustomDialog({ 
  isOpen, 
  onClose, 
  type = "alert", 
  title = "Dialog", 
  message = "", 
  onConfirm, 
  onCancel,
  placeholder = "Enter your input...",
  confirmText = "OK",
  cancelText = "Cancel"
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen && type === "prompt") {
      setInputValue("");
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (type === "prompt") {
      onConfirm?.(inputValue);
    } else {
      onConfirm?.();
    }
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  return (
    <>
      <style>
        {`
          .dialog-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease-out;
          }

          .dialog-container {
            background: white;
            border-radius: 12px;
            padding: 24px;
            min-width: 320px;
            max-width: 480px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            animation: slideIn 0.2s ease-out;
          }

          .dialog-header {
            display: flex;
            align-items: center;
            margin-bottom: 16px;
          }

          .dialog-icon {
            width: 24px;
            height: 24px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            flex-shrink: 0;
          }

          .dialog-icon.alert {
            background-color: #fef3c7;
            color: #d97706;
          }

          .dialog-icon.confirm {
            background-color: #dbeafe;
            color: #2563eb;
          }

          .dialog-icon.prompt {
            background-color: #d1fae5;
            color: #059669;
          }

          .dialog-title {
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
            margin: 0;
          }

          .dialog-message {
            color: #6b7280;
            line-height: 1.5;
            margin-bottom: 20px;
          }

          .dialog-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 14px;
            margin-bottom: 20px;
            outline: none;
            transition: border-color 0.2s;
            box-sizing: border-box;
          }

          .dialog-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .dialog-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
          }

          .dialog-button {
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
            outline: none;
          }

          .dialog-button:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .dialog-button.primary {
            background-color: #3b82f6;
            color: white;
          }

          .dialog-button.primary:hover {
            background-color: #2563eb;
          }

          .dialog-button.secondary {
            background-color: #f3f4f6;
            color: #6b7280;
            border: 1px solid #d1d5db;
          }

          .dialog-button.secondary:hover {
            background-color: #e5e7eb;
            color: #374151;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              transform: translateY(-20px) scale(0.95);
              opacity: 0;
            }
            to {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }
        `}
      </style>

      <div className="dialog-overlay" onClick={handleOverlayClick}>
        <div className="dialog-container">
          <div className="dialog-header">
            <div className={`dialog-icon ${type}`}>
              {type === "alert" && "⚠"}
              {type === "confirm" && "?"}
              {type === "prompt" && "✎"}
            </div>
            <h3 className="dialog-title">{title}</h3>
          </div>
          
          <div className="dialog-message">{message}</div>
          
          {type === "prompt" && (
            <input
              type="text"
              className="dialog-input"
              placeholder={placeholder}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
              autoFocus
            />
          )}
          
          <div className="dialog-buttons">
            {type !== "alert" && (
              <button 
                className="dialog-button secondary" 
                onClick={handleCancel}
              >
                {cancelText}
              </button>
            )}
            <button 
              className="dialog-button primary" 
              onClick={handleConfirm}
              autoFocus={type === "alert"}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}