import { createContext, useContext, useState, ReactNode } from 'react';

export interface TourStep {
  id: string;
  title: string;
  description: string;
  targetElement?: string;
  route?: string;
  highlight?: boolean;
}

interface TourContextType {
  isTourActive: boolean;
  currentStep: number;
  steps: TourStep[];
  startTour: (steps: TourStep[]) => void;
  endTour: () => void;
  nextStep: () => void;
  previousStep: () => void;
  getCurrentStep: () => TourStep | null;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export function TourProvider({ children }: { children: ReactNode }) {
  const [isTourActive, setIsTourActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TourStep[]>([]);

  const startTour = (newSteps: TourStep[]) => {
    setSteps(newSteps);
    setCurrentStep(0);
    setIsTourActive(true);
  };

  const endTour = () => {
    setIsTourActive(false);
    setCurrentStep(0);
    setSteps([]);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      endTour();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentStep = (): TourStep | null => {
    return steps[currentStep] || null;
  };

  return (
    <TourContext.Provider
      value={{
        isTourActive,
        currentStep,
        steps,
        startTour,
        endTour,
        nextStep,
        previousStep,
        getCurrentStep,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
