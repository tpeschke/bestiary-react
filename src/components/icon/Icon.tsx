import './Icon.css'

import { JSX, MouseEventHandler } from 'react'
import { Tooltip } from 'react-tooltip'

export type IconName = 'plus' | 'eye' | 'd20' | 'info' | 'bulletList' | 'numberedList' | 'backward' | 'forward' | 'skull' | 'downArrow' | 'down' | 'up' | 'redo' | 'table' | 'image' | 'link' | 'obstacle' | 'copy' | 'deviation' | 'reversal' | 'download' | 'star' | 'star-hollow' | 'magnifying-glass' | 'dice' | 'direction-alphabet-z' | 'direction-alphabet-a' | 'direction-number-9' | 'direction-number-1' | 'log-in' | 'log-out' | 'wall' | 'shield' | 'ghost' | 'trash' | 'crack'

type Color = null | 'black' | 'white' | 'orange' | 'red' | 'yellow' | 'gray'

type IconSize = null | 'h1' | 'h2' | 'small'

type Margin = null | 'left' | 'right' | 'center'

type Float = null | 'left'

interface Props {
    iconName: IconName,
    tooltip?: string,
    htmlTooltip?: {
        component: JSX.Element,
        id: string
    }
    color?: Color,
    iconSize?: IconSize,
    margin?: Margin,
    float?: Float,
    onClick?: MouseEventHandler<HTMLElement>
}

export default function Icon({ iconName, tooltip, color, iconSize, margin, htmlTooltip, float, onClick }: Props) {
    const WARNING = 'warning'
    let styling: string = WARNING;

    switch (iconName) {
        case 'plus':
            styling = "fa-solid fa-plus";
            break;
        case 'eye':
            styling = "fa-regular fa-eye";
            break;
        case 'd20':
            styling = "fa-solid fa-dice-d20";
            break;
        case 'info':
            styling = "fa-solid fa-circle-info";
            break;
        case 'bulletList':
            styling = "fa-solid fa-list";
            break;
        case 'numberedList':
            styling = "fa-solid fa-list-ol";
            break;
        case 'backward':
            styling = "fa-solid fa-reply"
            break;
        case 'forward':
            styling = "fa-solid fa-share"
            break;
        case 'redo':
            styling = "fa-solid fa-rotate-right"
            break;
        case 'skull':
            styling = "fa-solid fa-skull";
            break;
        case 'downArrow':
            styling = "fa-solid fa-arrow-down";
            break;
        case 'down':
            styling = "fa-solid fa-chevron-down"
            break;
        case 'up':
            styling = "fa-solid fa-chevron-up"
            break
        case 'table':
            styling = "fa-solid fa-table"
            break
        case 'image':
            styling = "fa-solid fa-image"
            break
        case 'link':
            styling = "fa-solid fa-link"
            break
        case 'obstacle':
            styling = "fa-solid fa-triangle-exclamation"
            break
        case 'copy':
            styling = "fa-solid fa-copy"
            break
        case 'reversal':
            styling = 'fa-solid fa-right-left'
            break
        case 'download':
            styling = 'fa-solid fa-download'
            break
        case 'star-hollow':
            styling = 'fa-regular fa-star'
            break
        case 'star':
            styling = 'fa-solid fa-star'
            break
        case 'magnifying-glass':
            styling = 'fa-solid fa-magnifying-glass'
            break
        case 'direction-alphabet-z':
            styling = "fa-solid fa-arrow-down-z-a"
            break
        case 'direction-alphabet-a':
            styling = "fa-solid fa-arrow-down-a-z"
            break
        case 'direction-number-9':
            styling = "fa-solid fa-arrow-down-9-1"
            break
        case 'direction-number-1':
            styling = 'fa-solid fa-arrow-down-1-9'
            break
        case 'dice':
            styling = 'fa-solid fa-dice'
            break
        case 'log-in':
            styling = 'fa-solid fa-right-to-bracket'
            break
        case 'log-out':
            styling = 'fa-solid fa-right-from-bracket'
            break
        case 'wall':
            styling = 'fa-solid fa-block-brick'
            break
        case 'shield':
            styling = 'fa-solid fa-shield'
            break
        case 'ghost':
            styling = 'fa-solid fa-ghost'
            break
        case 'trash':
            styling = "fa-solid fa-trash"
            break
        case 'crack':
            styling = "fa-solid fa-wine-glass-crack"
            break
        default:
            break;
    }

    switch (color) {
        case 'black':
            styling += ' black-icon'
            break;
        case 'white':
            styling += ' white-icon'
            break;
        case 'orange':
            styling += ' orange-icon'
            break;
        case 'red':
            styling += ' red-icon'
            break
        case 'yellow':
            styling += ' yellow-icon'
            break
        case 'gray':
            styling += ' gray-icon'
            break
    }

    switch (iconSize) {
        case 'h1':
            styling += ' h1-size'
            break;
        case 'h2':
            styling += ' h2-size'
            break;
    }

    switch (margin) {
        case 'left':
            styling += ' margin-left'
            break;
        case 'right':
            styling += ' margin-right'
            break;
        case 'center':
            styling += ' margin-center'
            break;
    }

    switch (float) {
        case 'left':
            styling += ' float-left'
    }

    if (styling === WARNING) {
        return <p className='warning'>(!)</p>
    }

    if (htmlTooltip) {
        const { component, id } = htmlTooltip
        return (
            <>
                <i onClick={onClick} data-tooltip-id={id} className={styling}></i>
                <Tooltip id={id}>
                    <div>
                        {component}
                    </div>
                </Tooltip>
            </>
        )
    }
    return <i onClick={onClick} data-tooltip-id="my-tooltip" data-tooltip-content={tooltip} className={styling}></i>
}