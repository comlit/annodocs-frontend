import {Box, Button} from "@chakra-ui/react";

function AnnotationListItem({ annotation, clicked }: { annotation: any, clicked: any }) {
    return (
        <Box className="annotation-list-item" border={"1px"} borderColor={"#00ffff"} w={"100%"}>
            <div className="annotation-list-item__name">{annotation.name}</div>
            <div className="annotation-list-item__start">{annotation.start}</div>
            <div className="annotation-list-item__end">{annotation.end}</div>
            <Button onClick={clicked}>Details</Button>
        </Box>
    );
}

export default AnnotationListItem;