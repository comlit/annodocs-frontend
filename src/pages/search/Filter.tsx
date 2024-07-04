import React from 'react';
import { Box, Radio, RadioGroup, Stack, Select, Input } from "@chakra-ui/react";

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
  useOwnCommune: boolean;
  onOwnCommuneChange: (value: boolean) => void;
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
  lawTypes,
  useOwnCommune,
  onOwnCommuneChange
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
        <>
          <RadioGroup mt={4} value={useOwnCommune ? 'own' : 'other'} onChange={(e) => onOwnCommuneChange(e === 'own')}>
            <Stack direction="row" spacing={4}>
              <Radio value="own">Meine Kommune</Radio>
              <Radio value="other">Andere Kommune</Radio>
            </Stack>
          </RadioGroup>
          {!useOwnCommune && (
            <Input
              mt={4}
              placeholder="Kommune suchen"
              value={selectedKommune}
              onChange={(e) => onKommuneChange(e.target.value)}
            />
          )}
        </>
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
