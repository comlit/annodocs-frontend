import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';


interface TourContextProps {
  startTour: () => void;
  stopTour: () => void;
  isTourActive: boolean;
}

const TourContext = createContext<TourContextProps | undefined>(undefined);

export const TourProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isTourActive, setIsTourActive] = useState(false);

  const startTour = () => {
    setIsTourActive(true);
  };

  const stopTour = () => {
      setIsTourActive(false);
  };

  useEffect(() => {
    if (isTourActive) {
      // Check if elements are mounted
      const interval = setInterval(() => {
        const stepElement = document.querySelector('.your-target-class-1');
        if (stepElement) {
          clearInterval(interval);
        }
      }, 100);

      // Timeout to stop checking after some time
      setTimeout(() => {
        clearInterval(interval);
      }, 5000);
    }
  }, [isTourActive]);

  return (
    <TourContext.Provider value={{ startTour, stopTour, isTourActive }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTour = () => {
  const context = useContext(TourContext);
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
};