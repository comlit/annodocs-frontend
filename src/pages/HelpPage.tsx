// src/HelpPage.tsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const HelpPage: React.FC = () => {
  const location = useLocation();

  React.useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div>
      <h1>Help Page</h1>
      <nav>
        <ul>
          <li><Link to="/help#Dashboard">Section 1</Link></li>
          <li><Link to="/help#Landing">Section 2</Link></li>
          <li><Link to="/help#edit">Section 3</Link></li>
          <li><Link to="/help#create">Section 1</Link></li>
          <li><Link to="/help#upload">Section 2</Link></li>
        </ul>
      </nav>
      <div id="Dashboard">
        <h2>
          
          Auf der Dashboard-Seite sehen Sie selbst geschriebene Annotationen, die von Ihnen gesetzten Favoriten sowie zuletzt besuchte Seiten und vorgeschlagene Gesetze.
          GESETZE SUCHEN & ANNOTATION ERSTELLEN:
          Durch die beiden Buttons "Gesetze suchen" und "Annotation erstellen" gelangen Sie zu den relvanten Menüs. Sie können auch zuerst ein Gesetz mit der Gesetzessuche suchen und anschließend Annotationen vornehmen.

          ANGEZEIGTE GESETZE:
          Sie können sich den vollen Namen eines Gesetzes anzeigen lassen, indem Sie den Mauszeiger über den jeweiligen Eintrag halten. 
          Durch einen Klick auf einen Eintrag gelangen Sie zum jewiligen Gesetzestext. Von dort aus können Sie auch Annotationen vornehmen.            
        </h2>
        <p>
        </p>
      </div>
      <div id="Landing">
        <h2>Section 2</h2>
        <p></p>
      </div>
      <div id="edit">
        <h2>Section 3</h2>
        <p>This is the content for section 3.</p>
      </div>
      <div id="create">
        <h2>Section 3</h2>
        <p>This is the content for section 3.</p>
      </div>
      <div id="upload">
        <h2>Section 3</h2>
        <p>This is the content for section 3.</p>
      </div>
    </div>
  );
};

export default HelpPage;

