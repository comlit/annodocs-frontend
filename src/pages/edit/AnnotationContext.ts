import { createContext } from 'react';
import {Annotation} from "./Edit.tsx";

interface AnnotationContext {
    focusedAnnotation: number | null;
    editMode: boolean;
    annotations: Annotation[];
    clickedCallback: (id: number) => void;
}

const AnnotationContext = createContext({} as AnnotationContext);

export default AnnotationContext;