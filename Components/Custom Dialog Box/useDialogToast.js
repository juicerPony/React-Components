import { useState, useCallback } from "react";

export const useDialog = () => {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: "alert",
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null,
    placeholder: "",
    confirmText: "OK",
    cancelText: "Cancel"
  });

  const closeDialog = useCallback(() => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Custom Alert - non-blocking
  const showAlert = useCallback((message, title = "Alert", confirmText = "OK") => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        type: "alert",
        title,
        message,
        confirmText,
        onConfirm: () => resolve(true),
        onCancel: null
      });
    });
  }, []);

  // Custom Confirm - non-blocking
  const showConfirm = useCallback((message, title = "Confirm", confirmText = "OK", cancelText = "Cancel") => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        type: "confirm",
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: () => resolve(true),
        onCancel: () => resolve(false)
      });
    });
  }, []);

  // Custom Prompt - non-blocking
  const showPrompt = useCallback((message, title = "Input", placeholder = "Enter your input...", confirmText = "OK", cancelText = "Cancel") => {
    return new Promise((resolve) => {
      setDialogState({
        isOpen: true,
        type: "prompt",
        title,
        message,
        placeholder,
        confirmText,
        cancelText,
        onConfirm: (value) => resolve(value),
        onCancel: () => resolve(null)
      });
    });
  }, []);

  return {
    dialogState,
    closeDialog,
    showAlert,
    showConfirm,
    showPrompt
  };
};

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 3000, position = "top-right") => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      message,
      type,
      duration,
      position,
      isVisible: true
    };

    setToasts(prev => [...prev, newToast]);

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccess = useCallback((message, duration, position) => {
    return addToast(message, "success", duration, position);
  }, [addToast]);

  const showError = useCallback((message, duration, position) => {
    return addToast(message, "error", duration, position);
  }, [addToast]);

  const showWarning = useCallback((message, duration, position) => {
    return addToast(message, "warning", duration, position);
  }, [addToast]);

  const showInfo = useCallback((message, duration, position) => {
    return addToast(message, "info", duration, position);
  }, [addToast]);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    clearAllToasts
  };
};