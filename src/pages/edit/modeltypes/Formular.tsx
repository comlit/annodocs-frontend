import {useEffect, useRef, useState} from "react";
import "@bpmn-io/form-js/dist/assets/form-js.css";
import "@bpmn-io/form-js/dist/assets/form-js-editor.css"
import {Box} from "@chakra-ui/react";
import {FormEditor} from "@bpmn-io/form-js";

const initialSchema = {
    "schemaVersion": 1,
    "exporter": {
        "name": "form-js",
        "version": "0.1.0"
    },
    "components": [
    ],
    "type": "default"
}


function Formular() {
    const ref = useRef();
    const [schema, setSchema] = useState("")

    useEffect(() => {
        const editor = new FormEditor({
            container: ref.current
        });

        editor.importSchema(initialSchema);

        editor.on('commandStack.changed', () => {
            editor.saveSchema().then(({schema}) => {
                if(schema)
                    setSchema(schema)
            })
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