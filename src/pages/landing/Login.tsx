import {
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input, InputGroup,
    InputRightElement,
    Link,
    Stack,
    Text
} from "@chakra-ui/react";
import {Field, Form, Formik} from "formik";
import {validateEmail, validatePassword} from "./validation.ts";
import {useState} from "react";
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";

function Login({changeState, submit, isLoading}: { changeState: (newState: string) => void, submit: (formData) => void, isLoading: boolean }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    remember: false,
                }}
                onSubmit={submit}
            >
                <Form>
                    <Stack spacing={4}>
                        <Field name='email' validate={validateEmail}>
                            {({field, form}) => (
                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                    <FormLabel>E-Mail</FormLabel>
                                    <Input {...field}/>
                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Field name='password' validate={validatePassword}>
                            {({field, form}) => (
                                <FormControl id="password" isInvalid={form.errors.password && form.touched.password}>
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
                        <Stack spacing={10}>
                            <Stack
                                direction={{base: 'column', sm: 'row'}}
                                align={'start'}
                                justify={'space-between'}>
                                <Field name='remember'>
                                    {({field}) => (
                                        <Checkbox {...field}>Angemeldet bleiben</Checkbox>
                                    )}
                                </Field>
                                <Link color={'blue.400'}>Passwort vergessen?</Link>
                            </Stack>
                            <Button
                                isLoading={isLoading}
                                type='submit'
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Anmelden
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Sie haben noch keinen Benutzerkonto? <Link onClick={() => changeState('register')}
                                                                           color={'blue.400'}>Registrieren</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Form>
            </Formik>
        </>
    );
}

export default Login;