import React, { useState } from 'react';
import { Box, Button, Input, Select, FormControl, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import styles from './UploadLaw.module.css';
import { dummyData1 } from './data';

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

const federalLawTypes = ["Verfassung", "Rechtsverordnungen", "Satzungen", "Verwaltungsvorschriften", "sonstige"];
const stateLawTypes = ["Verfassung", "Rechtsverordnungen", "Satzungen", "Verwaltungsvorschriften", "sonstige"];
const municipalLawTypes = ["Satzung", "Verwaltungsvorschrift", "sonstige"];

const UploadLaw = () => {
  const [selectedType, setSelectedType] = useState('bund');
  const [selectedState, setSelectedState] = useState('');
  const [selectedKommune, setSelectedKommune] = useState('');
  const [selectedLawType, setSelectedLawType] = useState('');
  const [lawName, setLawName] = useState('');
  const [file, setFile] = useState(null);
  const [communes, setCommunes] = useState<string[]>([]);
  const [lawTypes, setLawTypes] = useState<string[]>(federalLawTypes);
  const navigate = useNavigate();

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
    if (selectedType === 'kommunal') {
      // Update the communes list based on the selected state
      const filteredCommunes = [...new Set(dummyData1
        .filter(item => item.type === 'kommunal' && item.state === state)
        .map(item => item.kommune)
      )].filter(Boolean) as string[]; // Ensure the filtered list contains only strings
      setCommunes(filteredCommunes);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle file upload and form submission logic here
    console.log({
      lawName,
      selectedType,
      selectedState,
      selectedKommune,
      selectedLawType,
      file
    });
  };

  return (
    <Box className={styles.container}>
      <form onSubmit={handleSubmit}>
        <FormControl id="law-name" mb={4}>
          <FormLabel>Name des Gesetzes</FormLabel>
          <Input 
            placeholder="Name des Gesetzes" 
            value={lawName} 
            onChange={(e) => setLawName(e.target.value)} 
          />
        </FormControl>
        <FormControl id="law-type" mb={4}>
          <FormLabel>Art des Gesetzes</FormLabel>
          <Select 
            value={selectedType} 
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            <option value="bund">Bundesgesetze</option>
            <option value="land">Landesgesetze</option>
            <option value="kommunal">Kommunalgesetze</option>
          </Select>
        </FormControl>
        {(selectedType === 'land' || selectedType === 'kommunal') && (
          <FormControl id="state" mb={4}>
            <FormLabel>Bundesland</FormLabel>
            <Select 
              placeholder="Bundesland auswählen" 
              value={selectedState} 
              onChange={(e) => handleStateChange(e.target.value)}
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
          <FormControl id="kommune" mb={4}>
            <FormLabel>Kommune</FormLabel>
            <Select 
              placeholder="Kommune auswählen" 
              value={selectedKommune} 
              onChange={(e) => setSelectedKommune(e.target.value)}
            >
              {communes.map((kommune) => (
                <option key={kommune} value={kommune}>
                  {kommune}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        {selectedType !== 'alle' && (
          <FormControl id="law-category" mb={4}>
            <FormLabel>Kategorie des Gesetzes</FormLabel>
            <Select 
              placeholder="Kategorie auswählen" 
              value={selectedLawType} 
              onChange={(e) => setSelectedLawType(e.target.value)}
            >
              {lawTypes.map((lawType) => (
                <option key={lawType} value={lawType}>
                  {lawType}
                </option>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl id="file-upload" mb={4}>
          <FormLabel>Gesetz als PDF hochladen</FormLabel>
          <Input 
            type="file" 
            accept=".pdf" 
            onChange={handleFileChange} 
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">Hochladen</Button>
      </form>
    </Box>
  );
};

export default UploadLaw;
