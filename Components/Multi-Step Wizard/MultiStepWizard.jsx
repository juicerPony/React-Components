import React, { useState, useEffect } from "react";

export default function MultiStepWizard({ 
  steps = [], 
  onComplete, 
  onStepChange,
  allowSkipSteps = false,
  showStepNumbers = true,
  theme = "default",
  orientation = "horizontal"
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [stepData, setStepData] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    onStepChange?.(currentStep, stepData);
  }, [currentStep, stepData, onStepChange]);

  const goToStep = (stepIndex) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return;
    
    // Check if we can navigate to this step
    if (!allowSkipSteps && stepIndex > currentStep + 1) return;
    if (!allowSkipSteps && stepIndex > 0 && !completedSteps.has(stepIndex - 1)) return;

    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(stepIndex);
      setIsAnimating(false);
    }, 150);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      // Mark current step as completed
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      goToStep(currentStep + 1);
    } else {
      // Wizard completed
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      onComplete?.(stepData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  const updateStepData = (key, value) => {
    setStepData(prev => ({ ...prev, [key]: value }));
  };

  const isStepCompleted = (stepIndex) => completedSteps.has(stepIndex);
  const isStepAccessible = (stepIndex) => {
    if (allowSkipSteps) return true;
    if (stepIndex === 0) return true;
    return isStepCompleted(stepIndex - 1);
  };

  const getStepStatus = (stepIndex) => {
    if (isStepCompleted(stepIndex)) return "completed";
    if (stepIndex === currentStep) return "current";
    if (isStepAccessible(stepIndex)) return "accessible";
    return "disabled";
  };

  const currentStepConfig = steps[currentStep] || {};

  return (
    <>
      <style>
        {`
          .wizard-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }

          .wizard-header {
            margin-bottom: 2rem;
          }

          .step-indicator {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            position: relative;
          }

          .step-indicator.vertical {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .step-indicator::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 2px;
            background: #e5e7eb;
            z-index: 1;
            transform: translateY(-50%);
          }

          .step-indicator.vertical::before {
            top: 0;
            bottom: 0;
            left: 15px;
            right: auto;
            width: 2px;
            height: 100%;
            transform: none;
          }

          .step-progress-line {
            position: absolute;
            top: 50%;
            left: 0;
            height: 2px;
            background: linear-gradient(90deg, #3b82f6, #1d4ed8);
            z-index: 2;
            transform: translateY(-50%);
            transition: width 0.3s ease;
            width: ${(currentStep / Math.max(steps.length - 1, 1)) * 100}%;
          }

          .step-indicator.vertical .step-progress-line {
            top: 0;
            left: 15px;
            width: 2px;
            height: ${(currentStep / Math.max(steps.length - 1, 1)) * 100}%;
            background: linear-gradient(180deg, #3b82f6, #1d4ed8);
            transform: none;
          }

          .step-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background: white;
            padding: 0.5rem;
            border-radius: 0.5rem;
            position: relative;
            z-index: 3;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .step-item:hover:not(.disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .step-item.disabled {
            cursor: not-allowed;
            opacity: 0.5;
          }

          .step-number {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 14px;
            border: 2px solid;
            transition: all 0.2s ease;
            flex-shrink: 0;
          }

          .step-item.completed .step-number {
            background: #10b981;
            border-color: #10b981;
            color: white;
          }

          .step-item.current .step-number {
            background: #3b82f6;
            border-color: #3b82f6;
            color: white;
            animation: pulse 1.5s infinite;
          }

          .step-item.accessible .step-number {
            background: white;
            border-color: #3b82f6;
            color: #3b82f6;
          }

          .step-item.disabled .step-number {
            background: #f3f4f6;
            border-color: #d1d5db;
            color: #9ca3af;
          }

          .step-info {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .step-title {
            font-weight: 600;
            font-size: 14px;
            color: #1f2937;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .step-item.disabled .step-title {
            color: #9ca3af;
          }

          .step-description {
            font-size: 12px;
            color: #6b7280;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .step-icon {
            width: 16px;
            height: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .wizard-content {
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            margin-bottom: 1.5rem;
            min-height: 300px;
            position: relative;
            overflow: hidden;
          }

          .step-content {
            opacity: ${isAnimating ? 0 : 1};
            transform: translateX(${isAnimating ? '20px' : '0'});
            transition: all 0.15s ease;
          }

          .wizard-controls {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
          }

          .wizard-button {
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            outline: none;
          }

          .wizard-button:focus {
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }

          .wizard-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .wizard-button.primary {
            background: #3b82f6;
            color: white;
          }

          .wizard-button.primary:hover:not(:disabled) {
            background: #2563eb;
            transform: translateY(-1px);
          }

          .wizard-button.secondary {
            background: #f3f4f6;
            color: #6b7280;
            border: 1px solid #d1d5db;
          }

          .wizard-button.secondary:hover:not(:disabled) {
            background: #e5e7eb;
            color: #374151;
            transform: translateY(-1px);
          }

          .progress-info {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #6b7280;
            font-size: 14px;
          }

          .progress-percentage {
            font-weight: 600;
            color: #3b82f6;
          }

          @keyframes pulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
            }
          }

          /* Dark theme */
          .wizard-container.dark {
            color: #f3f4f6;
          }

          .wizard-container.dark .wizard-content {
            background: #1f2937;
            color: #f3f4f6;
          }

          .wizard-container.dark .step-item {
            background: #374151;
          }

          .wizard-container.dark .step-title {
            color: #f3f4f6;
          }

          /* Mobile responsive */
          @media (max-width: 640px) {
            .wizard-container {
              padding: 0 1rem;
            }

            .step-indicator {
              flex-direction: column;
              gap: 1rem;
              align-items: stretch;
            }

            .step-indicator::before {
              display: none;
            }

            .step-progress-line {
              display: none;
            }

            .step-item {
              justify-content: flex-start;
            }

            .step-info {
              min-width: auto;
            }

            .step-title,
            .step-description {
              white-space: normal;
              overflow: visible;
              text-overflow: initial;
            }

            .wizard-controls {
              flex-direction: column;
              gap: 0.5rem;
            }

            .wizard-button {
              width: 100%;
            }
          }
        `}
      </style>

      <div className={`wizard-container ${theme}`}>
        <div className="wizard-header">
          <div className={`step-indicator ${orientation}`}>
            <div className="step-progress-line"></div>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-item ${getStepStatus(index)}`}
                onClick={() => isStepAccessible(index) && goToStep(index)}
              >
                <div className="step-number">
                  {isStepCompleted(index) ? (
                    <div className="step-icon">✓</div>
                  ) : showStepNumbers ? (
                    index + 1
                  ) : (
                    step.icon || "○"
                  )}
                </div>
                <div className="step-info">
                  <div className="step-title">{step.title}</div>
                  {step.description && (
                    <div className="step-description">{step.description}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="wizard-content">
          <div className="step-content">
            {currentStepConfig.component ? (
              <currentStepConfig.component
                data={stepData}
                updateData={updateStepData}
                onNext={nextStep}
                onPrev={prevStep}
                isFirst={currentStep === 0}
                isLast={currentStep === steps.length - 1}
              />
            ) : (
              <div>
                <h3>{currentStepConfig.title}</h3>
                <p>{currentStepConfig.content || 'No content provided for this step.'}</p>
              </div>
            )}
          </div>
        </div>

        <div className="wizard-controls">
          <div className="progress-info">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span className="progress-percentage">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="wizard-button secondary"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              className="wizard-button primary"
              onClick={nextStep}
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}