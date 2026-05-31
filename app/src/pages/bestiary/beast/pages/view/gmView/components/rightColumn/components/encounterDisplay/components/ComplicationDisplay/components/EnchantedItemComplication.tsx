import '../ComplicationDisplay.css'

import { enchantedItemPage } from '../../../../../../../../../../../../../frontend-config'
import { BaseComplication } from '@bestiary/common/interfaces/encounterInterfaces'

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