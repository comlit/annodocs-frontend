import Annotator from "./annotation/Annotator.tsx";
import {Box, Center, Grid, GridItem} from "@chakra-ui/react";
import AnnotatorSidebar from "./AnnotatorSidebar.tsx";
import {useEffect, useState} from "react";
import AnnotationContext from "./AnnotationContext.ts";
import {fetchWrapper} from "../../api/fetcher.ts";
import {useLocation, useMatch} from "react-router-dom";

export type Annotation = {
    id: number,
    name: string,
    color: string,
    author: string,
    lastEdit: string,
    parts: AnnotationPart[],
    models?: Models
}

export type Models = {
    process?: string,
    formular?: object,
    tree?: string,
    freeText?: string
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

    const [parts, setParts] = useState<AnnotationPart[]>([])

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
        if (!data) {
            setEditMode(false)
            setFocusedAnnotation(null)
        } else {
            setEditMode(false)
            setFocusedAnnotation(null)
            const annotation: Annotation = {id: data.id, name: data.name, author: data.author, lastEdit: data.lastEdit, color: data.color, parts: parts, models: data.models}

            const body = {
                name: annotation.name,
                ersteller: "test",
                datum: new Date().toISOString(),
                color: annotation.color,
                paragraphID: 3,
                annotationAbschnitte: annotation.parts.map(part => {
                    return {
                        start: part.start,
                        end: part.end,
                        textAbschnittID: part.textID
                    }
                }),
                treeNodes: annotation?.models?.tree,
                form: JSON.stringify(annotation?.models?.formular),
                bpmnXml: annotation?.models?.process,
                freitext: annotation?.models?.freeText
            }

            if (annotations.find(annotation => annotation.id === data.id)){
                setAnnotations(prevState => {
                    const filtered = prevState.filter(annotation => annotation.id !== data.id)
                    return [...filtered, annotation]
                })

                fetchWrapper.put(`api/annotations/${annotation.id}`, body, false).then((data) => {
                    console.log(data)
                })
            }
            else {
                setAnnotations(prevState => [...prevState, annotation])

                fetchWrapper.post('api/annotations', body, false).then((data) => {
                    console.log(data)
                })
            }
            setParts([])
        }
    }

    const selectionChangeCallback = (parts: { parts: AnnotationPart[], textID: number }) => {
        setParts(prevState => {
            const prevParts = prevState.filter(part => part.textID !== parts.textID)
            return [...prevParts, ...parts.parts]
        })
    }

    useEffect(() => {
        const id = location.pathname.slice(location.pathname.lastIndexOf("/") , location.pathname.length)

        fetchWrapper.get(`api/paragraphs${id}`, null, false).then((data) => {
            setParagraph({number: data.paragraph, title: data.titel, book: data.gesetz.name})
            console.log(data)
            setAnnotations(data.annotations.map((annotation: any) => {
                return {
                    id: annotation.id,
                    name: annotation.name,
                    color: annotation.color,
                    author: annotation.ersteller,
                    lastEdit: annotation.datum,
                    parts: annotation.annotationAbschnitte.map((part: any) => {
                        return {
                            id: part.id,
                            textID: part.textAbschnitt.id,
                            start: part.start,
                            end: part.end
                        }
                    }),
                    models: {
                        process: annotation.bpmnXml,
                        formular: JSON.parse(annotation.form),
                        tree: annotation.treeNodes,
                        freeText: annotation.freitext
                    }
                }
            }))
            setTextList(data.textAbschnitte)
        })
    }, [location]);

    useEffect(() => {
        document.title = `${paragraph.number} ${paragraph.book} - ${paragraph.title}`
    }, [paragraph]);

    return (
        <AnnotationContext.Provider value={{
            focusedAnnotation,
            editMode,
            annotations,
            clickedCallback,
            exitEditMode,
            selectionChangeCallback,
            deleteMode,
            toggleDeleteMode,
            paragraph
        }}>
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
