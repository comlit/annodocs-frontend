
import { Heading, Button, Flex, Tooltip, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useTour } from '../help_tour/TourContext';

interface HeaderProps {
  specificHelpPage: string;
  pages: { name: string, path: string }[];
}

function Header({ specificHelpPage, pages }: HeaderProps) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();


  const { startTour } = useTour();
  
  
  return (
    <Flex

      id="header"
      position="fixed"
      zIndex="1000"
      width="100%"
      height="50px"
      boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)"
      align="center"
      justify="space-between"
      pl="10px"
      pr="10px"
      bgGradient='linear(to-l, gray.100,teal.500)'
      
    >
      <Flex align="center" width = "100%">
        <Heading as="h1" color="white" marginLeft ="0%" marginBottom = "5px">Annodocs </Heading>

        <Tooltip label="Tour" aria-label="Menü Tooltip">
        <Button 
        onClick={startTour}
         marginLeft = "79%"
         height="40px"
          width="40px"
          borderRadius="50%"
          bg="white"
          color="teal.500"
          textIndent="5px"
         >
          🚩
         </Button>
        </Tooltip>

        <Tooltip label="Menü" aria-label="Menü Tooltip">
        <IconButton
          aria-label="Open menu"
          icon={<HamburgerIcon />}
          variant="ghost"
          color="teal.500"
          marginLeft="1%"
          onClick={onOpen}
          borderRadius="50%"
          bg="white"
        />
        </Tooltip>
        <Tooltip label="Help" aria-label="Help Tooltip">
        <Button
          height="40px"
          width="40px"
          borderRadius="50%"
          bg="white"
          color="teal.500"
          marginLeft="1%"
          onClick={() => navigate(`/help#${specificHelpPage}`)}
        >
          <b>?</b>
        </Button>
      </Tooltip>

      </Flex>
      

      <Drawer onClose={onClose} isOpen={isOpen} >
        <DrawerOverlay />
        <DrawerContent >
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Navigation</DrawerHeader>
          <DrawerBody >
            <VStack spacing="20px" >
              {pages.map((page) => (
                <Button
                  key={page.path}
                  onClick={() => {
                    navigate(page.path);
                    onClose();
                  }}
                  width="100%"
                >
                  {page.name}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default Header;
