import { 
    Box, 
    Button, 
    Flex, 
    Heading,
    Stack, 
    Text,
    IconProps,
    useBreakpointValue,
    Icon,
    HStack,
    useColorModeValue,
    Tooltip,
    } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userMockData, annotationsMockData, recommendedMockData, lastVisitedMockData, favoritesMockData, } from "./dummydata.ts"; 
//Placeholder Werte
function Dashboard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [titel, setTitel] = useState('');
    const [loading, setLoading] = useState(true);
    const [annotations, setAnnotations] = useState([]);
    const [recommendations, setRecommendations] =  useState([]);
    const [lastvisited, setLastVisited] =  useState([]);
    const [favorites,setFavorites] =  useState([]);


    useEffect(() => {
        setTimeout(() => {
            setEmail(userMockData.email);
            setName(userMockData.name);
            setTitel(userMockData.titel);
            //
            setLoading(false);
        }, 1000);

        setTimeout(() => {
            setAnnotations(annotationsMockData);
            setRecommendations(recommendedMockData);
            setFavorites(favoritesMockData);
            setLastVisited(lastVisitedMockData);
        }, 1000);
    }, []);

    const bg = useColorModeValue('gray.100', 'gray.700');

    return (
        <Box marginTop = "20px" h="100vh" w="100vw" display="flex" alignItems="center" justifyContent="flex-end" bg={bg}>
            <Box p={8} maxW="6xl" w="full" >
                <HStack spacing = {4} alignItems="flex-start">
                
                <Stack spacing={2}>
                    <Heading as="h1" size="xl" textAlign="center">
                        Guten Tag, {titel} {name}
                    </Heading>
                    <Text fontSize='xl' textAlign='center'>Hier finden Sie Informationen zu Ihren Daten und letzen Aktivitäten</Text>

                    <Flex justify="center" gap={4} height={{ base: "50px", md: "80px" }}>
                        <Button boxShadow="md" fontSize="xl" w="50%" height="full" colorScheme="blue" onClick={() => navigate('/search')}>
                            Gesetze suchen
                        </Button>
                        <Button boxShadow="md" fontSize="xl" w="50%" height="full" colorScheme="teal" onClick={() => navigate('/create')}>
                            Annotation erstellen
                        </Button>
                    </Flex>
                    //eigene Annotationen
                    <Box  height = "30vh" mt={5} p={4} bg="white" boxShadow="md" borderRadius="md" textAlign="center">
                        <Heading as="h2" size="md" mb={4}>
                            Eigene Annotationen
                        </Heading>
                        {annotations.length > 0 ? (
                            <Box maxH="150px" overflowY="auto" >
                                <Stack spacing={3}>//HStack law idx; annotation
                                    {annotations.map((annotation, index) => (
                                    <Tooltip key={index} label={annotation.text} hasArrow>
                                        <Box 
                                            key={index} 
                                            p={3} 
                                            bg="gray.50"
                                            borderRadius="md" 
                                            cursor="pointer"
                                            maxH="30"
                                            display = "flex"
                                            alignItems="center"
                                            _hover={{ bg: "gray.100" }}
                                            onClick={() => navigate(`/search?lawIndex=${annotation.lawIndex}`)}
                                        >
                                            <Text color = "gray.700">
                                                {annotation.text.length > 70 ? annotation.text.substring(0, 70) + '...' : annotation.text}
                                            </Text>
                                            
                                        </Box>
                                    </Tooltip>
                                    ))}
                                </Stack>
                                
                            </Box>
                        ) : (
                            <Text>Keine Annotationen gefunden.</Text>
                        )}
                    </Box>
                    //Vorgeschlagene Gesetze;
                    <Box height = "30vh" mt={5} p={4} bg="white" boxShadow="md" borderRadius="md" textAlign="center">
                    <Heading as="h2" size="md" mb={4}>
                            Vorgeschlagene Gesetze
                        </Heading>
                        {recommendations.length > 0 ? (
                            <Box maxH="150px" overflowY="auto">
                                <Stack spacing={3}>
                                    {recommendations.map((recommendations, index) => (
                                        <Tooltip key={index} label={recommendations.text} hasArrow>

                                            <Box 
                                            key={index} 
                                            p={3} 
                                            bg="gray.50" 
                                            borderRadius="md" 
                                            cursor="pointer"
                                            maxH="30"
                                            display = "flex"
                                            alignItems="center"
                                            _hover={{ bg: "gray.100" }}
                                            onClick={() => navigate(`/search?lawIndex=${recommendations.lawIndex}`)}
                                        >
                                            <Text  color = "gray.700">
                                                {recommendations.text.length > 50 ? recommendations.text.substring(0, 50) + '...' : recommendations.text}
                                            </Text>
                                        </Box>
                                        </Tooltip>
                                        
                                    ))}
                                </Stack>
                                
                            </Box>
                        ) : (
                            <Text>Keine recommendations gefunden.</Text>
                        )}
                    </Box>
                </Stack>
                //Favoriten-Box;
                <Stack spacing={1} maxW="350px" >
                    <Box height = "30vh" mt={5} p={4} bg="white" boxShadow="md" borderRadius="md" textAlign="center">
                        <Heading as="h2" size="md" mb={4}>
                                    Favoriten
                                </Heading>
                                {favorites.length > 0 ? (
                                    <Box maxH="150px" overflowY="auto">
                                        <Stack spacing={2} >
                                            {favorites.map((favorites, index) => (
                                                <Tooltip key={index} label={favorites.text} hasArrow placement='bottom'>
                                                    <Box 
                                                    textAlign="center"
                                                    display="flex"
                                                    alignItems="center"
                                                    key={index} 
                                                    p={3} 
                                                    bg="gray.50" 
                                                    borderRadius="md" 
                                                    cursor="pointer"
                                                    maxH = "30"
                                                    
                                                    _hover={{ bg: "gray.100" }} 
                                                    onClick={() => navigate(`/search?lawIndex=${favorites.lawIndex}`)}
                                                >
                                                    <Text  color = "gray.700">
                                                        {favorites.text.length > 30 ? favorites.text.substring(0, 30) + '...' : favorites.text}
                                                    </Text>

                                                    </Box>
                                                </Tooltip>
                                                
                                            ))}
                                        </Stack>
                                        
                                    </Box>
                                ) : (
                                    <Text>Keine favorites gefunden.</Text>
                                )}
                    </Box>
                    //Zuletzt Besucht Box;
                    <Box height = "30vh" mt={5} p={4} bg="white" boxShadow="md" borderRadius="md" textAlign="center" minH="400px">
                        <Heading as="h2" size="md" mb={4}>
                                    Zuletzt besucht
                                </Heading>
                                {lastvisited.length > 0 ? (
                                    <Box maxH = "320" overflowY="auto">
                                        <Stack spacing={3}>
                                            {lastvisited.map((lastvisited, index) => (
                                                <Tooltip key={index} label={lastvisited.text} hasArrow>
                                                    <Box 
                                                    key={index} 
                                                    p={3} 
                                                    bg="gray.50"
                                                    textAlign="center"
                                                    display="flex"
                                                    alignItems="center"
                                                    borderRadius="md" 
                                                    cursor="pointer"
                                                    maxH = "30"
                                                    _hover={{ bg: "gray.100" }} 
                                                    onClick={() => navigate(`/search?lawIndex=${lastvisited.lawIndex}`)}
                                                >
                                                    <Text color = "gray.700">
                                                        {lastvisited.text.length > 30 ? lastvisited.text.substring(0, 30) + '...' : lastvisited.text}
                                                    </Text>
                                                </Box>
                                                </Tooltip>
                                                
                                            ))}
                                        </Stack>
                                        
                                    </Box>
                                ) : (
                                    <Text>Keine lastvisited gefunden.</Text>
                                )}
                    </Box>
                </Stack>
                </HStack>
                
                <Blur
                    position={'absolute'}
                    top={-20}
                    left={-20}
                    style={{filter: 'blur(70px)'}}
                />
            </Box>
            
        </Box>
    );
}

export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({base: '100%', md: '40vw', lg: '30vw'})}
            zIndex={useBreakpointValue({base: -1, md: -1, lg: 0})}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <circle cx="71" cy="61" r="111" fill="#F56565"/>
            <circle cx="244" cy="106" r="139" fill="#ED64A6"/>
            <circle cy="291" r="139" fill="#ED64A6"/>
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936"/>
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B"/>
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78"/>
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1"/>
        </Icon>
    );
};

export default Dashboard;
