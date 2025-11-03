import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
import { useTour } from '@/contexts/TourContext';
import { toast } from 'sonner';

export function TourPopup() {
  const navigate = useNavigate();
  const { isTourActive, currentStep, steps, nextStep, endTour, getCurrentStep } = useTour();
  const currentStepData = getCurrentStep();

  useEffect(() => {
    if (!isTourActive || !currentStepData) return;

    // Navigate to the step's route if different
    if (currentStepData.route && currentStepData.route !== window.location.pathname) {
      navigate(currentStepData.route);
    }

    // Show toast notification
    const message = (
      <div className="w-full max-w-sm">
        <h3 className="font-bold text-base mb-2">{currentStepData.title}</h3>
        <p className="text-sm text-gray-200 mb-4">{currentStepData.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button
            onClick={() => nextStep()}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );

    toast.custom(
      (id) => (
        <div className="bg-gray-900 text-white rounded-lg shadow-lg p-4 border border-gray-800 w-full max-w-sm animate-in slide-in-from-bottom-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-base mb-2">{currentStepData.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{currentStepData.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1.5 rounded-full transition-all ${
                        index === currentStep ? 'bg-blue-500 w-6' : 'bg-gray-700 w-1.5'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-400 ml-4">
                  {currentStep + 1}/{steps.length}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                toast.dismiss(id);
                endTour();
              }}
              className="text-gray-400 hover:text-white flex-shrink-0 mt-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                toast.dismiss(id);
                endTour();
              }}
              className="flex-1 px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Skip Tour
            </button>
            <button
              onClick={() => {
                toast.dismiss(id);
                nextStep();
              }}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors flex items-center justify-center gap-1"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ),
      {
        position: 'bottom-center',
        duration: Infinity,
      }
    );

    return () => {
      // Cleanup - dismiss toast when unmounting or step changes
    };
  }, [isTourActive, currentStep, currentStepData, steps.length, navigate, nextStep, endTour]);

  return null;
}
