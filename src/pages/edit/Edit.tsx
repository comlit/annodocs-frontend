import Annotator from "./annotation/Annotator.tsx";
import {Box, Grid, GridItem} from "@chakra-ui/react";
import AnnotatorSidebar from "./AnnotatorSidebar.tsx";
import {useState} from "react";

function Edit() {

    //TODO: pull up state to this component

    const [focusedAnnotation, setFocusedAnnotation] = useState<number | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)

    return (
        <Box m='50px'>
            <Grid
                templateColumns="5fr 1fr"
                gap="10px">
                <GridItem>
                    <Annotator/>
                </GridItem>
                <GridItem>
                    <AnnotatorSidebar/>
                </GridItem>
            </Grid>
        </Box>
    );
}

export default Edit;
