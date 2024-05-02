import {
    AbsoluteCenter,
    Button, Checkbox, FormControl, FormLabel,
    Heading, Input, Link,
    Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Stack,
    useDisclosure
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

function Landing() {
    const navigate = useNavigate()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const user = useSelector((state: any) => state.auth.user)

    function handleLogin() {
        onClose()
        navigate('/dashboard')
    }

    function onSignIn() {

    }

    return (
        <>
            <AbsoluteCenter>
                <Heading as='h1'>Welcome to the landing page</Heading>
                <Button onClick={onOpen}>Login</Button>
                <Button onClick={onSignIn}>Einloggen</Button>
                <p>{user?.email}</p>
            </AbsoluteCenter>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Anmelden</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input type="email"/>
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password"/>
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{base: 'column', sm: 'row'}}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                            </Stack>
                        </Stack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            onClick={handleLogin}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}>
                            Sign in
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Landing