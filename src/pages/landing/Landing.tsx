import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    SimpleGrid,
    useBreakpointValue,
    IconProps,
    Icon,
    useColorModeValue,
} from '@chakra-ui/react';
import Login from "./Login.tsx";
import Register from "./Register.tsx";
import {useState} from "react";

function Landing() {
    const navigate = useNavigate()
    const [loginState, setLoginState] = useState('login')
    const [isLoading, setIsLoading] = useState(false)

    function changeState(newState) {
        setLoginState(newState)
    }

    async function submit(formData) {
        setIsLoading(true)
        console.log(formData)
        await new Promise(r => setTimeout(r, 1000))
        setIsLoading(false)
    }

    return (
        <>
            <Box position={'relative'} bg='gray.50' h={'100%'}>
                <Container
                    as={SimpleGrid}
                    maxW={'7xl'}
                    columns={{base: 1, md: 2}}
                    spacing={{base: 10, lg: 32}}
                    h={'100%'}>
                    <Stack spacing={{base: 10, md: 20}} py={{base: 10, sm: 20, lg: 32}}>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{base: '3xl', sm: '4xl', md: '5xl', lg: '6xl'}}>
                            Annodocs: Ihre Annotations-Plattform
                        </Heading>
                        <Text color={'gray.500'}>
                            Annotieren und Verwalten Sie Gesetze in Sekunden und teilen Sie diese mit anderen
                            Mitgliedern der öffentlichen Verwaltung.
                        </Text>
                    </Stack>
                    <Stack
                        rounded={'xl'}
                        p={{base: 4, sm: 6, md: 8}}
                        spacing={{base: 8}}
                        maxW={{lg: 'lg'}}>
                        <Stack spacing={4}>
                            <Heading
                                color={'gray.800'}
                                lineHeight={1.1}
                                fontSize={{base: '2xl', sm: '3xl', md: '4xl'}}>
                                Anmelden
                            </Heading>
                            <Text color={'gray.500'} fontSize={{base: 'sm', sm: 'md'}}>
                                Melden Sie sich mit Ihrem Benutzerkonto an um Annodocs zu nutzen.
                            </Text>
                        </Stack>
                        <Box
                            rounded={'lg'}
                            bg={useColorModeValue('white', 'gray.700')}
                            boxShadow={'lg'}
                            p={8}>
                            {
                                loginState === 'login' ?
                                    <Login changeState={changeState} submit={submit} isLoading={isLoading}/> :
                                    <Register changeState={changeState} submit={submit} isLoading={isLoading}/>
                            }
                        </Box>
                        form
                    </Stack>
                </Container>
                <Blur
                    position={'absolute'}
                    top={-10}
                    left={-10}
                    style={{filter: 'blur(70px)'}}
                />
            </Box>
        </>
    )
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


export default Landing