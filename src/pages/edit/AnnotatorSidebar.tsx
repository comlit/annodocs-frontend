import React, {useContext, useEffect} from "react";
import {Box, Button, Text, VStack} from "@chakra-ui/react";
import AnnotationContext from "./AnnotationContext.ts";
import AnnotationListItem from "./AnnotationListItem.tsx";

function AnnotatorSidebar({setEditMode, setFocusedAnnotation}: {
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>,
    setFocusedAnnotation: (id: number) => void
}) {

    const {editMode, annotations, focusedAnnotation} = useContext(AnnotationContext)

    const editModeLayout = <>
        <Box h="100%">
            <Text>Bearbeiten eine Vorhandenen oder erstellen einer neuen Annotation</Text>
            <Button onClick={() => setEditMode(false)}>Zurück</Button>
        </Box>
    </>

    //list with all annotations
    const viewModeLayout = <>
        <Box h="100%">
            <Text>Alle Anontationen in diesem Text</Text>
            <VStack mx = "10px">
                {annotations.map(annotation => (
                    <AnnotationListItem annotation={annotation} key={annotation.id} clicked={() => setFocusedAnnotation(annotation.id)}/>
                ))}

            </VStack>
            <Button mt="auto" onClick={() => setEditMode(true)}>Neue Annotation</Button>
        </Box>
    </>

    const detailModeLayout = <>
        <Box h="100%">
            <Text>Details der ausgewählten Annotation</Text>
            <Text>{annotations.find(annotation => annotation.id === focusedAnnotation)?.name}</Text>
            <Button onClick={() => setFocusedAnnotation(null)}>Zurück</Button>
            <Button mt="auto" onClick={() => setEditMode(true)}>Annotation Bearbeiten</Button>
        </Box>
    </>

    return (
        <div className="annotator-sidebar" style={{borderColor: "aqua", borderWidth: "1px", height: "100%"}}>
            <div className="annotator-sidebar__header">
                <h2>Annotations</h2>
            </div>
            <div className="annotator-sidebar__content">
                {editMode ? editModeLayout : focusedAnnotation ? detailModeLayout : viewModeLayout}
            </div>
        </div>
    );
}

export default AnnotatorSidebar;