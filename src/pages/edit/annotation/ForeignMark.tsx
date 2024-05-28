export interface MarkProps {
    content: string | JSX.Element | JSX.Element[]
    start: number
    end: number
    marks: { level: number, color: string, name: string, id: number }[];
}

function ForeignMark({content, start, end, marks}: MarkProps) {

    const constructMark = (marks: { level: number, color: string, name: string, id: number }[]) => {
        const sortedMarks = marks.sort((a, b) => a.level - b.level);
        let combinedElement: JSX.Element = <mark
            style={{
                cursor: 'pointer',
                borderTop: `2px solid ${sortedMarks[0].color}`,
                backgroundColor: 'rgba(255, 0, 0, 0)',
                paddingTop: sortedMarks[0].level * 4,
            }}
            data-start={start}
            data-end={end}
        >
            {content}
        </mark>

        for (let i = 1; i < sortedMarks.length; i++) {
            combinedElement = <mark
                style={{
                    cursor: 'pointer',
                    borderTop: `2px solid ${sortedMarks[i].color}`,
                    backgroundColor: 'rgba(255, 0, 0, 0)',
                    paddingTop: sortedMarks[i].level * 4,
                }}
                data-start={start}
                data-end={end}
            >
                {combinedElement}
            </mark>;
        }
        return combinedElement;
    }

    const constructName = (marks: { level: number, color: string, name: string, id: number }[]) => {
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
                    marginTop: -17 - Math.max(...marks.map(mark => mark.level)) * 4 - i * 20,
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
            >
                    {filteredMarks[i].name}
                </span>)
        }
        return names;
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
