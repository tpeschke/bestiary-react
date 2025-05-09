import "./Pair.css"

type Format = {
    title?: 'none',
    heading?: boolean,
    noBorder?: boolean,
    bottomBorder?: boolean,
    position?: 'opposite',
    info?: 'minor'
    infoWidth?: 'unset',
    titleJustified?: 'right'
}

interface Props {
    title: string,
    info?: string | number,
    format?: Format,
}

export default function Pair({ title, info, format }: Props) {
    let shellClassString = "pair-shell"
    format?.heading ? shellClassString += " heading" : null;
    format?.noBorder? shellClassString += " noBorder" : null;
    format?.position ? shellClassString += " opposite" : null;

    let titleClassString = ""
    format?.titleJustified === 'right' ? titleClassString += "justifiedRight" : null

    let infoClassString = ""
    format?.info ? infoClassString += ' minor' : null
    format?.infoWidth === 'unset' ? infoClassString += ' unsetWith' : null

    return (
        <div className={shellClassString}>
            {format?.title === 'none' ?
                <p className={titleClassString}>{title}</p>
                :
                <h3 className={titleClassString}>{title}</h3>}
            <p className={infoClassString}>{info}</p>
        </div>
    )
}
