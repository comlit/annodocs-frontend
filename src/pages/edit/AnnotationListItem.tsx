import {Button, Card, CardBody, CardFooter, Heading, Icon} from "@chakra-ui/react";
import {Annotation} from "./Edit.tsx";

function AnnotationListItem({annotation, clicked}: { annotation: Annotation, clicked: any }) {

    const CircleIcon = (props) => (
        <Icon viewBox='0 0 200 200' {...props}>
            <path
                fill='currentColor'
                d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
            />
        </Icon>
    )

    return (
        <Card className="annotation-list-item" w={"100%"} variant={"outline"}>
            <CardBody>
                <Heading size="md">{annotation.name}</Heading>
                <div className="annotation-list-item__end">Teile: {JSON.stringify(annotation.parts)}</div>
                <CircleIcon w={7} h={7} color={annotation.color} position={"absolute"} top={"5"} right={"5"}/>

            </CardBody>
            <CardFooter>
                <Button onClick={clicked} w={"100%"}>Details</Button>
            </CardFooter>
        </Card>
    );
}

export default AnnotationListItem;