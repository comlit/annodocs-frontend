
export const validateEmail = (value: string) => {
    let error;
    if (!value) {
        error = 'E-Mail ist erforderlich';
    } else if (!value.includes('@')) {
        error = 'Ungültige E-Mail-Adresse';
    }
    return error;
}

export const validatePassword = (value: string) => {
    let error;
    if (!value)
        error = 'Passwort ist erforderlich';
    return error;
}

export const validateName = (value: string) => {
    let error;
    if (!value)
        error = 'Name ist erforderlich';
    return error;
}