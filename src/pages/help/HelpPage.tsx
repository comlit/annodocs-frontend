import React from 'react';
import { useLocation, Link} from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Container,
  useColorModeValue,
  Icon,
  useBreakpointValue,
  IconProps
} from '@chakra-ui/react';

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
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: '1fr', md: '200px 1fr 200px' }} gap={4}>
        <GridItem>
          <Box
            
            position="fixed"
            marginTop="15%"
            right="2"
            zIndex="1000"
            bg={useColorModeValue('gray.100', 'gray.700')}
            p={6}
            rounded="lg"
            shadow="lg"
            w="20%"
            textAlign="left">

            <Heading as="h3" size="md" mb={2}>
              <u>Gehe zu:</u>
            </Heading>
            <Text mb={2}>
              <nav>
                <ul>
                  <li><Link to="/help#Dashboard">Hilfe: <u>Dashboard</u></Link></li>
                  <li><Link to="/help#Landing">Hilfe: <u>Willkommensseite</u></Link></li>
                  <li><Link to="/help#ediort">Hilfe: <u>Annotationen bearbeiten</u></Link></li>
                  <li><Link to="/help#upload">Hilfe: <u>Hochladen</u></Link></li>
                  <li><Link to="/help#Search">Hilfe: <u>Suchen</u></Link></li>
                  <li><Link to="/help#Terms"><u>Begriffe</u></Link></li>
                </ul>
              </nav>
            </Text>
          </Box>
        </GridItem>

        <GridItem>
          <Box py={8}>
            <Box   id="Dashboard" mt={16}>
              <Heading as="h2" size="lg" mt={16} >
                <a href = "dashboard"> Dashboard:</a>
              </Heading>
              <Text mt={4}>
                Auf der Dashboard-Seite sehen Sie selbst geschriebene Annotationen, 
                Ihre <u>Favoriten</u>, die <u>zuletzt besuchten Seiten</u> und <u>vorgeschlagene Gesetze</u>.
              </Text>
              <Text mt={4}>
                <u>Gesetze suchen & Annotation erstellen: </u>
                Durch die beiden Buttons "Gesetze suchen" und "Annotation erstellen" gelangen Sie zu den relvanten Menüs. Sie können auch zuerst 
                ein Gesetz mit der Gesetzessuche suchen und anschließend Annotationen vornehmen.
              </Text>
              <Text mt={4}>
                <u>Angezeigte Gesetze: </u>
                Sie können sich den vollen Namen eines Gesetzes anzeigen lassen, indem Sie den Mauszeiger über den jeweiligen Eintrag halten. 
                Durch einen Klick auf einen Eintrag gelangen Sie zum jewiligen Gesetzestext. Von dort aus können Sie auch Annotationen vornehmen.
              </Text>
            </Box>
            
            <Box id="Landing" mt={16}>
              <Heading as="h2" size="lg" mt={16}>
                Landing Page:
              </Heading>
              <Text mt={4}>
                Auf der Landing-Page können Sie sich sowohl anmelden, als auch registrieren.
              </Text>
              <Text mt={4}>
                <u>Anmeldung: </u> 
                Damit Sie sich anmelden, müssen Sie lediglich Ihre Daten eingeben. Wenn Sie ihr Passwort vergessen haben,
                können Sie auf "Passwort vergessen" drücken, um es herauszufinden.
              </Text>
              <Text mt={4}>
                <u>Registrierung: </u>
                Sollten Sie noch kein Konto bei uns haben, können Sie auf "Registrieren" klicken. Danach werden Sie gebeten Ihre Daten 
                einzugeben, um ein Nutzerkonto zu erstellen.
              </Text>
            </Box>

            <Box id="edit" mt={16}>
              <Heading as="h2" size="lg" mt={16}>
                <a href = "/editor"> Bearbeiten: </a>
              </Heading>
              <Text mt={4}>
                <p>Im Annotations-Editor sehen Sie sämtliche bereits getätigten Annotationen je Gesetz. Die Linien zeigen den Bereich an, auf den sich jede Annotation bezieht. Klicken Sie auf den Namen der Person, die diese Annotation erstellt hat, um sich die jeweilige Anmerkung anzuzeigen.
                  Um selbst eine Annotation zu erstellen, klicken Sie auf "Neue Annotation" und markieren Sie den Text, den Sie annotieren wollen, mit der Maus. Der Text muss nicht miteinander zusammenhängen.
                  </p>
                                  <p>  
                  Am rechten Bildrand des Rechtsnorm-Fensters können Sie zwischen einen Stift, dem Radiergummi und der Mülltonne auswählen.
                  <p><b>Stift</b>: Markieren Sie Textabschnitte, um diese Ihrer Annotation hinzuzufügen.</p>
                  <p><b>Radiergummi</b>: Entfernt ausgewählte Textabschnitte aus Annotation</p>
                  <p><b>Mülltonne</b>: Löscht die aktuelle Auswahl.</p>
                  </p>
                                  <p> 
                  Zusätzlich können Sie Modelle auswählen und erstellen, die mit Ihrer Annotation zusammenhängen.
                  Wählen Sie "Modelle bearbeiten" und entscheiden Sie sich zwischen "Entscheidungsbaum", "Prozessmodell" und "Formular"
                  
                  <p><b>Entscheidungsbaum</b>: Für einfache Ablaufketten</p>
                  <p><b>Prozessmodell</b>: BPMN-Modell, um eienn Ablauf darzustellen.
                  Für genauere Informationen, besuchen Sie <u><a   href= "https://www.bpmn.org">https://www.bpmn.org/</a></u></p>
                  <p><b>Formular</b>: Nutzen Sie Drag-and-Drop-Steuerung, um die Elemente an bestimmte Positionen zu ziehen.</p>
                  
                  </p>
                            
                  <p>Wählen Sie einen Namen für Ihre Annotaion und drücken Sie "Speichern", um die aktuelle Auswahl in die Datenbank zu überführen. Drücken Sie "zurück", um die aktuelle Annotation zu löschen.
                  </p>

              </Text>
            </Box>

            

            <Box id="upload" mt={16}>
              <Heading as="h2" size="lg" mt={16}>
                Hochladen:
              </Heading>
              <Text mt={4}>
              Die Upload-Seite steht Ihnen zur Verfügung, um Rechtsnormen zur Datenbank hinzuzufügen, die sich darin noch nicht befinden.
               Das ist insbesondere bei Rundschreiben der Fall, die nicht im regulärer Format  zur Verfügung gestellt werden.
