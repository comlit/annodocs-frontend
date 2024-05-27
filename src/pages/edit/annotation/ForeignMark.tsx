
export interface MarkProps {
    content: string | JSX.Element | JSX.Element[]
    start: number
    end: number
    marks: { level: number, color: string, name: string, id: number }[];
}

function ForeignMark({content, start, end, marks}: MarkProps) {

    const names = marks.map(mark => mark.name).join(', ');

    return (
        <>
            {names && (
                <span
                    style={{fontSize: '0.7em',
                        fontWeight: 500,
                        marginTop: -17,
                        position: 'absolute',
                        background: 'lightblue',
                        borderRadius: 4,
                        maxWidth: 50,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        paddingLeft: 4,
                        paddingRight: 4,}}
                    title={JSON.stringify(marks)}
                >
                    {names}
                </span>
            )}
            <mark
                style={{
                    cursor: 'pointer',
                    borderTop: `2px solid lightgreen`,
                    backgroundColor: 'rgba(255, 0, 0, 0)'
                }}
                data-start={start}
                data-end={end}
            >
                {content}

            </mark>
        </>
    )
}

export default ForeignMark
