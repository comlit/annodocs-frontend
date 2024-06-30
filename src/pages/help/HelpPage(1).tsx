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
      <h1><strong>Help Page</strong></h1>
      <br></br>
      <p>Gehe zu:</p>
      <nav>
        <ul>
          <li><Link to="/help#Dashboard">Hilfe: <u>Dashboard</u></Link></li>
          <li><Link to="/help#Landing">Hilfe: <u>Landing Page</u></Link></li>
          <li><Link to="/help#edit">Hilfe: <u>Bearbeiten</u></Link></li>
          <li><Link to="/help#create">Hilfe: <u>Erstellen</u></Link></li>
          <li><Link to="/help#upload">Hilfe: <u>Hochladen</u></Link></li>
          <li><Link to="/help#Search">Hilfe: <u>Suchen</u></Link></li>

        </ul>
      </nav>
      
      <div id="Dashboard">
        <h2>
          <br></br><br></br>
          <strong>Dashboard:</strong>
        </h2>
        <p>
          Auf der Dashboard-Seite sehen Sie selbst geschriebene Annotationen, 
          Ihre <u>Favoriten</u>, die <u>zuletzt besuchten Seiten</u> und <u>vorgeschlagene Gesetze</u>.
          <br></br><br></br>

          <u>Gesetze suchen & Annotation erstellen: </u>
          Durch die beiden Buttons "Gesetze suchen" und "Annotation erstellen" gelangen Sie zu den relvanten Menüs. Sie können auch zuerst 
          ein Gesetz mit der Gesetzessuche suchen und anschließend Annotationen vornehmen.
          <br></br><br></br>

          <u>Angezeigte Gesetze: </u>
           Sie können sich den vollen Namen eines Gesetzes anzeigen lassen, indem Sie den Mauszeiger über den jeweiligen Eintrag halten. 
          Durch einen Klick auf einen Eintrag gelangen Sie zum jewiligen Gesetzestext. Von dort aus können Sie auch Annotationen vornehmen.
        
        </p>
      </div>
      
      <div id="Landing">
        <h2>
          <br></br><br></br>
          <strong>Landing Page:</strong>
        </h2>
        <p>
          Auf der Landing-Page können Sie sich sowohl anmelden, als auch registrieren. 
          <br></br><br></br>
          
          <u>Anmeldung: </u> 
          Damit Sie sich anmelden, müssen Sie lediglich Ihre Daten eingeben. Wenn Sie ihr Passwort vergessen haben,
          können Sie auf "Passwort vergessen" drücken, um es herauszufinden.

          <br></br><br></br>
          <u>Registrierung: </u>
          Sollten Sie noch kein Konto bei uns haben, können Sie auf "Registrieren" klicken. Danach werden Sie gebeten Ihre Daten 
          einzugeben, um ein Nutzerkonto zu erstellen.

        </p>
      </div>
      
      <div id="edit">
        <h2>
          <br></br><br></br>
          <strong>Bearbeiten:</strong>
        </h2>
        <p>
          Auf dieser Seit können Sie Annotationen anschauen und nach Ihren Vorstellungen verändern.....
        </p>
      </div>
      
      <div id="create">
        <h2>
          <br></br><br></br>
          <strong>Erstellen:</strong>  
        </h2>
        <p>
          Auf dieser Seite können Sie Annotationen erstellen. Hierzu können Sie...
        </p>
      </div>
      
      <div id="upload">
        <h2>
          <br></br><br></br>
          <strong>Hochladen:</strong>  
        </h2>
        <p>
          Um Ihre Annotationen hochzuladen, können Sie....
        </p>
      </div>
      
      <div id="Search">
        <h2>
          <br></br><br></br>
          <strong>Suchen:</strong>  
        </h2>
        <p>
          Auf dieser Seite können Sie Gesetzestexte suchen...
          <br></br><br></br>
          Wenn Sie ihre gewünschten Gesetze angegeben haben, gelangen Sie zu der Bearbeitungs-Seite.
          <br></br><br></br>
        </p>
      </div>

    </div>
  );
};

export default HelpPage;

