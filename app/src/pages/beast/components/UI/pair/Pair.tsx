import Icon, { IconName } from "../../../../../components/icon/Icon"
import "./Pair.css"

type Format = {
    title?: 'none',
    heading?: boolean,
    noBorder?: boolean,
    position?: 'opposite',
    info?: 'minor'
    infoWidth?: 'unset',
    titleJustified?: 'right' | 'left'
}

export type PairIconSettings = {
    iconName: IconName,
    tooltip?: string
}

interface Props {
    title: string,
    info?: string | number,
    format?: Format,
    icon?: PairIconSettings | null
}

export default function Pair({ title, info, format, icon }: Props) {
    let shellClassString = "pair-shell"
    format?.heading ? shellClassString += " heading" : null;
    format?.noBorder? shellClassString += " noBorder" : null;
    format?.position ? shellClassString += " opposite" : null;

    let titleClassString = ""
    format?.titleJustified === 'right' ? titleClassString += "justifiedRight" : null
    format?.titleJustified === 'left' ? titleClassString += "justifiedLeft" : null

    let infoClassString = ""
    format?.info ? infoClassString += ' minor' : null
    format?.infoWidth === 'unset' ? infoClassString += ' unsetWith' : null

    return (
        <div className={shellClassString}>
            {format?.title === 'none' ?
                <p className={titleClassString}>{title}</p>
                :
                <h3 className={titleClassString}>{title}</h3>}
            <p className={infoClassString}>{info} {icon && <Icon iconName={icon.iconName} tooltip={icon.tooltip} color='black' />}</p>
        </div>
    )
}
