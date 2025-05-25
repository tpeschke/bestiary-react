import './Icon.css'

import { JSX } from 'react'
import { Tooltip } from 'react-tooltip'

type Icon = 'plus' | 'eye' | 'd20' | 'info' | 'bulletList' | 'numberedList' | 'backward' | 'forward' | 'skull' | 'downArrow' | 'down' | 'up' | 'redo' | 'table' | 'image' | 'link'

type Color = null | 'black' | 'white'

type IconSize = null | 'h2' | 'small'

type Margin = null | 'left' | 'right' | 'center'

interface Props {
    iconName: Icon,
    tooltip?: string,
    htmlTooltip?: {
        component: JSX.Element,
        id: string
    }
    color?: Color,
    iconSize?: IconSize,
    margin?: Margin,
}

export default function Icon({ iconName, tooltip, color, iconSize, margin, htmlTooltip }: Props) {
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
    }

    switch (iconSize) {
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

    if (styling === WARNING) {
        return <p className='warning'>(!)</p>
    }

    if (htmlTooltip) {
        const { component, id } = htmlTooltip
        return (
            <>
                <i data-tooltip-id={id} className={styling}></i>
                <Tooltip id={id}>
                    <div>
                        {component}
                    </div>
                </Tooltip>
            </>
        )
    }
    return <i data-tooltip-id="my-tooltip" data-tooltip-content={tooltip} className={styling}></i>
}