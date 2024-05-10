import {
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Text,
    Link, FormErrorMessage, Checkbox,
} from '@chakra-ui/react';
import {Field, Form, Formik} from "formik";
import {useState} from 'react';
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons';
import {validateEmail, validateName, validatePassword} from "./validation.ts";

function Register({changeState, submit, isLoading}: {
    changeState: (newState: string) => void,
    submit: (formData) => void,
    isLoading: boolean
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    remember: false,
                }}
                onSubmit={submit}
            >
                <Form>
                    <Stack spacing={4}>
                        <HStack align='top'>
                            <Field name='surname' validate={validateName}>
                                {({field, form}) => (
                                    <FormControl isInvalid={form.errors.surname && form.touched.surname} >
                                        <FormLabel>Vorname</FormLabel>
                                        <Input {...field}/>
                                        <FormErrorMessage>{form.errors.surname}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='name' validate={validateName}>
                                {({field, form}) => (
                                    <FormControl isInvalid={form.errors.name && form.touched.name} >
                                        <FormLabel>Nachname</FormLabel>
                                        <Input {...field}/>
                                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                        </HStack>
                        <Field name='email' validate={validateEmail}>
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email} >
                                    <FormLabel>E-Mail</FormLabel>
                                    <Input {...field}/>
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='password' validate={validatePassword}>
                            {({field, form}) => (
                                <FormControl id="password" isInvalid={form.errors.password && form.touched.password}
                                             >
                                    <FormLabel>Passwort</FormLabel>
                                    <InputGroup>
                                        <Input {...field} type={showPassword ? 'text' : 'password'}/>
                                        <InputRightElement h={'full'}>
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setShowPassword((showPassword) => !showPassword)
                                                }>
                                                {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='remember'>
                            {({field}) => (
                                <Checkbox {...field}>Angemeldet bleiben</Checkbox>
                            )}
                        </Field>
                        <Stack spacing={10} pt={2}>
                            <Button
                                type='submit'
                                isLoading={isLoading}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Registrieren
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Sie haben bereits ein Benutzerkonto? <Link onClick={() => changeState('login')}
                                                                           color={'blue.400'}>Anmelden</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Form>
            </Formik>
        </>
    );
}

export default Register;