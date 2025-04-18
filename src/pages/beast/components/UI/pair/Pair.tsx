import "./Pair.css"

type Format = {
    title?: 'none',
    heading?: boolean
}

interface Props {
    title: string,
    info?: string | number,
    format?: Format
}

export default function Pair({ title, info, format }: Props) {
    return (
        <div className={"pair-shell" + (format?.heading ? " heading" : "")}>
            {format?.title === 'none' ?
                <p>{title}</p>
                :
                <h3>{title}</h3>}
            <p>{info}</p>
        </div>
    )
}
