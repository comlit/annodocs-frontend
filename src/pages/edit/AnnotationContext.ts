import { createContext } from 'react';
import {Annotation, AnnotationPart} from "./Edit.tsx";

interface AnnotationContext {
    focusedAnnotation: number | null;
    editMode: boolean;
    annotations: Annotation[];
    clickedCallback: (id: number) => void;
    exitEditMode: (data: any) => void;
    selectionChangeCallback: (parts: AnnotationPart[]) => void;
}

const AnnotationContext = createContext({} as AnnotationContext);

export default AnnotationContext;