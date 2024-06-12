import {useContext, useEffect, useState} from "react";
import {Box, Button, Input, Text, VStack} from "@chakra-ui/react";
import AnnotationContext from "./AnnotationContext.ts";
import AnnotationListItem from "./AnnotationListItem.tsx";
import {Annotation} from "./Edit.tsx";

function AnnotatorSidebar({setEditMode, setFocusedAnnotation}: {
    setEditMode: (enabled: boolean) => void,
    setFocusedAnnotation: (id: number | null) => void
}) {

    const {editMode, annotations, focusedAnnotation, exitEditMode} = useContext(AnnotationContext)

    const [name, setName] = useState<string>("")
    const [focused, setFocused] = useState<Annotation | null>(null)

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    useEffect(() => {
        if (focusedAnnotation === -1) {
            setName("")
            setFocused(null)
        } else {
            setName(annotations.find(annotation => annotation.id === focusedAnnotation)?.name ?? "")
            setFocused(annotations.find(annotation => annotation.id === focusedAnnotation) ?? null)
        }
    }, [focusedAnnotation]);

    //TODO: add functionality to buttons
    //TODO: add inputs to change other data of annotation
    const editModeLayout = <>
        <Box h="100%">
            <Text>Bearbeiten eine Vorhandenen oder erstellen einer neuen Annotation</Text>
            <Input onChange={handleNameChange} value={name} placeholder="Name der Annotation"/>
            <Button onClick={() => {
                if (window.confirm("Wollen Sie die Änderungen verwerfen?")) {
                    exitEditMode(null);
                }
            }}>Zurück</Button>
            <Button onClick={() => exitEditMode(
                {
                    id: focused?.id ?? Math.round(Math.random() * 100000),
                    name: name,
                    color: focused?.color ?? "#009500",
                }
            )}>Speichern</Button>
        </Box>
    </>

    //list with all annotations
    const viewModeLayout = <>
        <Box h="100%">
            <Text>Alle Anontationen in diesem Text</Text>
            <VStack mx="10px">
                {annotations.map(annotation => (
                    <AnnotationListItem annotation={annotation} key={annotation.id}
                                        clicked={() => setFocusedAnnotation(annotation.id)}/>
                ))}

            </VStack>
            <Button mt="auto" onClick={() => {
                setEditMode(true);
                setFocusedAnnotation(-1)
            }}>Neue Annotation</Button>
        </Box>
    </>

    const detailModeLayout = <>
        <Box h="100%">
            <Text>Details der ausgewählten Annotation</Text>
            <Text>Name: {focused?.name}</Text>
            <Text>Farbe: {focused?.color}</Text>
            <Text>Teile: {JSON.stringify(focused?.parts)}</Text>
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