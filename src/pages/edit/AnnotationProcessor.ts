import {Annotation} from "./Edit.tsx";

// wird jedes mal ausgeführt, wenn sich eine Annotation ändert oder eine neue Annotation erstellt wurde
// die verarbeitete Annotation kann, wenn gewünscht returned werde um die Veränderungen ggf. anzeigen zu lassen
export const processAnnotation = (annotation: Annotation): Annotation | undefined => {
    //TODO: hier AI kram machen
    console.log(JSON.stringify(annotation, null, 2))
    return undefined
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

/**
 * Datentypen der Annotation
 *
 * export type Annotation = {
 *     id: number,
 *     name: string,
 *     color: string,
 *     author: string,
 *     lastEdit: string,
 *     parts: AnnotationPart[],
 *     models?: Models
 * }
 *
 * export type Models = {
 *     process?: string,
 *     formular?: object,
 *     tree?: string,
 *     freeText?: string
 * }
 *
 * export type AnnotationPart = {
 *     id: number,
 *     textID: number,
 *     start: number,
 *     end: number,
 *     text?: string
 * }
 */

/**
 * Beispielannotation
 *
 * {
 *   "id": 1,
 *   "name": "Test-Anno",
 *   "author": "Müller",
 *   "lastEdit": "2024-10-25T10:35:51.327Z",
 *   "color": "#d1e797",
 *   "parts": [
 *     {
 *       "start": 30,
 *       "end": 59,
 *       "textID": 1,
 *       "id": 97609488,
 *       "text": "geln, wenn sie bei Gefahrüber"
 *     },
 *     {
 *       "start": 90,
 *       "end": 170,
 *       "textID": 1,
 *       "id": 15438230,
 *       "text": "gen, den objektiven Anforderungen und den Montageanforderungen dieser Vorschrift"
 *     },
 *     {
 *       "start": 20,
 *       "end": 50,
 *       "textID": 7,
 *       "id": 25122734,
 *       "text": " etwas anderes vereinbart wurd"
 *     }
 *   ],
 *   "models": {
 *     "process": "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<bpmn2:definitions xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:bpmn2=\"http://www.omg.org/spec/BPMN/20100524/MODEL\" xmlns:bpmndi=\"http://www.omg.org/spec/BPMN/20100524/DI\" xmlns:dc=\"http://www.omg.org/spec/DD/20100524/DC\" xmlns:di=\"http://www.omg.org/spec/DD/20100524/DI\" xsi:schemaLocation=\"http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd\" id=\"sample-diagram\" targetNamespace=\"http://bpmn.io/schema/bpmn\">\n  <bpmn2:process id=\"Process_1\" isExecutable=\"false\">\n    <bpmn2:startEvent id=\"StartEvent_1\"/>\n  </bpmn2:process>\n  <bpmndi:BPMNDiagram id=\"BPMNDiagram_1\">\n    <bpmndi:BPMNPlane id=\"BPMNPlane_1\" bpmnElement=\"Process_1\">\n      <bpmndi:BPMNShape id=\"_BPMNShape_StartEvent_2\" bpmnElement=\"StartEvent_1\">\n        <dc:Bounds height=\"36.0\" width=\"36.0\" x=\"412.0\" y=\"240.0\"/>\n      </bpmndi:BPMNShape>\n    </bpmndi:BPMNPlane>\n  </bpmndi:BPMNDiagram>\n</bpmn2:definitions>\n",
 *     "formular": {
 *       "schemaVersion": 1,
 *       "exporter": {
 *         "name": "form-js",
 *         "version": "0.1.0"
 *       },
 *       "components": [],
 *       "type": "default"
 *     },
 *     "freeText": ""
 *   }
 * }
 */