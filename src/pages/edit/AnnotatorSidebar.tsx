import {useContext, useEffect, useState} from "react";
import {
    Box,
    Button,
    Divider,
    Heading,
    Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import AnnotationContext from "./AnnotationContext.ts";
import AnnotationListItem from "./AnnotationListItem.tsx";
import {Annotation, Models} from "./Edit.tsx";
import Process from "./modeltypes/Process.tsx";
import Formular from "./modeltypes/Formular.tsx";
import Tree from "./modeltypes/Tree.tsx";
import FreeText from "./modeltypes/FreeText.tsx";
import {getRandomPastelColor} from "./util.ts";

const initialxml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1"/>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>
`

function AnnotatorSidebar({setEditMode, setFocusedAnnotation}: {
    setEditMode: (enabled: boolean) => void,
    setFocusedAnnotation: (id: number | null) => void
}) {

    const {editMode, annotations, focusedAnnotation, exitEditMode} = useContext(AnnotationContext)

    const [name, setName] = useState<string>("")
    const [focused, setFocused] = useState<Annotation | null>(null)

    const [currentModelType, setCurrentModelType] = useState<string>(null)

    const [models, setModels] = useState<Models>({process: initialxml})

    const {isOpen, onOpen, onClose} = useDisclosure()

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
            setModels(annotations.find(annotation => annotation.id === focusedAnnotation)?.models ?? {process: initialxml})
        }
    }, [focusedAnnotation]);

    const handleModelChange = (type: string, data: any) => {
        setModels(prevState => {
            return {
                ...prevState,
                [type]: data
            }
        })
    }

    //TODO: add inputs to change other data of annotation
    const editModeLayout = <>
        <Box h="100%">
            <Text>Bearbeiten eine Vorhandenen oder erstellen einer neuen Annotation</Text>
            <Input onChange={handleNameChange} value={name} placeholder="Name der Annotation"/>

            <Button onClick={onOpen}>Modelle Bearbeiten</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='6xl' isCentered>
                <ModalOverlay/>
                <ModalContent minHeight='80vh'>
                    <ModalHeader>Modelle Bearbeiten</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Select
                            placeholder="Wählen Sie ein Modell"
                            size='md'
                            mb='8px'
                            onChange={(e) => setCurrentModelType(e.target.value)}
                            value={currentModelType}
                        >
                            <option value="process">Prozess</option>
                            <option value="form">Formular</option>
                            <option value="tree">Entscheidungsbaum</option>
                            <option value="freeText">Freitext</option>
                        </Select>
                        {
                            currentModelType === "process" ? <Process xml={models.process} changedCallback={handleModelChange}/> :
                                currentModelType === "form" ? <Formular/> :
                                    currentModelType === "tree" ? <Tree/> :
                                        currentModelType === "freeText" ? <FreeText/> :
                                            <Text>Wählen Sie ein Modell aus um es zu bearbeiten (hier Erklärung
                                                einfügen)</Text>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue'>Änderungen Speichern</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Button onClick={() => {
                if (window.confirm("Wollen Sie die Änderungen verwerfen?")) {
                    exitEditMode(null);
                }
            }}>Zurück</Button>
            <Button onClick={() => exitEditMode(
                {
                    id: focused?.id ?? Math.round(Math.random() * 100000),
                    name: name,
                    color: focused?.color ?? getRandomPastelColor(),
                    models: models
                }
            )}>Speichern</Button>
        </Box>
    </>

    //TODO: add ability to filter
    const viewModeLayout =
        <>
            <Box h="100%" maxH={{base: '50vh', md: '70vh', lg: '80vh'}} overflowY="scroll">
                <VStack m="10px">
                    <Heading size="md">Annotationen</Heading>
                    {annotations.length != 0 ? annotations.map(annotation => (
                        <AnnotationListItem annotation={annotation} key={annotation.id}
                                            clicked={() => setFocusedAnnotation(annotation.id)}/>
                    )):
                        <Text>Es sind noch keine Annotationen vorhanden</Text>
                    }
                </VStack>
            </Box>

            <Box w="100%" display="flex" justifyContent="center" alignItems="center" py="8px" flexDir="column">
                <Divider mb="8px" mx="4px"/>
                <Button w="90%" onClick={() => {
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
        <Box className="annotator-sidebar" border='1px' borderColor='gray.200' borderRadius='8px'>
            <div className="annotator-sidebar__content">
                {editMode ? editModeLayout : focusedAnnotation ? detailModeLayout : viewModeLayout}
            </div>
        </Box>
    );
}

export default AnnotatorSidebar;