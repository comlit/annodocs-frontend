import {AbsoluteCenter, Box} from "@chakra-ui/react";
import TextAnnotator from "./annotation/TextAnnotator.tsx";
import {useState} from "react";
import Annotator from "./annotation/Annotator.tsx";

function Edit() {
    const [value, setValue] = useState([]);
    const [tag, setTag] = useState('YOU');


    return (
        <Box m='50px'>
            <Annotator/>
        </Box>
    );
}

export default Edit;
