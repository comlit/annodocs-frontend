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
  useOwnState: boolean;
  onOwnStateChange: (value: boolean) => void;
  useOwnCommune: boolean;
  onOwnCommuneChange: (value: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedType,
  onFilterChange,
  selectedState,
  onStateChange,
  selectedLawType,
  onLawTypeChange,
  states,
  lawTypes,
  useOwnState,
  onOwnStateChange,
  useOwnCommune,
  onOwnCommuneChange
}) => {
  return (
    <Box mb={4}>
      <RadioGroup onChange={onFilterChange} value={selectedType}>
        <Stack direction="row" spacing={4}>
          <Radio value="alle">Alle</Radio>
          <Radio value="bund">Bundesebene</Radio>
          <Radio value="land">Landesebene</Radio>
          <Radio value="kommunal">Kommunalebene</Radio>
        </Stack>
      </RadioGroup>
      {(selectedType === 'land' || selectedType === 'kommunal') && (
        <>
          <RadioGroup mt={4} value={useOwnState ? 'own' : 'other'} onChange={(e) => onOwnStateChange(e === 'own')}>
            <Stack direction="row" spacing={4}>
              <Radio value="own">Mein Bundesland</Radio>
              <Radio value="other">Anderes Bundesland</Radio>
            </Stack>
          </RadioGroup>
          {!useOwnState && (
            <Select mt={4} placeholder="Bundesland auswählen" value={selectedState} onChange={(e) => onStateChange(e.target.value)}>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          )}
        </>
      )}
      {selectedType === 'kommunal' && selectedState && (
        <>
          <RadioGroup mt={4} value={useOwnCommune ? 'own' : 'other'} onChange={(e) => onOwnCommuneChange(e === 'own')}>
            <Stack direction="row" spacing={4}>
              <Radio value="own">Meine Kommune</Radio>
              <Radio value="other">Andere Kommune</Radio>
            </Stack>
          </RadioGroup>
        </>
      )}
      {selectedType !== 'alle' && (
        <Select mt={4} placeholder="Art auswählen" value={selectedLawType} onChange={(e) => onLawTypeChange(e.target.value)}>
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
