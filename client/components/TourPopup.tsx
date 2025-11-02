import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTour } from '@/contexts/TourContext';
import { Button } from '@/components/ui/button';

export function TourPopup() {
  const navigate = useNavigate();
  const { isTourActive, currentStep, steps, nextStep, previousStep, endTour, getCurrentStep } =
    useTour();
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 100, left: 100 });
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const currentStepData = getCurrentStep();

  useEffect(() => {
    if (!isTourActive || !currentStepData?.targetElement) {
      return;
    }

    const updatePosition = () => {
      const element = document.getElementById(currentStepData.targetElement!);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);

        const popupWidth = 320;
        const popupHeight = 250;
        const offset = 20;

        let top = rect.top + window.scrollY + rect.height + offset;
        let left = rect.left + window.scrollX + rect.width / 2 - popupWidth / 2;

        if (left < 10) left = 10;
        if (left + popupWidth > window.innerWidth - 10) {
          left = window.innerWidth - popupWidth - 10;
        }

        if (top + popupHeight > window.innerHeight + window.scrollY) {
          top = rect.top + window.scrollY - popupHeight - offset;
        }

        setPosition({ top, left });
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isTourActive, currentStepData?.targetElement]);

  useEffect(() => {
    if (isTourActive && currentStepData?.route && currentStepData.route !== window.location.pathname) {
      window.location.href = currentStepData.route;
    }
  }, [isTourActive, currentStepData?.route]);

  if (!isTourActive || !currentStepData) {
    return null;
  }

  return (
    <>
      {/* Semi-transparent overlay background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 39,
        }}
      />

      {/* Highlight box with spotlight effect */}
      {targetRect && currentStepData.highlight && (
        <div
          className="fixed pointer-events-none border-2 border-blue-500 rounded-lg"
          style={{
            top: targetRect.top + window.scrollY,
            left: targetRect.left + window.scrollX,
            width: targetRect.width,
            height: targetRect.height,
            boxShadow: '0 0 0 4000px rgba(0, 0, 0, 0.6)',
            zIndex: 40,
          }}
        />
      )}

      <div
        className="fixed bg-white rounded-lg shadow-2xl border border-gray-200 p-5 z-50 max-w-sm w-full mx-2 sm:w-96"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900">{currentStepData.title}</h3>
          <button
            onClick={endTour}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-700 mb-5 leading-relaxed">{currentStepData.description}</p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500 font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={previousStep}
              disabled={currentStep === 0}
              variant="outline"
              size="sm"
              className="gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </Button>
            <Button onClick={nextStep} size="sm" className="gap-1">
              {currentStep === steps.length - 1 ? 'Finish' : 'Continue'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-1 mt-4 justify-center">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentStep ? 'bg-blue-500 w-6' : 'bg-gray-300 w-1.5'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
