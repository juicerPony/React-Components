import { useState, useCallback } from "react";

export const useWizard = (totalSteps = 0) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [stepData, setStepData] = useState({});
  const [isComplete, setIsComplete] = useState(false);

  const goToStep = useCallback((stepIndex) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentStep(stepIndex);
    }
  }, [totalSteps]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => prev + 1);
    } else {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setIsComplete(true);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const jumpToStep = useCallback((stepIndex) => {
    // Allow jumping only to completed steps or next immediate step
    const maxAllowedStep = Math.max(...Array.from(completedSteps)) + 1;
    if (stepIndex <= maxAllowedStep && stepIndex < totalSteps) {
      setCurrentStep(stepIndex);
    }
  }, [completedSteps, totalSteps]);

  const updateStepData = useCallback((key, value) => {
    setStepData(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateMultipleStepData = useCallback((data) => {
    setStepData(prev => ({ ...prev, ...data }));
  }, []);

  const markStepAsCompleted = useCallback((stepIndex) => {
    setCompletedSteps(prev => new Set([...prev, stepIndex]));
  }, []);

  const markStepAsIncomplete = useCallback((stepIndex) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      newSet.delete(stepIndex);
      return newSet;
    });
  }, []);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setCompletedSteps(new Set());
    setStepData({});
    setIsComplete(false);
  }, []);

  const getProgress = useCallback(() => {
    return {
      current: currentStep + 1,
      total: totalSteps,
      percentage: Math.round(((currentStep + 1) / totalSteps) * 100),
      completed: completedSteps.size,
      isComplete
    };
  }, [currentStep, totalSteps, completedSteps.size, isComplete]);

  const canGoToStep = useCallback((stepIndex) => {
    if (stepIndex === 0) return true;
    return completedSteps.has(stepIndex - 1);
  }, [completedSteps]);

  const isStepCompleted = useCallback((stepIndex) => {
    return completedSteps.has(stepIndex);
  }, [completedSteps]);

  const validateStep = useCallback((stepIndex, validator) => {
    if (typeof validator === 'function') {
      return validator(stepData);
    }
    return true;
  }, [stepData]);

  return {
    // State
    currentStep,
    completedSteps,
    stepData,
    isComplete,

    // Navigation
    goToStep,
    nextStep,
    prevStep,
    jumpToStep,

    // Data management
    updateStepData,
    updateMultipleStepData,

    // Step status
    markStepAsCompleted,
    markStepAsIncomplete,
    isStepCompleted,
    canGoToStep,

    // Utilities
    reset,
    getProgress,
    validateStep,

    // Computed values
    isFirst: currentStep === 0,
    isLast: currentStep === totalSteps - 1,
    hasNext: currentStep < totalSteps - 1,
    hasPrev: currentStep > 0
  };
};

export const useStepValidation = (validationRules = {}) => {
  const [errors, setErrors] = useState({});

  const validateStep = useCallback((stepKey, data) => {
    const rules = validationRules[stepKey];
    if (!rules) return { isValid: true, errors: {} };

    const stepErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(field => {
      const rule = rules[field];
      const value = data[field];

      if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
        stepErrors[field] = rule.message || `${field} is required`;
        isValid = false;
      } else if (value && rule.pattern && !rule.pattern.test(value)) {
        stepErrors[field] = rule.message || `${field} is invalid`;
        isValid = false;
      } else if (value && rule.minLength && value.length < rule.minLength) {
        stepErrors[field] = rule.message || `${field} must be at least ${rule.minLength} characters`;
        isValid = false;
      } else if (value && rule.maxLength && value.length > rule.maxLength) {
        stepErrors[field] = rule.message || `${field} must be no more than ${rule.maxLength} characters`;
        isValid = false;
      } else if (rule.custom && !rule.custom(value, data)) {
        stepErrors[field] = rule.message || `${field} is invalid`;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, [stepKey]: stepErrors }));
    return { isValid, errors: stepErrors };
  }, [validationRules]);

  const clearErrors = useCallback((stepKey) => {
    if (stepKey) {
      setErrors(prev => ({ ...prev, [stepKey]: {} }));
    } else {
      setErrors({});
    }
  }, []);

  const getStepErrors = useCallback((stepKey) => {
    return errors[stepKey] || {};
  }, [errors]);

  const hasErrors = useCallback((stepKey) => {
    const stepErrors = errors[stepKey] || {};
    return Object.keys(stepErrors).length > 0;
  }, [errors]);

  return {
    validateStep,
    clearErrors,
    getStepErrors,
    hasErrors,
    errors
  };
};

export const useWizardPersistence = (storageKey = 'wizard-data') => {
  const saveToStorage = useCallback((data) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Failed to save wizard data to localStorage:', error);
    }
  }, [storageKey]);

  const loadFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Failed to load wizard data from localStorage:', error);
      return null;
    }
  }, [storageKey]);

  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn('Failed to clear wizard data from localStorage:', error);
    }
  }, [storageKey]);

  return {
    saveToStorage,
    loadFromStorage,
    clearStorage
  };
};