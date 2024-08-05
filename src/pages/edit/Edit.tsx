import Annotator from "./annotation/Annotator.tsx";
import {Box, Grid, GridItem} from "@chakra-ui/react";
import AnnotatorSidebar from "./AnnotatorSidebar.tsx";
import {useEffect, useState} from "react";
import AnnotationContext from "./AnnotationContext.ts";
import {fetchWrapper} from "../../api/fetcher.ts";
import {useLocation, useMatch} from "react-router-dom";

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

export type Paragraph = {
    number: string,
    title: string,
    book: string,
}

function Edit() {

    //TODO: embed everything (editMode, focusedAnnotation, etc.) in the URL or maybe not bc of tabbing
    //TODO: pull up annotations the user made up to here
    //TODO: user confirmation for leaving edit mode without saving

    const [focusedAnnotation, setFocusedAnnotation] = useState<number | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [annotations, setAnnotations] = useState<Annotation[]>([])
    const [textList, setTextList] = useState<any[]>([])
    const [newAnnotation, setNewAnnotation] = useState<Annotation>({id: -1, name: "", color: "", parts: []})

    const [paragraph, setParagraph] = useState<Paragraph>({number: "", title: "", book: ""})


    const [deleteMode, setDeleteMode] = useState<boolean>(false)

    const location = useLocation();

    const clickedCallback = (id: number | null) => {
        if (editMode)
            return
        setFocusedAnnotation(prevState => prevState == id ? null : id)
    }

    const changeEditMode = (enabled: boolean) => {
        setEditMode(enabled)
    }

    const toggleDeleteMode = () => {
        setDeleteMode(prevState => !prevState)
    }

    const exitEditMode = (data: any) => {
        if(!data) {
            setEditMode(false)
            setFocusedAnnotation(null)
        } else {
            setEditMode(false)
            setFocusedAnnotation(null)
            const annotation: Annotation = {id: data.id, name: data.name, color: data.color, parts: newAnnotation.parts}

            if(annotations.find(annotation => annotation.id === data.id))
                setAnnotations(prevState => {
                    const filtered = prevState.filter(annotation => annotation.id !== data.id)
                    return [...filtered, annotation]
                })
            else
                setAnnotations(prevState => [...prevState, annotation])
            setNewAnnotation({id: -1, name: "", color: "", parts: []})
        }
    }

    const selectionChangeCallback = (parts: {parts: AnnotationPart[], textID: number}) => {
        setNewAnnotation(prevState => {
            const prevParts = prevState.parts.filter(part => part.textID !== parts.textID)
            return {id: prevState.id, name: prevState.name, color: prevState.color, parts: [...prevParts, ...parts.parts]}
        })
    }

    useEffect(() => {
        const id = location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length)

        fetchWrapper.get(`api/paragraphs/${id}`, null, false).then((data) => {
            setParagraph({number: data.paragraph, title: data.titel, book: data.gesetz.name})
            setAnnotations(data.annotations.map((annotation: any) => {
                return {
                    id: annotation.id,
                    name: annotation.name,
                    color: "#c0afd5",
                    parts: annotation.annotationAbschnitte.map((part: any) => {
                        return {
                            id: part.id,
                            textID: part.textAbschnitt.id,
                            start: part.start,
                            end: part.end
                        }
                    })
                }
            }))
            setTextList(data.textAbschnitte)
        })
    }, [location]);

    useEffect(() => {
        document.title = `${paragraph.number} ${paragraph.book} - ${paragraph.title}`
    }, [paragraph]);

    return (
        <AnnotationContext.Provider value={{focusedAnnotation, editMode, annotations, clickedCallback, exitEditMode, selectionChangeCallback, deleteMode, toggleDeleteMode, paragraph}}>
            <Box m='50px'>
                <Grid
                    templateColumns="12fr 3fr"
                    gap="10px">
                    <GridItem>
                        <Annotator textList={textList}/>
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
