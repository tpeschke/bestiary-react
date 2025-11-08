import './LootDisplay.css'

import LootInfo from '../../../../../../../interfaces/infoInterfaces/lootInfoInterfaces'
import PleromaDisplay from './components/pleromaDisplay/PleromaDisplay'
import SpecificLootDisplay from './components/specificLoot/SpecificLootDisplay'
import Body from '../../../../../../../components/UI/body/Body'
import HTMLDisplay from '../../../../../../../components/UI/htmlDisplay/htmlDisplay'
import GeneratedLootDisplay from './components/generatedLoot/GeneratedLootDisplay'
import Loading from '../../../../../../../../../components/loading/Loading'
import { Rarity } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'

interface Props {
    lootInfo: LootInfo,
    rarity: Rarity,
    maxPoints: number
}

export default function LootDisplay({ lootInfo, rarity, maxPoints }: Props) {
    const { pleroma, specificLoots, lootnotes, carriedLoot, lairLoot } = lootInfo

    return (
        <>
            <h2 className='border'>Loot</h2>
            <SpecificLootDisplay specificLoots={specificLoots} />
            {lootnotes && (
                <Body>
                    <HTMLDisplay html={lootnotes} />
                </Body>
            )}
            <Loading secondary={true}>
                <GeneratedLootDisplay carriedLoot={carriedLoot} lairLoot={lairLoot} maxPoints={maxPoints}/>
            </Loading>
            <PleromaDisplay pleroma={pleroma} rarity={rarity} />
        </>
    )
}