import React from 'react';
import { Button } from '@chakra-ui/react';
import { useTour } from '../help_tour/TourContext';

export const StartTourButton: React.FC = () => {
  const { startTour } = useTour();

  return (
    <Button onClick={startTour} position = "fixed" zIndex = "1000" colorScheme="teal" variant="solid" marginLeft = "1%" marginTop="80vh" h = "15vh" w = "15vh" borderRadius="10">
      Starte Tour
    </Button>
  );
};
export default StartTourButton;