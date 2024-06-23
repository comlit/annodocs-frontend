import {Box, FormControl, Heading, IconButton, Input, Select} from "@chakra-ui/react";
import {useState} from "react";
import {AddIcon} from "@chakra-ui/icons";
import {ranID} from "../util.ts";

type Activity = {
    id: number,
    processId: number,
    name: string,
    predecessor: string,
    successor: string,
}

function Process() {

    const [pID, setPID] = useState<number>(ranID())

    const [activities, setActivities] = useState<Activity[]>([{
        id: ranID(),
        processId: pID,
        name: '',
        predecessor: '',
        successor: ''
    }])

    const addEmptyActivity = () => {
        setActivities([...activities, {id: activities.length, processId: pID, name: '', predecessor: '', successor: ''}])
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        const [id, field] = name.split(';')
        const newActivities = activities.map(activity => {
            if (activity.id.toString() === id) {
                return {...activity, [field]: value}
            }
            return activity
        })
        setActivities(newActivities)
    }

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target
        const [id, field] = name.split(';')
        const newActivities = activities.map(activity => {
            if (activity.id.toString() === id) {
                return {...activity, [field]: value}
            }
            return activity
        })
        setActivities(newActivities)
    }

    const renderActivities = () => {
        return activities.map((activity, index) => {
            return <Box key={index} border='1px' borderColor='gray.200' borderRadius='8px' padding='4px' margin='4px'>
                <Heading size='m' w='100%' textAlign='center'>Aktivität</Heading>
                <FormControl>
                    <Input name={`${activity.id};name`} type='text' placeholder='Name des Elements'
                           value={activity.name} onChange={handleInputChange}/>
                    <Select name={`${activity.id};predecessor`} placeholder='Vorgänger' onChange={handleSelectChange}>
                        {activities.filter(activity => activity.name).map((activity) => <option key={activity.id}
                                                                                                value={activity.id}>{activity.name}</option>)}
                    </Select>
                    <Select name={`${activity.id};successor`} placeholder='Nachfolger' onChange={handleSelectChange}>
                        {activities.filter(activity => activity.name).map((activity) => <option key={activity.id}
                                                                                                value={activity.id}>{activity.name}</option>)}
                    </Select>
                </FormControl>
            </Box>
        })
    }

    return <>
        <Box border='1px' borderColor='gray.200' borderRadius='8px' padding='4px' margin='4px'>
            <Heading size='m' w='100%' textAlign='center'>Prozess</Heading>
            <Input name='process' type='text' placeholder='Prozess'/>
            {renderActivities()}
            <IconButton aria-label='Add' icon={<AddIcon/>} onClick={() => {
                addEmptyActivity()
            }}/>
        </Box>
    </>;
}

export default Process;