import './Icon.css'

type Icon = 'plus' | 'eye' | 'd20'

interface Props {
    iconName: Icon
}

export default function Icon({ iconName }: Props) {
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
        default:
            break;
    }

    if (styling === WARNING) {
        return <p className='warning'>(!)</p>
    }
    
    return <i className={styling}></i>
}