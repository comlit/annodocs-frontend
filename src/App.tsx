import './App.css'
import {Box, Center, Flex} from "@chakra-ui/react";
import Header from "./layout/Header.tsx";
import Footer from "./layout/Footer.tsx";

function App() {

    return (
        <>
            <Flex id='layout' minH='100vh' direction='column'>
                <Header/>
                <Box id='content'>
                    <Center> dfgfdg</Center>
                </Box>
                <Footer/>
            </Flex>
        </>
    )
}

export default App
