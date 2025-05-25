import { LostComplication } from '../../../interfaces/EncounterInterfaces'
import '../ComplicationDisplay.css'

interface Props {
    info: LostComplication
}

export default function LostComplicationDisplay({ info }: Props) {
    const { type, distance } = info

    return (
        <>
            <div className='pair-shell'>
                <h4>Type</h4>
                <p>{type}</p>
            </div>
            <div className='pair-shell'>
                <h4>Distance</h4>
                <p>{distance}</p>
            </div>
        </>
    )
}