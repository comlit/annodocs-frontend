import {Box, Heading} from "@chakra-ui/react";

function Header() {
    return (
        <Box id='header' position='sticky' zIndex='1000' bg='gray.50' top='0' h='60px'
             boxShadow='0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)'>
            <Heading as='h1'>Annodocs</Heading>
        </Box>)
}

export default Header