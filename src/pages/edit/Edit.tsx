import Annotator from "./annotation/Annotator.tsx";
import {Box, Button, Grid, GridItem} from "@chakra-ui/react";
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
    //TODO: pull up annotations the user made up to here
    //TODO: user confirmation for leaving edit mode without saving

    const [focusedAnnotation, setFocusedAnnotation] = useState<number | null>(null)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [annotations, setAnnotations] = useState<Annotation[]>([])
    const [textList, setTextList] = useState<any[]>([])
    const [newAnnotation, setNewAnnotation] = useState<Annotation>({id: -1, name: "", color: "", parts: []})

    const [deleteMode, setDeleteMode] = useState<boolean>(false)

    const clickedCallback = (id: number | null) => {
        if (editMode)
            return
        setFocusedAnnotation(prevState => prevState == id ? null : id)
    }

    const changeEditMode = (enabled: boolean) => {
        setEditMode(enabled)
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
            console.log(parts)
            console.log(prevState)
            const prevParts = prevState.parts.filter(part => part.textID !== parts.textID)
            return {id: prevState.id, name: prevState.name, color: prevState.color, parts: [...prevParts, ...parts.parts]}
        })
    }

    useEffect(() => {
        const exampleText = [
            {
                "id": 1,
                "text": "Die Sache ist frei von Sachmängeln, wenn sie bei Gefahrübergang den subjektiven Anforderungen, den objektiven Anforderungen und den Montageanforderungen dieser Vorschrift entspricht."
            },
            [
                {
                    "id": 2,
                    "text": "Die Sache entspricht den subjektiven Anforderungen, wenn sie "
                },
                {
                    "list": [
                        {
                            "title": "1.",
                            "content": {
                                "id": 3,
                                "text": "die vereinbarte Beschaffenheit hat,"
                            }
                        },
                        {
                            "title": "2.",
                            "content": {
                                "id": 4,
                                "text": "sich für die nach dem Vertrag vorausgesetzte Verwendung eignet und"
                            }
                        },
                        {
                            "title": "3.",
                            "content": {
                                "id": 5,
                                "text": "mit dem vereinbarten Zubehör und den vereinbarten Anleitungen, einschließlich Montage- und Installationsanleitungen, übergeben wird."
                            }
                        }
                    ]
                },
                {
                    "id": 6,
                    "text": "Zu der Beschaffenheit nach Satz 1 Nummer 1 gehören Art, Menge, Qualität, Funktionalität, Kompatibilität, Interoperabilität und sonstige Merkmale der Sache, für die die Parteien Anforderungen vereinbart haben."
                }
            ],
            [
                {
                    "id": 7,
                    "text": "Soweit nicht wirksam etwas anderes vereinbart wurde, entspricht die Sache den objektiven Anforderungen, wenn sie "
                },
                {
                    "list": [
                        {
                            "title": "1.",
                            "content": {
                                "id": 8,
                                "text": "sich für die gewöhnliche Verwendung eignet,"
                            }
                        },
                        {
                            "title": "2.",
                            "content": [
                                {
                                    "id": 9,
                                    "text": "eine Beschaffenheit aufweist, die bei Sachen derselben Art üblich ist und die der Käufer erwarten kann unter Berücksichtigung "
                                },
                                {
                                    "list": [
                                        {
                                            "title": "a)",
                                            "content": {
                                                "id": 10,
                                                "text": "der Art der Sache und"
                                            }
                                        },
                                        {
                                            "title": "b)",
                                            "content": {
                                                "id": 11,
                                                "text": "der öffentlichen Äußerungen, die von dem Verkäufer oder einem anderen Glied der Vertragskette oder in deren Auftrag, insbesondere in der Werbung oder auf dem Etikett, abgegeben wurden,"
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "title": "3.",
                            "content": {
                                "id": 12,
                                "text": "der Beschaffenheit einer Probe oder eines Musters entspricht, die oder das der Verkäufer dem Käufer vor Vertragsschluss zur Verfügung gestellt hat, und"
                            }
                        },
                        {
                            "title": "4.",
                            "content": {
                                "id": 13,
                                "text": "mit dem Zubehör einschließlich der Verpackung, der Montage- oder Installationsanleitung sowie anderen Anleitungen übergeben wird, deren Erhalt der Käufer erwarten kann."
                            }
                        }
                    ]
                },
                {
                    "id": 14,
                    "text": "Zu der üblichen Beschaffenheit nach Satz 1 Nummer 2 gehören Menge, Qualität und sonstige Merkmale der Sache, einschließlich ihrer Haltbarkeit, Funktionalität, Kompatibilität und Sicherheit. Der Verkäufer ist durch die in Satz 1 Nummer 2 Buchstabe b genannten öffentlichen Äußerungen nicht gebunden, wenn er sie nicht kannte und auch nicht kennen konnte, wenn die Äußerung im Zeitpunkt des Vertragsschlusses in derselben oder in gleichwertiger Weise berichtigt war oder wenn die Äußerung die Kaufentscheidung nicht beeinflussen konnte."
                }
            ],
            [
                {
                    "id": 15,
                    "text": "Soweit eine Montage durchzuführen ist, entspricht die Sache den Montageanforderungen, wenn die Montage "
                },
                {
                    "list": [
                        {
                            "title": "1.",
                            "content": {
                                "id": 16,
                                "text": "sachgemäß durchgeführt worden ist oder"
                            }
                        },
                        {
                            "title": "2.",
                            "content": {
                                "id": 17,
                                "text": "zwar unsachgemäß durchgeführt worden ist, dies jedoch weder auf einer unsachgemäßen Montage durch den Verkäufer noch auf einem Mangel in der vom Verkäufer übergebenen Anleitung beruht."
                            }
                        }
                    ]
                }
            ],
            {
                "id": 18,
                "text": "Einem Sachmangel steht es gleich, wenn der Verkäufer eine andere Sache als die vertraglich geschuldete Sache liefert."
            }
        ]
        const exampleAnnotations = [
            {
                id: 1,
                name: "Müller",
                color: "#ffcaca",
                parts:
                    [
                        {id: 4561, textID: 1, start: 90, end: 170},
                        {id: 2456, textID: 1, start: 30, end: 59},
                        {id: 4563, textID: 7, start: 20, end: 50},
                    ]
            },
            {
                id: 2,
                name: "Schäfer",
                color: "#0000FF",
                parts: [
                    {id: 2843, textID: 13, start: 45, end: 120},
                    {id: 4640, textID: 7, start: 10, end: 40},
                ]
            },
            {
                id: 3,
                name: "Mayer",
                color: "#00FF00",
                parts: [
                    {id: 34, textID: 1, start: 50, end: 150},
                    {id: 53, textID: 4, start: 30, end: 54},
                    {id: 75, textID: 10, start: 1, end: 13},
                ]
            }
        ]
        //fetch annotations
        setAnnotations(exampleAnnotations)
        setTextList(exampleText)
    }, []);

    return (
        <AnnotationContext.Provider value={{focusedAnnotation, editMode, annotations, clickedCallback, exitEditMode, selectionChangeCallback, deleteMode}}>
            <Box m='50px'>
                <Grid
                    templateColumns="5fr 1fr"
                    gap="10px">
                    <GridItem>
                        <Annotator textList={textList}/>
                    </GridItem>
                    <GridItem>
                        <AnnotatorSidebar setEditMode={changeEditMode} setFocusedAnnotation={clickedCallback}/>
                    </GridItem>
                </Grid>
                <Button onClick={() => setDeleteMode(prevState => !prevState)}>switch mode</Button>
            </Box>
        </AnnotationContext.Provider>
    );
}

export default Edit;
