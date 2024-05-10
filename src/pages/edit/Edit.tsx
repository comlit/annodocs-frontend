import {AbsoluteCenter, Box} from "@chakra-ui/react";
import TextAnnotator from "./annotation/TextAnnotator.tsx";
import {useState} from "react";

function Edit() {
    const [value, setValue] = useState([]);
    const [tag, setTag] = useState('YOU');


    return (
        <Box m='50px'>
            <TextAnnotator
                content={'onssssssssssssssssssssssssssssssssssssfinsvoisnvonpdniorbnbdrobribndiorbdinbrndbdnobbdbdrinobdinobdrnoibdronibdbndibbnbdronibdpbos'}
                value={value}
                onChange={value => setValue(value)}
                getSpan={span => ({
                    ...span,
                    tag: tag,
                    color: 'red',
                })}
            />
        </Box>
    );
}

export default Edit;
