import Annotator from "./annotation/Annotator.tsx";
import {Box, Grid, GridItem} from "@chakra-ui/react";
import AnnotatorSidebar from "./AnnotatorSidebar.tsx";
import {useState} from "react";

function Edit() {

    const [focusedAnnotation, setFocusedAnnotation] = useState<number | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)

    const clickedCallback = (id: number) => {
        setFocusedAnnotation(prevState => prevState == id ? null : id)
    }

    return (
        <Box m='50px'>
            <Grid
                templateColumns="5fr 1fr"
                gap="10px">
                <GridItem>
                    <Annotator focusedAnnotation={focusedAnnotation} clickedCallback={clickedCallback}/>
                </GridItem>
                <GridItem>
                    <AnnotatorSidebar/>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default Edit;
