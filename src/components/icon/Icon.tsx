import './Icon.css'

type Icon = 'plus' | 'eye' | 'd20' | 'info' | 'bulletList' | 'numberedList' | 'backward' | 'forward' | 'skull' | 'downArrow'

type Color = null | 'black'

type IconSize = null | 'h2' | 'small'

type Margin = null | 'left' | 'right' | 'center'

interface Props {
    iconName: Icon,
    tooltip?: string,
    color?: Color,
    iconSize?: IconSize,
    margin?: Margin
}

export default function Icon({ iconName, tooltip, color, iconSize, margin }: Props) {
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
            styling = "fa-solid fa-rotate-left"
            break;
        case 'forward':
            styling = "fa-solid fa-rotate-right"
            break;
        case 'skull':
            styling = "fa-solid fa-skull";
            break;
        case 'downArrow':
            styling = "fa-solid fa-arrow-down";
            break;
        default:
            break;
    }


    switch (color) {
        case 'black':
            styling += ' black-icon'
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

    return <i data-tooltip-id="my-tooltip" data-tooltip-content={tooltip} className={styling}></i>
}