import {useCallback, useContext, useEffect, useRef, useState} from "react";
import Mark from "./Mark.tsx";
import ForeignMark from "./ForeignMark.tsx";
import AnnotationContext from "../AnnotationContext.ts";
import eventEmitter from "../EventEmitter.ts";
import {AnnotationPart} from "../Edit.tsx";

export type Split = {
    start: number,
    end: number,
    content: string,
    type: "annotation" | "text"
}

interface Mark {
    id: number;
    annotationID: number;
    start: number;
    end: number;
    name: string;
    color: string;
    level?: number;
}

interface SplitMark {
    start: number;
    end: number;
    levelsInfo: { level: number, color: string, name: string, id: number, annotationID: number }[];
}


function SingleStringAnnotator({id, text}: {
    id: string,
    text: string,
}) {

    const [splits, setSplits] = useState<Split[]>([]);
    const [existingAnnotations, setExistingAnnotations] = useState<Mark[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const {
        editMode,
        annotations,
        focusedAnnotation,
        selectionChangeCallback,
        deleteMode
    } = useContext(AnnotationContext);

    useEffect(() => {
        const newAnnotations: Mark[] = [];
        for (const annotation of annotations) {
            for (const part of annotation.parts) {
                if (part.textID === parseInt(id)) {
                    newAnnotations.push({
                        id: part.id,
                        annotationID: annotation.id,
                        start: part.start,
                        end: part.end,
                        name: annotation.name,
                        color: annotation.color
                    });
                }
            }
        }
        setExistingAnnotations(newAnnotations);
    }, [annotations, id]);


    useEffect(() => {
        resetSplits();
    }, [text]);

    useEffect(() => {
        const returnSplits: AnnotationPart[] = splits.filter(split => split.type === "annotation").map(split => {
            return {
                start: split.start,
                end: split.end,
                textID: parseInt(id),
                id: Math.ceil(Math.random() * 100000000),
            }
        })
        selectionChangeCallback({parts: returnSplits, textID: parseInt(id)});
    }, [splits]);

    useEffect(() => {
        if (editMode && focusedAnnotation && focusedAnnotation != -1) {
            const annotation = existingAnnotations.filter(annotation => annotation.annotationID === focusedAnnotation);

            if (annotation.length === 0)
                return;
            const newSplits: Split[] = [];
            let start = 0;
            for (const part of annotation) {
                if (part.start != start) {
                    newSplits.push({
                        start: start,
                        end: part.start,
                        content: text.slice(start, part.start),
                        type: "text"
                    });
                }
                newSplits.push({
                    start: part.start,
                    end: part.end,
                    content: text.slice(part.start, part.end),
                    type: "annotation"
                });
                start = part.end;
            }
            if (start != text.length) {
                newSplits.push({
                    start: start,
                    end: text.length,
                    content: text.slice(start, text.length),
                    type: "text"
                });
            }
            setSplits(newSplits);
        } else {
            resetSplits();
        }
        //dont add the suggested things to tha dependency array. it will break shit
    }, [editMode, existingAnnotations, focusedAnnotation, text]);

    const resetSplits = () => {
        const intitialsplit: Split = {start: 0, end: text.length, content: text, type: "text"}
        setSplits([intitialsplit]);
    }


    /**
     * Get the start and end indices of the current selection
     * please refactor this, this is horrible
     * @returns {{start: number, end: number} | null} The start and end indices of the selection or null if the selection is collapsed or not in the annotator
     */
    const getSelection = (selection: Selection): { start: number; end: number; } | null => {

        //return if ref is broken, shouldn't happen though. if it does, something is very wrong
        if (!ref.current || !selection)
            return null;

        //return if selection is not in annotator
        if (!ref.current.contains(selection.anchorNode) && !ref.current.contains(selection.focusNode)) {
            const range = selection.getRangeAt(0);
            const nodeRange = document.createRange();
            nodeRange.selectNodeContents(ref.current);
            if (range.compareBoundaryPoints(Range.START_TO_END, nodeRange) > 0 && range.compareBoundaryPoints(Range.END_TO_START, nodeRange) < 0)
                return {start: 0, end: text.length}
            else
                return null;
        }

        const anchorNodeStart = parseInt(selection?.anchorNode?.parentElement?.getAttribute('data-start') ?? "", 10);
        const focusNodeStart = parseInt(selection?.focusNode?.parentElement?.getAttribute('data-start') ?? "", 10);


        //I scrapped the backwards selection detection, bc the copying the selection object seems to make it always forward

        //get absolute start and end of selection
        let start = 0
        let end = text.length
        if (selection.anchorNode == selection.focusNode) {
            //selection is in one node
            const splitoffset = anchorNodeStart;
            start = selection.anchorOffset + splitoffset
            end = selection.focusOffset + splitoffset
        } else {
            if (ref.current.contains(selection.anchorNode) && ref.current.contains(selection.focusNode)) {
                start = anchorNodeStart + selection.anchorOffset
                end = focusNodeStart + selection.focusOffset
            } else {
                if (ref.current.contains(selection.anchorNode)) {
                    start = anchorNodeStart + selection.anchorOffset
                    end = text.length
                } else if (ref.current.contains(selection.focusNode)) {
                    start = 0
                    end = focusNodeStart + selection.focusOffset
                }
            }
        }

        //something went very wrong if this happens
        if (isNaN(start) || isNaN(end) || start === end)
            return null;

        return {start, end}
    }

    /**
     * Handle the mouseup event
     */
    const handleSelectionEvent = useCallback((sel: Selection) => {
        const selection = getSelection(sel);
        if (!selection)
            return;
        const {start, end} = selection;

        let events: {time: number, type: "mark" | "text"}[] = [];

        //push split start events
        for (const split of splits) {
            const type = split.type === "annotation" ? "mark" : "text";
            events.push({time: split.start, type: type});
        }
        events.sort((a, b) => a.time - b.time);

        //find the last start event in the selection or the last start event before the selection
        let lastStartInSelection = events.findLast((event) => event.time >= start && event.time <= end);
        if(!lastStartInSelection)
            lastStartInSelection = events.findLast((event) => event.time < start);

        //remove all events in the selection
        events = events.filter((event) => event.time < start || event.time > end)

        //add new event for the selection
        events.push({time: start, type: deleteMode ? "text" : "mark"});

        //add new event for the end of the selection
        if(end+1 < text.length && !events.some((event) => event.time === end+1))
            events.push({time: end+1, type: lastStartInSelection?.type ?? "text"});

        events.sort((a, b) => a.time - b.time);


        //remove marks that are the same as the one before
        let lastType = "";
        events = events.filter((event) => {
            if(event.type === lastType)
                return false;
            lastType = event.type;
            return true;
        })

        //create new splits from events
        const newSplits: Split[] = [];

        for (let i = 1; i < events.length; i++) {
            const event = events[i-1];
            const nextEvent = events[i];
            if(event.type === "text") {
                newSplits.push({
                    start: event.time,
                    end: nextEvent.time,
                    content: text.slice(event.time, nextEvent.time),
                    type: "text"
                });
            } else {
                newSplits.push({
                    start: event.time,
                    end: nextEvent.time,
                    content: text.slice(event.time, nextEvent.time),
                    type: "annotation"
                });
            }
        }
        newSplits.push({
            start: events[events.length-1].time,
            end: text.length,
            content: text.slice(events[events.length-1].time, text.length),
            type: events[events.length-1].type === "mark" ? "annotation" : "text"
        });

        setSplits(newSplits);

        //dont add the suggested things to tha dependency array. it will break shit
    }, [editMode, id, splits, text, deleteMode]);

    useEffect(() => {
        // Subscribe to the event
        eventEmitter.on('annotatormouseup', handleSelectionEvent);

        // Cleanup function to unsubscribe from the event
        return () => {
            eventEmitter.off('annotatormouseup', handleSelectionEvent);
        };
    }, [handleSelectionEvent]);

    useEffect(() => {
        eventEmitter.on('deleteAnnotations', resetSplits)

        return () => {
            eventEmitter.off('deleteAnnotations', resetSplits)
        }

    }, [resetSplits]);

    /**
     * Split marks for easy rendering
     * @param marks
     * @param ends
     */
    function splitMarks(marks: Mark[], ends: number[]): SplitMark[] {
        // Sort marks by start time, and then by end time for stable sorting
        marks.sort((a, b) => a.start - b.start || a.end - b.end);

        const events: { time: number, type: 'start' | 'end', mark: Mark }[] = [];
        const result: SplitMark[] = [];
        let activeMarks: Mark[] = [];
        const markLevels: { [id: number]: number } = {};

        // Create a list of all start and end events
        for (const mark of marks) {
            events.push({time: mark.start, type: 'start', mark});
            events.push({time: mark.end, type: 'end', mark});
        }

        // Sort events first by time, then by type ('end' before 'start' if they have the same time)
        events.sort((a, b) => a.time - b.time || (a.type === 'end' ? -1 : 1));

        let currentTime: number | null = null;

        for (const event of events) {
            if (currentTime !== null && currentTime !== event.time && activeMarks.length > 0) {
                // Create split intervals between currentTime and event.time
                const splitMark: SplitMark = {
                    start: currentTime,
                    end: event.time,
                    levelsInfo: []
                };

                for (const activeMark of activeMarks) {
                    splitMark.levelsInfo.push({
                        level: markLevels[activeMark.id],
                        color: activeMark.color,
                        name: activeMark.name,
                        id: activeMark.id,
                        annotationID: activeMark.annotationID
                    });
                }

                result.push(splitMark);
            }
            currentTime = event.time;

            if (event.type === 'start') {
                activeMarks.push(event.mark);

                // Assign a level to the mark if it doesn't have one already
                if (!(event.mark.id in markLevels)) {
                    // Find the lowest available level
                    let levelFound = false;
                    for (let i = 0; i < activeMarks.length; i++) {
                        if (activeMarks.every(mark => markLevels[mark.id] !== i)) {
                            markLevels[event.mark.id] = i;
                            levelFound = true;
                            break;
                        }
                    }
                    if (!levelFound) {
                        markLevels[event.mark.id] = Object.keys(markLevels).length;
                    }
                }
            } else {
                activeMarks = activeMarks.filter(mark => mark.id !== event.mark.id);
            }
        }
        //Split result by ends
        let splitResults: SplitMark[] = [];
        for (const mark of result) {
            const splitup: SplitMark[] = []
            const endsInRange = ends.filter(end => end >= mark.start && end <= mark.end);
            let lastEnd = mark.start;
            for (const end of endsInRange) {
                splitup.push({
                    start: lastEnd,
                    end: end,
                    levelsInfo: JSON.parse(JSON.stringify(mark.levelsInfo))
                });
                lastEnd = end;
            }
            if (lastEnd != mark.end) {
                splitup.push({
                    start: lastEnd,
                    end: mark.end,
                    levelsInfo: JSON.parse(JSON.stringify(mark.levelsInfo))
                });
            }

            splitResults = splitResults.concat(splitup);
        }


        //Delete names so that they are only shown once per mark
        const ids: number[] = [];
        for (const obj of splitResults) {
            for (const level of obj.levelsInfo) {
                if (ids.includes(level.id)) {
                    level.name = "";
                } else {
                    ids.push(level.id);
                }
            }
        }

        return splitResults;
    }

    const renderSplits = () => {
        const ends = splits.map((split) => split.end)

        const foreignAnnotations: SplitMark[] = splitMarks(existingAnnotations, ends);

        //render splits
        return splits.map((split, index) => {
            const annotations = foreignAnnotations.filter((annotation) => {
                return annotation.start >= split.start && annotation.end <= split.end
            })

            if (annotations.length == 0) {
                //no annotation in this split -> render normally as text or mark
                if (split.type === "text")
                    return <span key={index} data-start={split.start}
                                 data-end={split.end}>{split.content}</span>
                else
                    return <Mark key={index} content={split.content} start={split.start} end={split.end} tag="SIE"/>
            }
            const elements = []
            let start = split.start
            for (let i = 0; i < annotations.length; i++) {
                const annotation = annotations[i]
                if (annotation.start != start) {
                    elements.push(<span key={`${i}_${index}_a`} data-start={start}
                                        data-end={annotation.start}>{text.slice(start, annotation.start)}</span>)
                    elements.push(<ForeignMark key={`${i}_${index}_b`} start={annotation.start}
                                               end={annotation.end}
                                               content={text.slice(annotation.start, annotation.end)}
                                               marks={annotation.levelsInfo}/>)
                } else {
                    elements.push(<ForeignMark key={`${i}_${index}`} start={annotation.start}
                                               end={annotation.end}
                                               content={text.slice(annotation.start, annotation.end)}
                                               marks={annotation.levelsInfo}/>)
                }
                start = annotation.end
            }
            if (start != split.end) {
                elements.push(<span key={index} data-start={start}
                                    data-end={split.end}>{text.slice(start, split.end)}</span>)
            }
            if (split.type === "text")
                return elements
            else
                return <Mark key={index} content={elements} start={split.start} end={split.end} tag="SIE"/>

        })
    }

    return (
        <div key={id} ref={ref}>{renderSplits()}</div>
    )
}

export default SingleStringAnnotator;