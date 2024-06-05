import Annotator from "./annotation/Annotator.tsx";
import {Box, Grid, GridItem, useQuery} from "@chakra-ui/react";
import AnnotatorSidebar from "./AnnotatorSidebar.tsx";
import {useEffect, useState} from "react";
import AnnotationContext from "./AnnotationContext.ts";

function Edit() {

    //TODO: embed everything (editMode, focusedAnnotation, etc.) in the URL or maybe not bc of tabbing

    //TODO: fetch annotations here and distribute them to the annotator components

    const [focusedAnnotation, setFocusedAnnotation] = useState<number | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [annotations, setAnnotations] = useState<{id: number, start: number, end: number, name: string, color: string}[]>([])

    const clickedCallback = (id: number) => {
        setFocusedAnnotation(prevState => prevState == id ? null : id)
    }

    useEffect(() => {
        //fetch annotations
        setAnnotations([
            {id: 1, start: 90, end: 170, name: "Müller", color: "#ffcaca"},
            {id: 2, start: 30, end: 60, name: "Schäfer", color: "#0000FF"},
            {id: 3, start: 45, end: 120, name: "Tervel", color: "#008000"},
            {id: 4, start: 100, end: 150, name: "Merkel", color: "#FFA500"}
        ])
    }, []);

    return (
        <AnnotationContext.Provider value={{focusedAnnotation, editMode, annotations}}>
            <Box m='50px'>
                <Grid
                    templateColumns="5fr 1fr"
                    gap="10px">
                    <GridItem>
                        <Annotator clickedCallback={clickedCallback}/>
                    </GridItem>
                    <GridItem>
                        <AnnotatorSidebar setEditMode={setEditMode} setFocusedAnnotation={clickedCallback}/>
                    </GridItem>
                </Grid>
            </Box>
        </AnnotationContext.Provider>
    );
}

export default Edit;
