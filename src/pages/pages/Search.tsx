import {AbsoluteCenter, Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function Search() {
    const navigate = useNavigate()

    return (
        <AbsoluteCenter>
            <h1>Suche</h1>
            <p>Hier kann man nach Gesetzen suchen</p>
            <Button onClick={() => navigate('/edit')}>ausgewähltes gesetz anzeigen</Button>
        </AbsoluteCenter>
    );
}

export default Search;