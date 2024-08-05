import {useEffect, useRef, useState} from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js/dist/assets/bpmn-js.css"
import {Box} from "@chakra-ui/react";

function Process({xml, changedCallback}) {
    const ref = useRef();

    useEffect(() => {
        const modeler = new BpmnModeler({
            container: ref.current
        });
        modeler.importXML(xml);

        modeler.on('commandStack.changed', () => {
            //save xml to state
            modeler.saveXML().then(({xml}) => {
                if(xml)
                    changedCallback("process", xml)
            });
        });


        return () => {
            modeler.destroy();
        }
    }, []);

    return (
        <>
            <Box ref={ref} w='100%' h='500px' border='1px' borderColor='gray.200' borderRadius='8px'/>
        </>
    )
}

export default Process;