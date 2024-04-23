import {AbsoluteCenter, Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate()

    return (
        <AbsoluteCenter>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard</p>
            <Button onClick={() => navigate('/search')}>Gesetze suchen</Button>
            <Button onClick={() => navigate('/create')}>Annotation erstellen</Button>
            \n Hier werden außerdem die eigenen Annotationen angezeigt und was sonst noch so auf ein Dashboard gehört.

        </AbsoluteCenter>
    );
}

export default Dashboard;