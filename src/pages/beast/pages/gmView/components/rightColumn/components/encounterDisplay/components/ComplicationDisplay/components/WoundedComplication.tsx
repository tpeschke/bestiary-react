import { WoundedComplication } from '../../../interfaces/EncounterInterfaces'
import '../ComplicationDisplay.css'

interface Props {
    info: WoundedComplication
}

export default function WoundedComplicationDisplay({ info }: Props) {
    const { type, amount, byWhom } = info

    return (
        <>
            <div className='pair-shell'>
                <h4>Type</h4>
                <p>{type}</p>
            </div>
            <div className='pair-shell'>
                <h4>Amount</h4>
                <p>{amount}</p>
            </div>
            <div className='pair-shell'>
                <h4>By</h4>
                <p>{byWhom.name}</p>
            </div>
        </>
    )
}