export interface MarkProps {
    key: string
    content: string
    start: number
    end: number
    tag: string
    color?: string
    onClick: (any) => any
}

function Mark(props: MarkProps) {
    return (
        <>
            {props.tag && (
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
                        paddingRight: 4,}}
                >
                    {props.tag}
                </span>
            )}
            <mark
                style={{
                    padding: '0 4px',
                    borderRadius: 4,
                    cursor: 'pointer',
                    borderBottom: `2px solid ${props.color}`,
                    backgroundColor: 'rgba(255, 0, 0, 0)'
                }}
                data-start={props.start}
                data-end={props.end}
                onClick={() => props.onClick({start: props.start, end: props.end})}
            >
                {props.content}

            </mark>
        </>
    )
}

export default Mark
