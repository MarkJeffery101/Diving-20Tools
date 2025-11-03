import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { useTour } from '@/contexts/TourContext';
import { Button } from '@/components/ui/button';

export function TourPopup() {
  const navigate = useNavigate();
  const { isTourActive, currentStep, steps, nextStep, previousStep, endTour, getCurrentStep } =
    useTour();
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const currentStepData = getCurrentStep();

  useEffect(() => {
    if (!isTourActive) {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
      return;
    }

    setIsVisible(true);
    document.body.style.overflow = 'hidden';

    if (currentStepData?.targetElement) {
      const timer = setTimeout(() => {
        const element = document.getElementById(currentStepData.targetElement!);
        if (element) {
          setHighlightRect(element.getBoundingClientRect());
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setHighlightRect(null);
    }
  }, [isTourActive, currentStepData?.targetElement]);

  useEffect(() => {
    if (isTourActive && currentStepData?.route && currentStepData.route !== window.location.pathname) {
      navigate(currentStepData.route);
    }
  }, [isTourActive, currentStepData?.route, navigate]);

  if (!isTourActive || !currentStepData) {
    return null;
  }

  const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dark overlay with spotlight */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={endTour} />

      {/* Spotlight highlight on target element */}
      {highlightRect && currentStepData.targetElement && (
        <div
          className="absolute border-2 border-blue-400 rounded-xl shadow-2xl transition-all duration-300"
          style={{
            top: `${highlightRect.top + scrollY - 8}px`,
            left: `${highlightRect.left - 8}px`,
            width: `${highlightRect.width + 16}px`,
            height: `${highlightRect.height + 16}px`,
            boxShadow: `0 0 0 4000px rgba(0, 0, 0, 0.5), 0 0 30px rgba(59, 130, 246, 0.6)`,
            zIndex: 51,
          }}
        />
      )}

      {/* Main tour card */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ zIndex: 52 }}
      >
        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Decorative gradient bar */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500" />

          <div className="p-8">
            {/* Header with icon */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  {currentStepData.title}
                </h2>
              </div>
              <button
                onClick={endTour}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-8">{currentStepData.description}</p>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-xs text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mb-8">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    // Allow clicking on dots to jump to steps
                    if (index < currentStep) {
                      for (let i = 0; i < currentStep - index; i++) {
                        previousStep();
                      }
                    } else if (index > currentStep) {
                      for (let i = 0; i < index - currentStep; i++) {
                        nextStep();
                      }
                    }
                  }}
                  className={`transition-all rounded-full ${
                    index === currentStep
                      ? 'w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 scale-125'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                onClick={previousStep}
                disabled={currentStep === 0}
                variant="outline"
                className="flex-1 gap-2 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={nextStep}
                className="flex-1 gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0"
              >
                {currentStep === steps.length - 1 ? 'Finish' : 'Continue'}
                {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>

            {/* Skip option */}
            <button
              onClick={endTour}
              className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
