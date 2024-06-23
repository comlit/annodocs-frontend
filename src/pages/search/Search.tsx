import React from 'react';
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
const stateLawTypes = ["Verfassungen", "Rechtsverordnungen", "Satzungen", "Verwaltungsvorschriften", "sonstige"];
const municipalLawTypes = ["Satzungen", "Verwaltungsvorschriften", "sonstige"];

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState(dummyData1);
  const [selectedType, setSelectedType] = React.useState('alle');
  const [selectedState, setSelectedState] = React.useState('');
  const [selectedKommune, setSelectedKommune] = React.useState('');
  const [selectedLawType, setSelectedLawType] = React.useState('');
  const [cart, setCart] = React.useState<any[]>([]);
  const [communes, setCommunes] = React.useState<string[]>([]);
  const [lawTypes, setLawTypes] = React.useState<string[]>([]);

  React.useEffect(() => {
    filterResults(query, selectedType, selectedState, selectedKommune, selectedLawType);
  }, [cart]);

  React.useEffect(() => {
    if (selectedType === 'kommunal' && selectedState) {
      const filteredCommunes = [...new Set(dummyData1
        .filter(item => item.type === 'kommunal' && item.state === selectedState)
        .map(item => item.kommune)
      )].filter(Boolean) as string[]; // Ensure the filtered list contains only strings
      setCommunes(filteredCommunes);
    } else {
      setCommunes([]);
    }
  }, [selectedState, selectedType]);

  React.useEffect(() => {
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
    setSelectedLawType('');
    filterResults(query, type, '', '', '');
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedKommune('');
    filterResults(query, selectedType, state, '', selectedLawType);
  };

  const handleKommuneChange = (kommune: string) => {
    setSelectedKommune(kommune);
    filterResults(query, selectedType, selectedState, kommune, selectedLawType);
  };

  const handleLawTypeChange = (lawType: string) => {
    setSelectedLawType(lawType);
    filterResults(query, selectedType, selectedState, selectedKommune, lawType);
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

  return (
    <Box className={styles.container}>
      <Box className={styles.leftContainer}>
        <Box className={styles.innerContainer}>
          <h1 className={styles.title}>Suche</h1>
          <p className={styles.subtitle}>Hier können Sie nach Gesetzen suchen</p>
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
          />
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
          {cart.length === 0 ? (
            <><p className={styles.warning}> Um mehrere Gesetze gleichzeitig zu öffnen, müssen Sie Pop-ups in Ihrem Browser zulassen.</p><p>Ihre Auswahlliste ist leer</p></>
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
