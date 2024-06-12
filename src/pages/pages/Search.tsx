// src/Search.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, List, ListItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { dummyData } from './data';
import Filter from './Filter';
import styles from './Search.module.css'; // Import the CSS module

let states = ["BW","BY","BE","BB","HB","HH","HE","MV","NI","NW","RP","SL","SN","ST","SH","TH"];


function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(dummyData);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedState, setSelectedState] = useState('');
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    filterResults(query, selectedType, selectedState);
  }, [cart]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    filterResults(value, selectedType, selectedState);
  };

  const handleFilterChange = (type: string) => {
    setSelectedType(type);
    setSelectedState(''); 
    filterResults(query, type, '');
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    filterResults(query, selectedType, state);
  };

  const filterResults = (searchQuery: string, lawType: string, state: string) => {
    let filteredResults = dummyData;

    if (lawType !== 'all') {
      filteredResults = filteredResults.filter(item => item.type === lawType);
    }

    if (lawType === 'state' && state) {
      filteredResults = filteredResults.filter(item => item.state === state);
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
    navigate('/edit/');
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.innerContainer}>
        <h1>Suche</h1>
        <p>Hier Gesetze suchen</p>
        <Input
          placeholder="Suche..."
          value={query}
          onChange={handleSearch}
          className={styles.inputField}
        />
        <Filter
          selectedType={selectedType}
          onFilterChange={handleFilterChange}
          selectedState={selectedState}
          onStateChange={handleStateChange}
          states={states}
        />
      </Box>
      <Box className={styles.innerContainer}>
        <List spacing={3}>
          {results.map(item => (
            <ListItem key={item.id}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button variant="link" onClick={() => handleResultClick(item.id)}>
                  {item.name}
                </Button>
                <Button size="sm" onClick={() => handleAddToCart(item)}>
                  zum Korb hinzufügen
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={styles.innerContainer} mt={8}>
        <h2>Korb</h2>
        <List spacing={3}>
          {cart.map(item => (
            <ListItem key={item.id}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                {item.name}
                <Button size="sm" onClick={() => handleRemoveFromCart(item.id)}>
                  aus Korb entfernen
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
        {cart.length > 0 && (
          <>
            <Button mt={4} onClick={handleEmptyCart}>
              Korb leeren
            </Button>
            <Button mt={4} ml={4} onClick={handleNavigateToEdit}>
              Gesetze anzeigen
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Search;