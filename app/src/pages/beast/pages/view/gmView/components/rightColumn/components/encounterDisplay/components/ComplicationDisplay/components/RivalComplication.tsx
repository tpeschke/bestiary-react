import '../ComplicationDisplay.css'

import { RivalComplication } from '../../../interfaces/EncounterInterfaces'
import { beastPage } from '../../../../../../../../../../../../frontend-config'

interface Props {
    info: RivalComplication
}

export default function RivalComplicationDisplay({ info }: Props) {
    const { type, actors } = info

    return (
        <>
            <div className='pair-shell'>
                <h4>Type</h4>
                <p>{type}</p>
            </div>
            <div className='pair-shell'>
                <h4>{type === 'Rival' ? 'Rivals' : 'Allies'}</h4>
                <a href={beastPage + actors.id} target='_blank'>
                    <p>{actors.name}</p>
                </a>
            </div>
        </>
    )
}