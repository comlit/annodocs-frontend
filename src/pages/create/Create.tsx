import {AbsoluteCenter, Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function Create() {
    const navigate = useNavigate()
    return (
        <AbsoluteCenter>
            Hier kann man dann eine Annotation erstellen und wird dadurch durch einen Prozess geleitet.
            <Button onClick={() => navigate('/edit')}>Mit ausgewählten Annotationen den Prozess beginnen</Button>
        </AbsoluteCenter>
    );
}

export default Create;
