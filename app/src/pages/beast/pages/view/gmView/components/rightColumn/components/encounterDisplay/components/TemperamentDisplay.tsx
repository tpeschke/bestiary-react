import Icon from '../../../../../../../../../../components/icon/Icon'
import '../EncounterDisplay.css'

import { Temperament } from '../interfaces/EncounterInterfaces'

interface Props {
    temperamentInfo: Temperament
}

export default function TemperamentDisplay({ temperamentInfo }: Props) {
    const { temperament, tooltip } = temperamentInfo

    return (
        <div className='pair-shell'>
            <h3>Temperament</h3>
            <p>{temperament} <Icon iconName='info' tooltip={tooltip} /></p>
        </div>
    )
}