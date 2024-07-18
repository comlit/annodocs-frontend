import React from 'react';
import { Box, Radio, RadioGroup, Stack, Select } from "@chakra-ui/react";

interface FilterProps {
  selectedType: string;
  onFilterChange: (type: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  selectedKommune: string;
  onKommuneChange: (kommune: string) => void;
  selectedLawType: string;
  onLawTypeChange: (lawType: string) => void;
  states: string[];
  communes: string[];
  lawTypes: string[];
}

const Filter: React.FC<FilterProps> = ({
  selectedType,
  onFilterChange,
  selectedState,
  onStateChange,
  selectedKommune,
  onKommuneChange,
  selectedLawType,
  onLawTypeChange,
  states,
  communes,
  lawTypes
}) => {
  return (
    <Box mb={4}>
      <RadioGroup onChange={onFilterChange} value={selectedType}>
        <Stack direction="row" spacing={4}>
          <Radio value="alle">Alle</Radio>
          <Radio value="bund">Bundesgesetze</Radio>
          <Radio value="land">Landesgesetze</Radio>
          <Radio value="kommunal">Gesetze für Kommunen</Radio>
        </Stack>
      </RadioGroup>
      {(selectedType === 'land' || selectedType === 'kommunal') && (
        <Select mt={4} placeholder="Bundesland auswählen" value={selectedState} onChange={(e) => onStateChange(e.target.value)}>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      )}
      {selectedType === 'kommunal' && selectedState && (
        <Select mt={4} placeholder="Kommune auswählen" value={selectedKommune} onChange={(e) => onKommuneChange(e.target.value)}>
          {communes.map((kommune) => (
            <option key={kommune} value={kommune}>
              {kommune}
            </option>
          ))}
        </Select>
      )}
      {selectedType !== 'alle' && (
        <Select mt={4} placeholder="Art des Gesetzes auswählen" value={selectedLawType} onChange={(e) => onLawTypeChange(e.target.value)}>
          {lawTypes.map((lawType) => (
            <option key={lawType} value={lawType}>
              {lawType}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
};

export default Filter;
