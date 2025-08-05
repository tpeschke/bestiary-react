import './PleromaDisplay.css'

import { Pleroma } from "../../../../../../../../../interfaces/infoInterfaces/lootInfoInterfaces"

import Drawers from "../../../../../../../../../../../components/drawers/Drawers"
import { Rarity } from "../../../../../../../../../interfaces/infoInterfaces/generalInfoInterfaces"
import formatPleroma from './utilities/formatPleroma'

interface Props {
    pleroma: Pleroma[],
    rarity: Rarity
}

export default function PleromaDisplay({ pleroma, rarity }: Props) {
    const formattedPleroma = pleroma.map((singlePleroma: Pleroma) => formatPleroma(singlePleroma, rarity))

    return (
        <div className='pleroma-display-shell'>
            <h3>Pleroma</h3>
            {pleroma.length > 0 ? (
                <Drawers drawerInnards={formattedPleroma} />
            ): (
                <p className="italic">This entry has no Pleroma</p>
            )}
        </div>
    )
}
