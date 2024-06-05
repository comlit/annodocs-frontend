import {Box, Button} from "@chakra-ui/react";

function AnnotationListItem({ annotation, clicked }: { annotation: any, clicked: any }) {
    return (
        <Box className="annotation-list-item" bg={"lightgreen"} w={"100%"}>
            <div className="annotation-list-item__name">{annotation.name}</div>
            <div className="annotation-list-item__start">{annotation.start}</div>
            <div className="annotation-list-item__end">{annotation.end}</div>
            <Button onClick={clicked}>Edit</Button>
        </Box>
    );
}

export default AnnotationListItem;