import { createContext } from 'react';

interface AnnotationContext {
    focusedAnnotation: number | null;
    editMode: boolean;
    annotations: {id: number, start: number, end: number, name: string, color: string}[];
}

const AnnotationContext = createContext({} as AnnotationContext);

export default AnnotationContext;