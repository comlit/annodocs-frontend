// src/components/Tour.tsx

import React from 'react';
import Joyride, { CallBackProps, Step } from 'react-joyride';
import classNames from "classnames/bind";
import { useTour } from './TourContext';
import styles from '../pages/search/Search.module.css';//Für Nutzung in steps

const cx = classNames.bind(styles); // Bind classNames to your CSS module

const steps: Step[] = [
  //Dashboard
 
  {
    target: '.dashboard-eigene-annotationen',
    content: 'Hier sehen Sie die Gesetze, zu denen Sie selbst Annotationen erstellt haben.',
  },
  {
    target: '.dashboard-vorgeschlagene-gesetze',
    content: 'Diese Gesetze werden Ihnen auf Basis von Nutzern vorgeschlagen, die Ihnen ähneln',
  },
  {
    target: '.dashboard-favoriten',
    content: 'Sie können sich indivuell eine Auswahl von favorisierten Rechtsnormen zusammenstellen, die Sie besonders häufig benutzen',
  },
  {
    target: '.dashboard-last-visited',
    content: 'Hier sehen Sie jene Rechtsnormen, die Sie zuletzt aufgerufen haben',
  },
  {
    target: '.dashboard-gesetze-suchen',
    content: 'Klicken Sie jetzt auf diesen Button, um die Gesetzessuche zu starten',
  },
  {
    target: `.${cx('korbContainer')}`,
    content: 'test',
  },
  

];

export const Tour: React.FC = () => {
  const { isTourActive, stopTour } = useTour();

  const handleTourCallback = (data: CallBackProps) => {
    if (data.status === 'finished' || data.status === 'skipped') {
      stopTour();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={isTourActive}
      callback={handleTourCallback}
      continuous
      showSkipButton
      spotlightClicks
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
      locale={{
        back: 'Zurück',
        close: 'Schließen',
        last: 'Ende',
        next: 'Weiter',
        skip: 'Tour beenden',
      }}
    />
  );
};
