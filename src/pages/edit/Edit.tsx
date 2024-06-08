import Annotator from "./annotation/Annotator.tsx";
import {Box, Grid, GridItem} from "@chakra-ui/react";
import AnnotatorSidebar from "./AnnotatorSidebar.tsx";
import {useEffect, useState} from "react";
import AnnotationContext from "./AnnotationContext.ts";

export type Annotation = {
    id: number,
    name: string,
    color: string,
    parts: AnnotationPart[]
}

export type AnnotationPart = {
    id: number,
    textID: number,
    start: number,
    end: number,
}

function Edit() {

    //TODO: embed everything (editMode, focusedAnnotation, etc.) in the URL or maybe not bc of tabbing
    //TODO: fetch annotations here and distribute them to the annotator components
    //TODO: pull up annotations the user made up to here
    //TODO: user confirmation for leaving edit mode without saving

    const [focusedAnnotation, setFocusedAnnotation] = useState<number | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [annotations, setAnnotations] = useState<Annotation[]>([])

    const clickedCallback = (id: number) => {
        if(editMode)
            return
        setFocusedAnnotation(prevState => prevState == id ? null : id)
    }

    const changeEditMode = (enabled: boolean) => {
        setEditMode(enabled)
    }

    useEffect(() => {
        //fetch annotations
        setAnnotations([
            {
                id: 1,
                name: "Müller",
                color: "#ffcaca",
                parts:
                    [
                        {id: 1, textID: 1, start: 90, end: 170},
                        {id: 2, textID: 2, start: 30, end: 60}
                    ]
            },
            {id: 2, name: "Schäfer", color: "#0000FF", parts: [{id: 3, textID: 1, start: 45, end: 120}]},
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
                        <AnnotatorSidebar setEditMode={changeEditMode} setFocusedAnnotation={clickedCallback}/>
                    </GridItem>
                </Grid>
            </Box>
        </AnnotationContext.Provider>
    );
}

export default Edit;
