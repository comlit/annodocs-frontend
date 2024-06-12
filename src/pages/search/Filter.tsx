
import React from 'react';
import { Box, Radio, RadioGroup, Stack, Select } from "@chakra-ui/react";

interface FilterProps {
  selectedType: string;
  onFilterChange: (type: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  states: string[];
}

const Filter: React.FC<FilterProps> = ({
  selectedType,
  onFilterChange,
  selectedState,
  onStateChange,
  states
}) => {
  return (
    <Box mb={4}>
      <RadioGroup onChange={onFilterChange} value={selectedType}>
        <Stack direction="row" spacing={4}>
          <Radio value="all">Alle</Radio>
          <Radio value="bund">Bundesgesetz</Radio>
          <Radio value="land">Landesgesetz</Radio>
          <Radio value="kommunal">Kommunalgesetz</Radio>
        </Stack>
      </RadioGroup>
      {selectedType === 'land' && (
        <Select mt={4} placeholder="Land auswahlen" value={selectedState} onChange={(e) => onStateChange(e.target.value)}>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </Select>
      )}
    </Box>
  );
};

export default Filter;
