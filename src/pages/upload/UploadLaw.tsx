import React, { useState } from 'react';
import { Box, Button, Input, Select, FormControl, FormLabel, Radio, RadioGroup, Stack, Textarea, IconProps, Icon, useBreakpointValue } from "@chakra-ui/react";
import styles from './UploadLaw.module.css';

const germanStates = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Thüringen"
];

const federalLawTypes = ["Verfassung", "Rechtsverordnung", "Satzung", "Verwaltungsvorschrift", "sonstige"];
const stateLawTypes = ["Verfassung", "Rechtsverordnung", "Satzung", "Verwaltungsvorschrift", "sonstige"];
const municipalLawTypes = ["Satzung", "Verwaltungsvorschrift", "sonstige"];

const UploadLaw: React.FC = () => {
  const [selectedType, setSelectedType] = useState('bund');
  const [selectedState, setSelectedState] = useState('');
  const [selectedKommune, setSelectedKommune] = useState('');
  const [kommuneMethod, setKommuneMethod] = useState('predefined');
  const [selectedLawType, setSelectedLawType] = useState('');
  const [lawName, setLawName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [lawText, setLawText] = useState('');
  const [importMethod, setImportMethod] = useState('file');
  const [lawTypes, setLawTypes] = useState<string[]>(federalLawTypes);
  const [lawFormat, setLawFormat] = useState('paragraph'); 

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setSelectedState('');
    setSelectedKommune('');
    setSelectedLawType('');
    if (type === 'bund') {
      setLawTypes(federalLawTypes);
    } else if (type === 'land') {
      setLawTypes(stateLawTypes);
    } else if (type === 'kommunal') {
      setLawTypes(municipalLawTypes);
    }
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedKommune('');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create a form data object to hold user input attributes
    let payload;

    if (file && importMethod === 'file') {
      try {
        // Lies den Inhalt der JSON-Datei
        const fileContent = await file.text();
        const jsonContent = JSON.parse(fileContent);

        // Füge die Benutzereingabe-Attribute zum JSON-Objekt hinzu
        jsonContent.ebene = selectedType;
        jsonContent.state = selectedState;
        jsonContent.kommune = selectedType === 'kommunal'
            ? (kommuneMethod === 'predefined' ? selectedKommune : 'Eigene Kommune')
            : '';
        jsonContent.typ = selectedLawType;

        payload = jsonContent;

      } catch (error) {
        console.error('Fehler beim Lesen oder Aktualisieren der Datei:', error);
        alert('Beim Verarbeiten der Datei ist ein Fehler aufgetreten');
        return;
      }
    } else {
      // For text upload, create a JSON object with the text content
      payload = {
        content: lawText,
        ebene: selectedType,
        state: selectedState,
        kommune: kommuneMethod === 'predefined' ? selectedKommune : 'Eigene Kommune',
        typ: selectedLawType,
      };
    }
  
    try {
      // Send the form data to the backend
      const response = await fetch('http://localhost:8080/api/gesetze/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('Gesetz wurde erfolgreich hochgeladen');
      } else {
        alert('Es gab eine Fehlermeldung beim Upload');
      }
    } catch (error) {
      console.error('Error uploading law:', error);
      alert('An error occurred while uploading the law');
    }
  };
  return (
    <Box className={styles.container}>
      <Box className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <div className={styles.formColumn}>
              <FormControl id="law-name" className={styles.inputLabel}>
                <FormLabel>Name der Rechtsnorm</FormLabel>
                <Input 
                  placeholder="Name der Rechtsnorm" 
                  value={lawName} 
                  onChange={(e) => setLawName(e.target.value)}
                  className={styles.inputField} 
                />
              </FormControl>
              <FormControl id="law-type" className={styles.inputLabel}>
                <FormLabel>Ebene</FormLabel>
                <Select 
                  value={selectedType} 
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className={styles.inputField}
                >
                  <option value="bund">Bundesebene</option>
                  <option value="land">Landesebene</option>
                  <option value="kommunal">Kommunalebene</option>
                </Select>
              </FormControl>
              {(selectedType === 'land' || selectedType === 'kommunal') && (
                <FormControl id="state" className={styles.inputLabel}>
                  <FormLabel>Bundesland</FormLabel>
                  <Select 
                    placeholder="Bundesland auswählen" 
                    value={selectedState} 
                    onChange={(e) => handleStateChange(e.target.value)}
                    className={styles.inputField}
                  >
                    {germanStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
              {selectedType === 'kommunal' && selectedState && (
                <>
                  <FormControl id="kommune-method" className={styles.inputLabel}>
                    <FormLabel>Kommune</FormLabel>
                    <RadioGroup onChange={(value) => setKommuneMethod(value)} value={kommuneMethod}>
                      <Stack direction="column">
                        <Radio value="custom">Eigene Kommune</Radio>
                        <Radio value="predefined">Andere Kommunen</Radio>                        
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  {kommuneMethod === 'predefined' && (
                    <FormControl id="kommune" className={styles.inputLabel}>
                      <FormLabel>Kommune</FormLabel>
                      <Input
                        placeholder="Name eingeben"
                        value={selectedKommune}
                        onChange={(e) => setSelectedKommune(e.target.value)}
                        className={styles.inputField}
                      />
                    </FormControl>
                  )}
                </>
              )}
            </div>
            <div className={styles.formColumn}>
              {selectedType !== 'alle' && (
                <FormControl id="law-category" className={styles.inputLabel}>
                  <FormLabel>Kategorie</FormLabel>
                  <Select 
                    placeholder="Kategorie auswählen" 
                    value={selectedLawType} 
                    onChange={(e) => setSelectedLawType(e.target.value)}
                    className={styles.inputField}
                  >
                    {lawTypes.map((lawType) => (
                      <option key={lawType} value={lawType}>
                        {lawType}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
              
              <FormControl id="import-method" className={styles.inputLabel}>
                <FormLabel>Importmethode</FormLabel>
                <RadioGroup onChange={(value) => setImportMethod(value)} value={importMethod}>
                  <Stack direction="row">
                    <Radio value="file">Datei</Radio>
                    <Radio value="text">Text</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              {importMethod=='file' && (
                <FormControl id="law-format" className={styles.inputLabel}>
                <FormLabel>Format</FormLabel>
                <RadioGroup onChange={(value) => setLawFormat(value)} value={lawFormat}>
                  <Stack direction="row">
                    <Radio value="paragraph">Paragraphstruktur</Radio>
                    <Radio value="artikel">Artikelstruktur</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              )}
              {importMethod === 'file' && (
                <FormControl id="file-upload" className={styles.inputLabel}>
                  <FormLabel>Datei auswählen</FormLabel>
                  <Input 
                    type="file" 
                    accept=".json" 
                    onChange={handleFileChange}
                    className={styles.inputField}
                  />
                  {file && <span className="fileName">{file.name}</span>}
                </FormControl>
            ) 
              }
              
              {importMethod === 'text' && (
                  <Textarea
                    placeholder="Rechtsnormtext eingeben"
                    value={lawText}
                    onChange={(e) => setLawText(e.target.value)}
                    className={styles.fullSizeTextArea}
                  />
              )}
            </div>
          </div>
          <Button type="submit" colorScheme="blue" className={styles.button}>Hochladen</Button>
        </form>
      </Box>
      <Blur
                    position={'absolute'}
                    top={-20}
                    left={-20}
                    style={{filter: 'blur(70px)'}}
                />
  </Box>
);
};
export const Blur = (props: IconProps) => {
  return (
      <Icon
          width={useBreakpointValue({base: '100%', md: '40vw', lg: '30vw'})}
          zIndex={useBreakpointValue({base: -1, md: -1, lg: 0})}
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
export default UploadLaw;
