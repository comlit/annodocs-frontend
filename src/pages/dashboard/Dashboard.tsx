import {AbsoluteCenter, Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchWrapper} from "../../api/fetcher.ts";

function Dashboard() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    useEffect(() => {
        fetchWrapper.get('api/v1/user/mockfunc').then(res => setEmail(res.payload))
    }, []);

    return (
        <AbsoluteCenter>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard</p>
            <Button onClick={() => navigate('/search')}>Gesetze suchen</Button>
            <Button onClick={() => navigate('/create')}>Annotation erstellen</Button>
            \n Hier werden außerdem die eigenen Annotationen angezeigt und was sonst noch so auf ein Dashboard gehört.
            <p>Deine Email: {email}</p>
        </AbsoluteCenter>
    );
}

export default Dashboard;