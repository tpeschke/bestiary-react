import '../ComplicationDisplay.css'

import { BaseComplication } from '../../../interfaces/EncounterInterfaces'
import { enchantedItemPage } from '../../../../../../../../../../../../frontend-config'

interface Props {
    info: BaseComplication
}

export default function EnchantedItemComplicationDisplay({ info }: Props) {
    const { type } = info

    return (
        <div className='pair-shell'>
            <h4>Type</h4>
            <a href={enchantedItemPage} target='_blank'>
                <p>{type}</p>
            </a>
        </div>
    )
}