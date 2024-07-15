import {Box, Textarea} from "@chakra-ui/react";

function FreeText() {
    return (
        <>
            <Box w='100%' h='500px' border='1px' borderColor='gray.200' borderRadius='8px'>
                <Textarea/>
            </Box>
        </>
    )
}

export default FreeText;