import {Box, Heading, Textarea} from "@chakra-ui/react";

function FreeText({text, changedCallback}) {
    return (
        <>
            <Box w='100%' h='500px' border='1px' borderColor='gray.200' borderRadius='8px' px='10px'>
                <Heading size="md" w='100%' textAlign='center' mb='30px' mt='10px'>Freitext</Heading>
                <Textarea placeholder='Geben Sie hier ihre Annotation als Text ein.' value={text} onChange={(event) => changedCallback("freeText", event.target.value)}/>
            </Box>
        </>
    )
}

export default FreeText;