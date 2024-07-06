// src/components/MenuButton.tsx

import React from 'react';
import { Box, Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Stack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const MenuButton: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="fixed" top="75px" left="10px" zIndex="1000">  {/* Adjusted top value */}
      <Button onClick={onOpen} colorScheme="teal">
        Menu
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              <Link as={RouterLink} to="/" onClick={onClose}>Anmeldeseite</Link>
              <Link as={RouterLink} to="/dashboard" onClick={onClose}>Dashboard</Link>
              <Link as={RouterLink} to="/search" onClick={onClose}>Gesetze suchen</Link>
              <Link as={RouterLink} to="/create" onClick={onClose}>Annotation erstellen</Link>
              <Link as={RouterLink} to="/edit" onClick={onClose}>Gesetze verarbeiten</Link>
              <Link as={RouterLink} to="/upload" onClick={onClose}>Gesetze hochladen</Link>
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Schließen
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MenuButton;
