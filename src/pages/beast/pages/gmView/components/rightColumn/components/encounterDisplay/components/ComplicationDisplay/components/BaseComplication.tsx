import { BaseComplication } from '../../../interfaces/EncounterInterfaces'
import '../ComplicationDisplay.css'

interface Props {
    info: BaseComplication
}

export default function BaseComplicationDisplay({ info }: Props) {
    const { type } = info

    return (
        <div className='pair-shell'>
            <h4>Type</h4>
            <p>{type}</p>
        </div>
    )
}