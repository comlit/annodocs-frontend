import {Box, Button} from "@chakra-ui/react";
import {Annotation} from "./Edit.tsx";

function AnnotationListItem({ annotation, clicked }: { annotation: Annotation, clicked: any }) {
    return (
        <Box className="annotation-list-item" border={"1px"} borderColor={"#00ffff"} w={"100%"}>
            <div className="annotation-list-item__name">Name: {annotation.name}</div>
            <div className="annotation-list-item__start">Farbe: {annotation.color}</div>
            <div className="annotation-list-item__end">Teile: {JSON.stringify(annotation.parts)}</div>
            <Button onClick={clicked}>Details</Button>
        </Box>
    );
}

export default AnnotationListItem;