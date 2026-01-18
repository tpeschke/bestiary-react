import './PleromaDisplay.css'

import Drawers from "../../../../../../../../../../../../components/drawers/Drawers"
import formatPleroma from './utilities/formatPleroma'
import { Rarity } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import { Pleroma } from '@bestiary/common/interfaces/beast/infoInterfaces/lootInfoInterfaces'

interface Props {
    pleroma: Pleroma[],
    rarity: Rarity
}

export default function PleromaDisplay({ pleroma, rarity }: Props) {
    return (
        <div className='pleroma-display-shell'>
            <h3>Pleroma</h3>
            {pleroma.length > 0 ? (
                <Drawers>
                    {pleroma.map((singlePleroma: Pleroma, index: number) => formatPleroma(index, singlePleroma, rarity))}
                </Drawers>
            ) : (
                <p className="italic">This entry has no Pleroma</p>
            )}
        </div>
    )
}
