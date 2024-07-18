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
    target: `.${cx('inputField')}`,
    content: 'Geben Sie hier den Namen oder ein Stichwort aus dem Titel der gesuchten Rechtsnorm ein. Sie können die Suche durch Angabe der Domäne und Auswahl der Art von Rechtsnorm einschränken.',
  },
  {
    target: `.${cx('list')}`,
    content: 'Hier werden sämtliche Rechtsnormen angezeigt, die zu Ihrer Auswahl passen. Sie können nun beliebig viele Rechtsnormen Ihrer Auswahl hinzufügen. ',
  },
  {
    target: `.${cx('korbContainer')}`,
    content: 'Hier wird Ihre bisherige Auswahl angezeigt. Wenn Sie auf "Alle öffnen" klicken, werden die Rechtsnormen in neuen Browsertabs geöffnet. Dort können Sie Annotationen einsehen oder selbst tätigen',
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
