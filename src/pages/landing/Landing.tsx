import {
    AbsoluteCenter,
    Button,
    Heading,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function Landing() {
    const navigate = useNavigate()
    const {isOpen, onOpen, onClose} = useDisclosure()

    function handleLogin() {
        onClose()
        navigate('/dashboard')
    }

    return (
        <>
            <AbsoluteCenter>
                <Heading as='h1'>Welcome to the landing page</Heading>
                <Button onClick={onOpen}>Login</Button>
            </AbsoluteCenter>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        Login form goes here
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost'>Abbrechen</Button>
                        <Button colorScheme='blue' mr={3} onClick={handleLogin}>
                            Einloggen
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Landing