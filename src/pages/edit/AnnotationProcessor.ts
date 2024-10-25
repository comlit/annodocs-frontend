import {Annotation} from "./Edit.tsx";

export const processAnnotation = (annotation: Annotation) => {
    //TODO: hier AI kram machen
    console.log(annotation)
}

export const getTextById = (data: any[], targetId: number): string | null => {
    const searchInItem = (item: any): string | null => {
        // If item is an array, search through each element
        if (Array.isArray(item)) {
            for (const element of item) {
                const result = searchInItem(element);
                if (result) return result;
            }
        }
        // If item is an object
        else if (typeof item === 'object' && item !== null) {
            // Direct match for id and text
            if (item.id === targetId && 'text' in item) {
                return item.text;
            }

            // Search in list if present
            if ('list' in item) {
                for (const listItem of item.list) {
                    const result = searchInItem(listItem.content);
                    if (result) return result;
                }
            }

            // Search through all object properties
            for (const key in item) {
                if (typeof item[key] === 'object' && item[key] !== null) {
                    const result = searchInItem(item[key]);
                    if (result) return result;
                }
            }
        }

        return null;
    };

    return searchInItem(data);
};

export const addTextToParts = (annotation: Annotation, sourceText: any[]): Annotation => {
    // Create a new object to avoid mutating the input
    const enrichedAnnotation = { ...annotation };

    enrichedAnnotation.parts = annotation.parts.map(part => {
        // Get the full text for this textID
        const fullText = getTextById(sourceText, part.textID);

        if (!fullText) {
            console.warn(`No text found for textID: ${part.textID}`);
            return { ...part, text: undefined };
        }

        // Extract the relevant portion using start and end positions
        const extractedText = fullText.substring(part.start, part.end);

        // Return new part object with the text included
        return {
            ...part,
            text: extractedText
        };
    });

    return enrichedAnnotation;
};