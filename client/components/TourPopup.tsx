import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTour } from '@/contexts/TourContext';
import { Button } from '@/components/ui/button';

export function TourPopup() {
  const { isTourActive, currentStep, steps, nextStep, previousStep, endTour, getCurrentStep } =
    useTour();

  const currentStepData = getCurrentStep();

  useEffect(() => {
    if (isTourActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isTourActive]);

  if (!isTourActive || !currentStepData) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={endTour} />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
        {/* Close button */}
        <button
          onClick={endTour}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentStepData.title}</h2>
        <p className="text-gray-700 text-sm leading-relaxed mb-6">{currentStepData.description}</p>

        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-gray-500 font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex gap-1">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? 'bg-blue-500 w-6' : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={previousStep}
            disabled={currentStep === 0}
            variant="outline"
            className="flex-1 gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={nextStep} className="flex-1 gap-2">
            {currentStep === steps.length - 1 ? 'Finish' : 'Continue'}
            {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
