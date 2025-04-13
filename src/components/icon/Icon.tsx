import './Icon.css'

type Icon = 'plus' | 'eye' | 'd20' | 'info'

interface Props {
    iconName: Icon,
    tooltip?: string
}

export default function Icon({ iconName, tooltip }: Props) {
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
        default:
            break;
    }

    if (styling === WARNING) {
        return <p className='warning'>(!)</p>
    }
    
    return <i data-tooltip-id="my-tooltip" data-tooltip-content={tooltip} className={styling}></i>
}