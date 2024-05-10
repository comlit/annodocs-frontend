import {Center, Divider} from "@chakra-ui/react";

function Footer() {
    return (
        <Center id='footer' h='65px' w='100%' borderTop='1px' borderTopColor='lightgrey' gap='70px' pos='absolute' bottom='0px' bg='gray.50'>
            <a href='/'>Annodocs</a>
            <Divider orientation='vertical' h='35px'/>
            Made with ❤️ in Münster
            <Divider orientation='vertical' h='35px'/>
            <a href='/imprint'>Impressum</a>
        </Center>
    );
}

export default Footer;