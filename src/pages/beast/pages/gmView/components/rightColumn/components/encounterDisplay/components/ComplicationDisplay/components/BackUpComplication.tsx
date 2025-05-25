import '../ComplicationDisplay.css'

import { BackUpComplication } from '../../../interfaces/EncounterInterfaces'

import { beastPage } from '../../../../../../../../../../../frontend-config'

interface Props {
    info: BackUpComplication
}

export default function BackUpComplicationDisplay({ info }: Props) {
    const { name, id, time, type } = info

    return (
        <>
            <div className='pair-shell'>
                <h4>Type</h4>
                <p>{type}</p>
            </div>
            <div className='pair-shell'>
                <h4>Time</h4>
                <p>{time}</p>
            </div>
            <div className='pair-shell'>
                <h4>Back Up</h4>
                <a href={beastPage + id} target='_blank'>
                    <p>{name}</p>
                </a>
            </div>
        </>
    )
}