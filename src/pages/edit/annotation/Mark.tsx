export interface MarkProps {
    content: string | JSX.Element | JSX.Element[]
    start: number
    end: number
    tag: string
}

function Mark({content, start, end, tag}: MarkProps) {
    return (
        <>
            {tag && (
                <span
                    style={{fontSize: '0.7em',
                        fontWeight: 500,
                        marginTop: 26,
                        position: 'absolute',
                        background: 'lightblue',
                        borderRadius: 4,
                        maxWidth: 50,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        paddingLeft: 4,
                        paddingRight: 4}}
                    title={tag}
                >
                    {tag}
                </span>
            )}
            <mark
                style={{
                    borderRadius: 4,
                    borderBottom: `2px solid rgba(255, 0, 0, 0.5)`,
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

export default Mark