Sie brauchen an dieser Stelle nur Name, Art und Kategorie des Gesetzes anzugeben und eine Datei im .pdf-Format auswählen. 

              </Text>
            </Box>

            <Box id="Search" mt={16}>
              <Heading as="h2" size="lg" mt={16}>
                Suchen:
              </Heading>
              <Text mt={4}>
                
Hier können Sie nach Gesetzen suchen. Wählen Sie zunächst Ihre Domäne aus und geben Sie gegebenenfalls weitere Daten an. Der Prozess führt Sie durch die nötigen Schritte. Im unteren Bildschirmabschnitt sehen Sie die Gesetze, auf die Ihre Spezifikation zutrifft. Von diesen können Sie beliebig viele in Ihre Auswahl aufnehmen.
Diese Auswahl sehen Sie an der rechten Bildschirmhälfte. Hier können Sie die Liste anpassen oder alle Rechtsnormen als neue Tabs öffnen. 

              </Text>
              <Text mt={4}>
                Wenn Sie ihre gewünschten Gesetze angegeben haben, gelangen Sie zu der Bearbeitungs-Seite.
              </Text>
            </Box>
          </Box>
          <Box id="terms" mt={16}>
              <Heading as="h2" size="lg" mt={16}>
                Begriffe:
              </Heading>
              <Text mt={4}>
                Annotation: Anmerkung, Vermerk; Hier: Mit einer Textstelle verknüpfte Modelle


              </Text>
            </Box>

        </GridItem>

        <GridItem>
          <Box
            position="fixed"
            top="70px"
            right="2"
            bg={useColorModeValue('gray.100', 'gray.700')}
            p={5}
            rounded="lg"
            shadow="xl"
            w="20%"
            textAlign="left"
          >
            <Heading as="h3" size="md" mb={2}>
              <u>Hilfe-Seite</u>
            </Heading>
            <Text mb={2}>
              Sie befinden sich auf der Hilfe-Seite. Verwenden Sie die "Gehe zu" Links, um zu den
              jeweiligen Aktivitäten zu navigieren.
            </Text>
          </Box>
        </GridItem>
      </Grid>
      <Blur
                    position={'fixed'}
                    top={-20}
                    left={-20}
                    style={{filter: 'blur(70px)'}}
                   
                />
    </Container>
       
  );
};
export const Blur = (props: IconProps) => {
  return (
      <Icon
          width={useBreakpointValue({base: '100%', md: '40vw', lg: '30vw'})}
          zIndex="useBreakpointValue({base: -1, md: -1, lg: 0})"
          height="560px"
          viewBox="0 0 528 560"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}>
          <circle cx="71" cy="61" r="111" fill="#F56565"/>
          <circle cx="244" cy="106" r="139" fill="#ED64A6"/>
          <circle cy="291" r="139" fill="#ED64A6"/>
          <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936"/>
          <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B"/>
          <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78"/>
          <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1"/>
      </Icon>
  );
};

export default HelpPage;
