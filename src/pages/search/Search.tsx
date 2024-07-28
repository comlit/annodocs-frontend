import React, { useState, useEffect } from 'react';
import { Box, Button, Input, List, ListItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { dummyData1 } from './data';
import Filter from './Filter';
import styles from './Search.module.css';

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
const municipalLawTypes = ["Satzungen", "Verwaltungsvorschriften", "sonstige"];

const mockUser = {
  state: "Nordrhein-Westfalen",
  commune: "Unna" 
};

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(dummyData1);
  const [selectedType, setSelectedType] = useState('alle');
  const [selectedState, setSelectedState] = useState('');
  const [selectedKommune, setSelectedKommune] = useState('');
  const [selectedLawType, setSelectedLawType] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [communes, setCommunes] = useState<string[]>([]);
  const [lawTypes, setLawTypes] = useState<string[]>([]);
  const [useOwnState, setUseOwnState] = useState(false);
  const [useOwnCommune, setUseOwnCommune] = useState(false);
  const [communeInput, setCommuneInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    filterResults(query, selectedType, selectedState, selectedKommune, selectedLawType);
  }, [cart, selectedKommune]);

  useEffect(() => {
    if (selectedType === 'kommunal' && selectedState) {
      const filteredCommunes = [...new Set(dummyData1
        .filter(item => item.type === 'kommunal' && item.state === selectedState)
        .map(item => item.kommune)
      )].filter(Boolean) as string[]; 
      setCommunes(filteredCommunes);
    } else {
      setCommunes([]);
    }
  }, [selectedState, selectedType]);

  useEffect(() => {
    if (selectedType === 'bund') {
      setLawTypes(federalLawTypes);
    } else if (selectedType === 'land') {
      setLawTypes(stateLawTypes);
    } else if (selectedType === 'kommunal') {
      setLawTypes(municipalLawTypes);
    } else {
      setLawTypes([]);
    }
  }, [selectedType]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    filterResults(value, selectedType, selectedState, selectedKommune, selectedLawType);
  };

  const handleFilterChange = (type: string) => {
    setSelectedType(type);
    setSelectedState('');
    setSelectedKommune('');
    setSelectedLawType('')
    setUseOwnState(false);
    setUseOwnCommune(false);
    filterResults(query, type, '', '', '');
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    filterResults(query, selectedType, state, '', selectedLawType);
  };

  const handleKommuneChange = (kommune: string) => {
    setSelectedKommune(kommune);
    setCommuneInput(kommune);
    setShowSuggestions(false);
    filterResults(query, selectedType, selectedState, kommune, selectedLawType);
  };

  const handleLawTypeChange = (lawType: string) => {
    setSelectedLawType(lawType);
    filterResults(query, selectedType, selectedState, selectedKommune, lawType);
  };

  const handleOwnStateChange = (value: boolean) => {
    setUseOwnState(value);
    if (value) {
      setSelectedState(mockUser.state);
    } else {
      setSelectedState('');
    }
    filterResults(query, selectedType, value ? mockUser.state : '', selectedKommune, selectedLawType);
  };

  const handleOwnCommuneChange = (value: boolean) => {
    setUseOwnCommune(value);
    if (value) {
      setSelectedKommune(mockUser.commune);
    } else {
      setSelectedKommune('');
    }
    filterResults(query, selectedType, selectedState, value ? mockUser.commune : '', selectedLawType);
  };

  const filterResults = (searchQuery: string, lawType: string, state: string, kommune: string, lawCategory: string) => {
    let filteredResults = dummyData1;

    if (lawType !== 'alle') {
      filteredResults = filteredResults.filter(item => item.type === lawType);
    }

    if (lawType === 'land' && state) {
      filteredResults = filteredResults.filter(item => item.state === state);
    }

    if (lawType === 'kommunal' && state) {
      filteredResults = filteredResults.filter(item => item.state === state);
      if (kommune) {
        filteredResults = filteredResults.filter(item => item.kommune === kommune);
      }
    }

    if (lawCategory) {
      filteredResults = filteredResults.filter(item => item.lawType === lawCategory);
    }

    if (searchQuery) {
      filteredResults = filteredResults.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filteredResults = filteredResults.filter(item =>
      !cart.some(cartItem => cartItem.id === item.id)
    );

    setResults(filteredResults);
  };

  const handleResultClick = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const handleAddToCart = (item: any) => {
    setCart(prevCart => [...prevCart, item]);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const handleEmptyCart = () => {
    setCart([]);
  };

  const handleNavigateToEdit = () => {
    cart.forEach(item => {
      const url = `/edit/${item.id}`;
      const newTab = window.open(url, '_blank');
      if (newTab) {
        newTab.focus();
      } else {
        console.error(`Failed to open tab for item ID: ${item.id}`);
      }
    });
  };

  const handleCommuneInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCommuneInput(value);
    if (value) {
      const filteredSuggestions = communes.filter(commune =>
        commune.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (commune: string) => {
    handleKommuneChange(commune);
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.leftContainer}>
        <Box className={styles.innerContainer}>
          <h1 className={styles.title}>Suche</h1>
          <p className={styles.subtitle}>Hier können Sie nach Rechtsnormen suchen</p>
          <Input
            placeholder="Suchen..."
            value={query}
            onChange={handleSearch}
            className={styles.inputField}
          />
          <Filter
            selectedType={selectedType}
            onFilterChange={handleFilterChange}
            selectedState={selectedState}
            onStateChange={handleStateChange}
            selectedKommune={selectedKommune}
            onKommuneChange={handleKommuneChange}
            selectedLawType={selectedLawType}
            onLawTypeChange={handleLawTypeChange}
            states={germanStates}
            communes={communes}
            lawTypes={lawTypes}
            useOwnState={useOwnState}
            onOwnStateChange={handleOwnStateChange}
            useOwnCommune={useOwnCommune}
            onOwnCommuneChange={handleOwnCommuneChange}
          />
          {selectedType === 'kommunal' && selectedState && !useOwnCommune && (
            <Box mt={4} position="relative">
              <Input
                placeholder="Kommune suchen"
                value={communeInput}
                onChange={handleCommuneInputChange}
              />
              {showSuggestions && suggestions.length > 0 && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  right={0}
                  bg="white"
                  border="1px solid #ccc"
                  zIndex={10}
                >
                  <List>
                    {suggestions.map((suggestion, index) => (
                      <ListItem
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        cursor="pointer"
                        p={2}
                        _hover={{ backgroundColor: "#f0f0f0" }}
                      >
                        {suggestion}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          )}
        </Box>
        <Box className={styles.innerContainer}>
          <List spacing={3} className={styles.list}>
            {results.map(item => (
              <ListItem key={item.id} className={styles.listItem}>
                <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                  <Box flex="1">
                    <Button variant="link" onClick={() => handleResultClick(item.id)}>
                      {item.name}
                    </Button>
                  </Box>
                  <Box>
                    <Button size="sm" className={styles.button} onClick={() => handleAddToCart(item)}>
                      Zur Auswahlliste hinzufügen
                    </Button>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box className={styles.rightContainer}>
        <Box className={styles.korbContainer}>
          <h2 className={styles.subtitle}>Auswahlliste</h2>
          <p className={styles.warning}>Hinweis: Um mehrere Rechtsnormen gleichzeitig zu öffnen, müssen Sie Pop-ups in Ihrem Browser zulassen.</p>
          {cart.length === 0 ? (
            <> 
              <p>Ihre Auswahlliste ist leer</p>
            </>
          ) : (
            <>
              <List spacing={3} className={styles.list}>
                {cart.map(item => (
                  <ListItem key={item.id} className={styles.listItem}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                      <Box flex="1">
                        {item.name}
                      </Box>
                      <Box>
                        <Button size="sm" className={styles.button} onClick={() => handleRemoveFromCart(item.id)}>
                          Entfernen
                        </Button>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
              <Button className={styles.button} onClick={handleEmptyCart}>
                Auswahlliste leeren
              </Button>
              <Button className={styles.buttonRight} onClick={handleNavigateToEdit}>
                Alle öffnen
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Search;
