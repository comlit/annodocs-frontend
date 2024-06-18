// src/Filter.tsx
import React from 'react';
import { Box, Radio, RadioGroup, Stack, Select } from "@chakra-ui/react";

interface FilterProps {
  selectedType: string;
  onFilterChange: (type: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  selectedKommune: string;
  onKommuneChange: (kommune: string) => void;
  states: string[];
  communes: string[];
}

const Filter: React.FC<FilterProps> = ({
  selectedType,
  onFilterChange,
  selectedState,
  onStateChange,
  selectedKommune,
  onKommuneChange,
  states,
  communes
}) => {
  return (
    <Box mb={4}>
      <RadioGroup onChange={onFilterChange} value={selectedType}>
        <Stack direction="row" spacing={4}>
          <Radio value="alle">Alle</Radio>
          <Radio value="bund">Bundesgesetze</Radio>
          <Radio value="land">Landesgesetze</Radio>
          <Radio value="kommunal">Kommunalgesetze</Radio>
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
    </Box>
  );
};

export default Filter;
