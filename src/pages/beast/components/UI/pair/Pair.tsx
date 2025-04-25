import "./Pair.css"

type Format = {
    title?: 'none',
    heading?: boolean,
    noBorder?: boolean,
    bottomBorder?: boolean,
    position?: 'opposite',
    info?: 'minor'
}

interface Props {
    title: string,
    info?: string | number,
    format?: Format
}

export default function Pair({ title, info, format }: Props) {
    let classString = "pair-shell"
    format?.heading ? classString += " heading" : null;
    format?.noBorder? classString += " noBorder" : null;
    format?.position ? classString += " opposite" : null;

    return (
        <div className={classString}>
            {format?.title === 'none' ?
                <p>{title}</p>
                :
                <h3>{title}</h3>}
            <p className={format?.info ? 'minor' : ''}>{info}</p>
        </div>
    )
}
