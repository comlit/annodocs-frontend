import {useCallback, useEffect, useRef, useState} from "react";
import Mark from "./Mark.tsx";
import ForeignMark from "./ForeignMark.tsx";

type AnnotationSplit = {
    start: number,
    end: number,
    color: string
    content: string
}
type TextSplit = {
    start: number,
    end: number,
    content: string
}

interface Mark {
    id: number;
    start: number;
    end: number;
    name: string;
    color: string;
    level?: number;
}

interface SplitMark {
    start: number;
    end: number;
    levelsInfo: { level: number, color: string, name: string, id: number }[];
}


function SingleStringAnnotator({text, existingAnnotations}: { text: string, existingAnnotations: Mark[] }) {
    const [splits, setSplits] = useState<(AnnotationSplit | TextSplit)[]>([]);

    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const intitialsplit: TextSplit = {start: 0, end: text.length, content: text}
        setSplits([intitialsplit]);
    }, [text]);

    const mouseUp = useCallback(() => {
        console.log("mouseup on " + text.slice(0, 10))
        //TODO: FIX mouseup is only triggered when mouse is released inside the div
        const selection = document.getSelection();
        if (!selection || selection?.isCollapsed)
            return;

        //get absolute start and end of selection
        let start = 0
        let end = text.length
        if (selection.anchorNode == selection.focusNode) {
            //selection is in one node
            const splitoffset = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10);
            start = selection.anchorOffset + splitoffset
            end = selection.focusOffset + splitoffset
            if (start > end) {
                [start, end] = [end, start];
            }
        } else {
            //selection is in multiple nodes
            if(!ref.current)
                return;
            if (!isSelectionBackwards(selection)) {
                if (ref.current.contains(selection.anchorNode) && ref.current.contains(selection.focusNode)) {
                    start = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) + selection.anchorOffset
                    end = parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) + selection.focusOffset
                } else {
                    if(ref.current.contains(selection.anchorNode)){
                        start = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) + selection.anchorOffset
                        end = text.length
                    }else if(ref.current.contains(selection.focusNode)){
                        start = 0
                        end = parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) + selection.focusOffset
                    }
                }
            } else {
                if (ref.current && ref.current.contains(selection.anchorNode) && ref.current.contains(selection.focusNode)) {
                    start = parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) + selection.focusOffset
                    end = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) + selection.anchorOffset
                } else {
                    if(ref.current.contains(selection.anchorNode)){
                        start = 0
                        end = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) + selection.anchorOffset
                    }else if(ref.current.contains(selection.focusNode)){
                        start = parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) + selection.focusOffset
                        end = text.length
                    }
                }
            }
        }
        // if selection is not inside the annotator everything will be marked. which is not intended
        // selection is deleted before all annotators are updated. which ist not intended
        //TODO: FIX


        console.log(start, end, text.slice(start, end))
        //something went very wrong
        if (isNaN(start) || isNaN(end)) {
            document.getSelection()?.empty();
            return;
        }


        //only one split is affected
        if (splits.find(e => e.start <= start && e.end >= end)) {
            const affected = splits.find((split) => {
                return split.start <= start && split.end >= end;
            })
            if (!affected || (affected as AnnotationSplit).color) {
                console.log("no affected split or affected split is annotation");
                document.getSelection()?.empty();
                return;
            }
            const splitstart = affected.start
            const splitend = affected.end

            const newsplits: (AnnotationSplit | TextSplit)[] = []
            if (splitstart != start) {
                newsplits.push({
                    start: splitstart,
                    end: start,
                    content: text.slice(splitstart, start)
                })
            }
            newsplits.push({
                start: start,
                end: end,
                color: "red",
                content: text.slice(start, end)
            })
            if (splitend != end) {
                newsplits.push({
                    start: end,
                    end: splitend,
                    content: text.slice(end, splitend)
                })
            }

            setSplits((prevState) => {
                //replace affected split with 3 new splits
                const index = prevState.indexOf(affected);
                const splits = [...prevState];
                splits.splice(index, 1, ...newsplits);
                return splits;
            });
        } else {
            //more than one split is affected
            const affectedsplits = splits.filter((split) => {
                //split is completely inside selection || split end is inside selection || split start is inside selection
                return (split.start >= start && split.end <= end) || (split.start <= end && split.end >= end) || (split.start <= start && split.end >= start)
            })
            //if this is true something went extremely wrong
            if (affectedsplits.length == 0) {
                console.log("no affected splits");
                document.getSelection()?.empty();
                return;
            }
            let markstart = start;
            let markend = end;
            const newsplits: (AnnotationSplit | TextSplit)[] = [];
            for (const split of affectedsplits) {
                //selection starts in split and ends in another split
                if (split.start <= start && split.end >= start) {
                    if ((split as AnnotationSplit).color) {
                        markstart = split.start;
                    } else {
                        //text before selection
                        if (split.start != start)
                            newsplits.push({
                                start: split.start,
                                end: start,
                                content: text.slice(split.start, start)
                            })
                    }
                }
                //selection starts in another split and ends in split
                if (split.start <= end && split.end >= end) {
                    if ((split as AnnotationSplit).color) {
                        markend = split.end;
                    } else {
                        //text after selection
                        if (split.end != end)
                            newsplits.push({
                                start: end,
                                end: split.end,
                                content: text.slice(end, split.end)
                            })
                    }
                }
            }
            //mark text between start and end
            newsplits.push({
                start: markstart,
                end: markend,
                color: "red",
                content: text.slice(markstart, markend)
            })

            newsplits.sort((a, b) => {
                return a.start - b.start;
            })

            setSplits((prevState) => {
                //replace affected splits with new splits
                const index = prevState.indexOf(affectedsplits[0]);
                const splits = [...prevState];
                splits.splice(index, affectedsplits.length, ...newsplits);
                return splits;
            });
        }

        console.log("delete selection on" + text.slice(0, 10))
        document.getSelection()?.empty();
    }, [splits, text]);

    useEffect(() => {
        // Fügen Sie den globalen Mouseup-Listener hinzu
        document.addEventListener('mouseup', mouseUp);

        // Entfernen Sie den Listener beim Cleaning-up
        return () => {
            document.removeEventListener('mouseup', mouseUp);
        };
    }, [mouseUp]);

    const isSelectionBackwards = (selection: Selection) => {
        return selection.anchorNode.compareDocumentPosition(selection.focusNode) === Node.DOCUMENT_POSITION_PRECEDING
    }

    //connect marks that are right next to each other
    //or maybe dont do that
    //TODO: ask for intended behavior
    const connectmarks = (splits: (AnnotationSplit | TextSplit)[]) => {
        return splits
    }

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
                        id: activeMark.id
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
            //console.log(annotations)
            if (annotations.length == 0) {
                //no annotation in this split -> render normally as text or mark
                if (!(split as AnnotationSplit).color)
                    return <span key={index} data-start={split.start}
                                 data-end={split.end}>{(split as TextSplit).content}</span>
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
            if (!(split as AnnotationSplit).color)
                return elements
            else
                return <Mark key={index} content={elements} start={split.start} end={split.end} tag="SIE"/>

        })
    }

    return (
        <div className="jurAbsatz" ref={ref} onMouseUp={mouseUp}>{renderSplits()}</div>
    )
}

export default SingleStringAnnotator;