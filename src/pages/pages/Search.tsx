import React, { useState } from 'react';
import { AbsoluteCenter, Button, Input, Box, List, ListItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { dummyData } from './data';

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(dummyData);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value) {
      const filteredResults = dummyData.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults(dummyData);
    }
  };

  const handleResultClick = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <AbsoluteCenter>
      <h1>Suche</h1>
      <p>Hier Gesetze suchen</p>
      <Input
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        mb={4}
      />
      <Box>
        <List spacing={3}>
          {results.map(item => (
            <ListItem key={item.id}>
              <Button variant="link" onClick={() => handleResultClick(item.id)}>
                {item.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Button mt={4} onClick={() => navigate('/edit')}>Ergebnisse Anzeigen </Button>
    </AbsoluteCenter>
  );
}

export default Search;