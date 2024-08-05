import {useEffect, useRef, useState} from "react";
import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css"
import {Box} from "@chakra-ui/react";
import {FormEditor} from "@bpmn-io/form-js";

function Formular({schema, changedCallback}) {
    const ref = useRef();

    useEffect(() => {
        const editor = new FormEditor({
            container: ref.current
        });

        editor.importSchema(schema);

        editor.on('commandStack.changed', () => {
            const schema = editor.saveSchema()
            if(schema)
                changedCallback("formular", schema)
        });


        return () => {
            editor.destroy();
        }
    }, []);

    return (
        <>
            <Box ref={ref} w='100%' h='500px' border='1px' borderColor='gray.200' borderRadius='8px'/>
        </>
    )
}

export default Formular;