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
import { userMockData, annotationsMockData, recommendedMockData, lastVisitedMockData, favoritesMockData } from "./dummydata.ts"; 
import styles from './Dashboard.module.css';

function Dashboard() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [titel, setTitel] = useState('');
    const [annotations, setAnnotations] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [lastvisited, setLastVisited] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setEmail(userMockData.email);
            setName(userMockData.name);
            setTitel(userMockData.titel);
        }, 1000);

        setTimeout(() => {
            setAnnotations(annotationsMockData);
            setRecommendations(recommendedMockData);
            setFavorites(favoritesMockData);
            setLastVisited(lastVisitedMockData);
        }, 1000);
    }, []);


    const handleKeyPress = (event) => {
        if (event.key === 'r' || event.key === 'R') {
            navigate('/search');
        } else if (event.key === 'a' || event.key === 'A') {
            navigate('/create');
        }
    };

    window.addEventListener('keydown', handleKeyPress);
    

    const bg = useColorModeValue('gray.100', 'gray.700');

    return (
        <Box className={styles.dashboard} bg={bg}>
            <Box className={styles.container}>
                <HStack spacing={6} alignItems="flex-start" zIndex="10">
                    <Stack spacing={2} zIndex="10" width="70%">
                        <Heading as="h1" size="xl" className={styles.heading}>
                            Guten Tag, {titel} {name}
                        </Heading>
                        <Text className={styles.subtitle}>
                            Hier finden Sie Informationen zu Ihren Daten und letzen Aktivitäten
                        </Text>

                        <Flex className={styles.buttonContainer}>
                            <Button 
                                className={`${styles.button} dashboard-gesetze-suchen`} 
                                colorScheme="blue" 
                                onClick={() => navigate('/search')}
                                height="100%"
                            >
                                <u>R</u>echtsnormen suchen
                            </Button>
                            <Button 
                                className={`${styles.button} dashboard-annotation-erstellen`} 
                                colorScheme="teal" 
                                onClick={() => navigate('/create')}
                                height="100%"
                            >
                                <u>A</u>nnotation erstellen
                            </Button>
                        </Flex>

                        <Box className={`${styles.card} dashboard-eigene-annotationen`}>
                            <Heading as="h2" size="md" mb={4}>
                                Eigene Annotationen
                            </Heading>
                            {annotations.length > 0 ? (
                                <Box className={styles.cardContent}>
                                    <Stack spacing={3}>
                                        {annotations.map((annotation, index) => (
                                            <Tooltip key={index} label={annotation.text} hasArrow>
                                                <Box 
                                                    className={styles.tooltipBox}
                                                    onClick={() => navigate(`/search?id=${annotation.id}`)}
                                                >
                                                    <Text className={styles.noData}>
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

                        <Box className={`${styles.card} dashboard-vorgeschlagene-gesetze`}>
                            <Heading as="h2" size="md" mb={4}>
                                Vorgeschlagene Gesetze
                            </Heading>
                            {recommendations.length > 0 ? (
                                <Box className={styles.cardContent}>
                                    <Stack spacing={3}>
                                        {recommendations.map((recommendation, index) => (
                                            <Tooltip key={index} label={recommendation.text} hasArrow>
                                                <Box 
                                                    className={styles.tooltipBox}
                                                    onClick={() => navigate(`/search?id=${recommendation.id}`)}
                                                >
                                                    <Text className={styles.noData}>
                                                        {recommendation.text.length > 50 ? recommendation.text.substring(0, 50) + '...' : recommendation.text}
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

                    <Stack spacing={2} w = "19vw" marginTop="5px">
                        <Box className={`${styles.card} dashboard-favoriten`}>
                            <Heading as="h2" size="md" mb={4}>
                                Favoriten
                            </Heading>
                            {favorites.length > 0 ? (
                                <Box className={styles.cardContent}>
                                    <Stack spacing={2}>
                                        {favorites.map((favorite, index) => (
                                            <Tooltip key={index} label={favorite.text} hasArrow placement='bottom'>
                                                <Box 
                                                    className={styles.tooltipBox}
                                                    onClick={() => navigate(`/search?id=${favorite.id}`)}
                                                >
                                                    <Text className={styles.noData}>
                                                        {favorite.text.length > 25 ? favorite.text.substring(0, 25) + '...' : favorite.text}
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

                        <Box className={`${styles.card} dashboard-last-visited`} height="55vh">
                            <Heading as="h2" size="md" mb={4}>
                                Zuletzt besucht
                            </Heading>
                            {lastvisited.length > 0 ? (
                                <Box className={styles.cardContent} maxHeight="320px">
                                    <Stack spacing={3}>
                                        {lastvisited.map((lastvisit, index) => (
                                            <Tooltip key={index} label={lastvisit.text} hasArrow>
                                                <Box 
                                                    className={styles.tooltipBox}
                                                    onClick={() => navigate(`/edit?id=${lastvisit.id}`)}
                                                >
                                                    <Text className={styles.noData}>
                                                        {lastvisit.text.length >25 ? lastvisit.text.substring(0, 25) + '...' : lastvisit.text}
                                                    </Text>
                                                </Box>
                                            </Tooltip>
                                        ))}
                                    </Stack>
                                </Box>
                            ) : (
                                <Text>Keine zuletzt besuchten Rechtsnormen gefunden.</Text>
                            )}
                        </Box>
                    </Stack>
                </HStack>

                <Blur
                    position={'fixed'}
                    top={-20}
                    left={-20}
                    style={{ filter: 'blur(70px)' }}
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
