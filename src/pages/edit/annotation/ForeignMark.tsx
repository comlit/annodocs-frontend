import {ReactNode} from "react";

export interface MarkProps {
    content: string | ReactNode | ReactNode[]
    start: number
    end: number
    marks: { level: number, color: string, name: string, id: number }[];
    focused: number;
    clickedCallback: (id: number) => void;
}

export interface Mark {
    level: number;
    color: string;
    name: string;
    id: number;
}

function ForeignMark({content, start, end, marks, focused, clickedCallback}: MarkProps) {

    const offset = 3;

    /**
     * Constructs marks when no mark is focused
     * @param marks
     */
    const constructMarkNoFocus = (marks: Mark[]) => {
        const sortedMarks = marks.sort((a, b) => a.level - b.level);
        let combinedElement: ReactNode = <mark
            style={{
                borderTop: `2px solid ${sortedMarks[0].color}`,
                backgroundColor: 'rgba(255, 0, 0, 0)',
                paddingTop: sortedMarks[0].level * offset,
            }}
            data-start={start}
            data-end={end}
        >
            {content}
        </mark>

        for (let i = 1; i < sortedMarks.length; i++) {
            combinedElement = <mark
                style={{
                    borderTop: `2px solid ${sortedMarks[i].color}`,
                    backgroundColor: 'rgba(255, 0, 0, 0)',
                    paddingTop: sortedMarks[i].level * offset,
                }}
                data-start={start}
                data-end={end}
            >
                {combinedElement}
            </mark>;
        }
        return combinedElement;
    }

    /**
     * Constructs marks when a mark is focused
     * @param marks
     */
    const constructMarkFocus = (marks: Mark[]) => {
        const focussedMark = marks.find(mark => mark.id === focused);
        if (focussedMark)
            return <mark
                style={{
                    borderTop: `2px solid ${focussedMark.color}`,
                    backgroundColor: 'rgba(255, 0, 0, 0)',
                    paddingTop: 0,
                }}
                data-start={start}
                data-end={end}
            >
                {content}
            </mark>
        else
            return <mark
                style={{
                    borderTop: `2px solid ${"#d1d1d1"}`,
                    backgroundColor: 'rgba(255, 0, 0, 0)',
                    paddingTop: 0,
                }}
                data-start={start}
                data-end={end}
            >
                {content}
            </mark>
    }

    const constructMark = (marks: Mark[]) => {
        if (!focused)
            return constructMarkNoFocus(marks)
        else
            return constructMarkFocus(marks)
    }

    const constructNameNoFocus = (marks: Mark[]) => {
        const focusedMark = marks.find(mark => mark.id === focused);
        if(focusedMark)
            return <span
                className={'mark-name'}
                style={{
                    fontSize: '0.7em',
                    fontWeight: 500,
                    marginTop: -17,
                    position: 'absolute',
                    background: focusedMark.color,
                    borderRadius: 4,
                    maxWidth: 50,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    paddingLeft: 4,
                    paddingRight: 4,
                    color: getContrastColor(focusedMark.color),
                }}
                title={focusedMark.name}
                onClick={() => clickedCallback(focusedMark.id)}
            >
                {focusedMark.name}
            </span>
        else
            return null;
    }

    const constructNameFocus = (marks: Mark[]) => {
        const filteredMarks = marks.filter(mark => mark.name);
        if (filteredMarks.length === 0)
            return null;
        const names = []
        for (let i = 0; i < filteredMarks.length; i++) {
            names.push(<span
                className={'mark-name'}
                key={i}
                style={{
                    fontSize: '0.7em',
                    fontWeight: 500,
                    marginTop: -17 - Math.max(...marks.map(mark => mark.level)) * offset - i * 20,
                    position: 'absolute',
                    background: filteredMarks[i].color,
                    borderRadius: 4,
                    maxWidth: 50,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    paddingLeft: 4,
                    paddingRight: 4,
                    color: getContrastColor(filteredMarks[i].color),
                }}
                title={filteredMarks[i].name}
                onClick={() => clickedCallback(filteredMarks[i].id)}
            >
                    {filteredMarks[i].name}
                </span>)
        }
        return names;
    }

    const constructName = (marks: Mark[]) => {

        if (!focused)
            return constructNameFocus(marks)
        else
            return constructNameNoFocus(marks)
    }

    function getContrastColor(hexColor: string) {
        const color = hexColor.replace("#", "");
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        return luminance > 186 ? '#000000' : '#FFFFFF';
    }

    return (
        <>
            {constructName(marks)}
            {constructMark(marks)}
        </>
    )
}

export default ForeignMark
