import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const StepIndicator = ({ currentStep, totalSteps, labels }: StepIndicatorProps) => {
  const defaultLabels = ["Personal Details", "Inter Details", "Scholarship Info"];
  const stepLabels = labels || defaultLabels;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`step-indicator ${
                  step < currentStep
                    ? "step-indicator-completed"
                    : step === currentStep
                    ? "step-indicator-active"
                    : "step-indicator-pending"
                }`}
              >
                {step < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                  step <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {stepLabels[index]}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded-full transition-colors duration-300 ${
                  step < currentStep ? "bg-success" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
