import {useEffect, useState} from "react";
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

type ForeignAnnotation = {
    start: number,
    end: number,
    name: string,
    first?: boolean
}


function SingleStringAnnotator() {
    const [existingAnnotaions, setExistingAnnotations] = useState<ForeignAnnotation[]>([{
        start: 10,
        end: 20,
        name: "Müller"
    }, {start: 30, end: 40, name: "Schweifel"}, {start: 50, end: 80, name: "Tervel"}])
    const [text, setText] = useState<string>("(1) Die Sache ist frei von Sachmängeln, wenn sie bei Gefahrübergang den subjektiven Anforderungen, den objektiven Anforderungen und den Montageanforderungen dieser Vorschrift entspricht.")
    const [splits, setSplits] = useState<(AnnotationSplit | TextSplit)[]>([]);

    useEffect(() => {
        const intitialsplit: TextSplit = {start: 0, end: text.length, content: text}
        setSplits([intitialsplit]);
    }, []);

    const mouseUp = () => {
        //TODO: FIX mouseup is only triggered when mouse is released inside the div
        const selection = document.getSelection();
        if (!selection || selection?.isCollapsed)
            return;

        //console.log(selection);

        //absolute start and end of selection
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
            if (!isSelectionBackwards(selection)) {
                start = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) + selection.anchorOffset
                end = parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) + selection.focusOffset
            } else {
                start = parseInt(selection.focusNode.parentElement.getAttribute('data-start'), 10) + selection.focusOffset
                end = parseInt(selection.anchorNode.parentElement.getAttribute('data-start'), 10) + selection.anchorOffset
            }
        }
        if (Number.isNaN(start) || Number.isNaN(end)) {
            console.log("start or end is NaN");
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

        document.getSelection()?.empty();
    }

    const isSelectionBackwards = (selection: Selection) => {
        return selection.anchorNode.compareDocumentPosition(selection.focusNode) === Node.DOCUMENT_POSITION_PRECEDING
    }

    //connect marks that are right next to each other
    //or maybe dont do that
    //TODO: ask for intended behavior
    const connectmarks = (splits: (AnnotationSplit | TextSplit)[]) => {
        return splits
    }

    const renderSplits = () => {
        const ends = splits.map((split) => split.end)

        //split up annotations that are in multiple splits into multiple annotations
        const splitupannotations: ForeignAnnotation[] = []
        for (const annotation of existingAnnotaions) {
            const splitup = []
            const endsInRange = ends.filter((end) => end >= annotation.start && end <= annotation.end)
            if (endsInRange.length == 0) {
                splitupannotations.push({...annotation, first: true})
                continue;
            }
            //split annotation at ends
            let start = annotation.start
            for (const end of endsInRange) {
                splitup.push({start: start, end: end, name: annotation.name})
                start = end
            }
            if (start != annotation.end) {
                splitup.push({start: start, end: annotation.end, name: annotation.name})
            }
            splitup[0] = {...splitup[0], first: true}
            splitupannotations.push(...splitup)
        }

        console.log(splitupannotations.map((annotation) => {
            return text.slice(annotation.start, annotation.end)
        }))

        //render splits
        return splits.map((split, index) => {
            const annotations = splitupannotations.filter((annotation) => {
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
                                        end={annotation.end} content={text.slice(annotation.start, annotation.end)} tag={annotation.name}/>)
                } else {
                elements.push(<ForeignMark key={`${i}_${index}`} start={annotation.start}
                                    end={annotation.end} content={text.slice(annotation.start, annotation.end)} tag={annotation.first ? annotation.name : ""}/>)
                }
                start = annotation.end
            }
            if (start != split.end) {
                elements.push(<span key={index} data-start={start}
                                    data-end={split.end}>{text.slice(start, split.end)}</span>)
            }
            if(!(split as AnnotationSplit).color)
                return elements
            else
                return <Mark key={index} content={elements} start={split.start} end={split.end} tag="SIE"/>

        })
    }

    return (
        <div className="jurAbsatz" onMouseUp={mouseUp}>{renderSplits()}</div>
    )
}

export default SingleStringAnnotator;