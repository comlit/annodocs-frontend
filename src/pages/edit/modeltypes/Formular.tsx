import {Box, FormControl, Heading, IconButton, Input} from "@chakra-ui/react";
import {useState} from "react";
import {ranID} from "../util.ts";
import {AddIcon} from "@chakra-ui/icons";

type Formpart = {
    id: number,
    name: string,
    fields: Field[]
}

type Field = {
    id: number,
    name: string
}

function Formular() {
    const [formparts, setFormparts] = useState<Formpart[]>([{id: ranID(), name: '', fields: [{id: ranID(), name: ''}]}])
    const [name, setName] = useState<string>("")

    const addEmptyFormpart = () => {
        setFormparts([...formparts, {id: ranID(), name: '', fields: [{id: ranID(), name: ''}]}])
    }

    const addEmptyField = (formpartID: number) => {
        setFormparts(prevState => {
            return prevState.map(formpart => {
                if (formpart.id === formpartID) {
                    return {...formpart, fields: [...formpart.fields, {id: ranID(), name: ''}]}
                }
                return formpart
            })
        })
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        const [id, field] = name.split(';')
        if (field === 'name') {
            setFormparts(prevState => {
                return prevState.map(formpart => {
                    if (formpart.id.toString() === id) {
                        return {...formpart, name: value}
                    }
                    return formpart
                })
            })
        } else {
            setFormparts(prevState => {
                return prevState.map(formpart => {
                    return {
                        ...formpart,
                        fields: formpart.fields.map(mapField => {
                            if (mapField.id.toString() === field) {
                                return {...mapField, name: value}
                            }
                            return mapField
                        })
                    }
                })
            })
        }
    }

    const renderFormparts = () => {
        return formparts.map((formpart, index) => {
            return <Box key={index} border='1px' borderColor='gray.200' borderRadius='8px' padding='4px' margin='4px'>
                <Heading size='m' w='100%' textAlign='center'>Feldgruppe</Heading>
                <FormControl>
                    <Input name={`${formpart.id};name`} type='text' placeholder='Name des Formulars'
                           value={formpart.name} onChange={handleInputChange}/>
                    {formpart.fields.map((field, index) => {
                        return <Input key={index} name={`${formpart.id};${field.id}`} type='text' placeholder='Name des Feldes'
                                      value={field.name} onChange={handleInputChange}/>
                    })}
                    <IconButton aria-label='Add Field' icon={<AddIcon/>} onClick={() => addEmptyField(formpart.id)}/>
                </FormControl>
            </Box>
        })
    }

    return (
        <>
            <Heading size='m'>Formular</Heading>
            <Input onChange={(event) => setName(event.target.value)} value={name} placeholder='Name des Formulars'/>
            {renderFormparts()}
            <IconButton aria-label='Add Formpart' icon={<AddIcon/>} onClick={addEmptyFormpart}/>
        </>
    )
}

export default Formular;