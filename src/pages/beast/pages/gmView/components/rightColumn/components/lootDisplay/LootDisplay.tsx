import './LootDisplay.css'

import { Rarity } from '../../../../../../interfaces/infoInterfaces.ts/generalInfoInterfaces'
import LootInfo from '../../../../../../interfaces/infoInterfaces.ts/lootInfoInterfaces'

import PleromaDisplay from './components/pleromaDisplay/PleromaDisplay'
import SpecificLootDisplay from './components/specificLoot/SpecificLootDisplay'
import Body from '../../../../../../components/UI/body/Body'
import HTMLDisplay from '../../../../../../components/UI/htmlDisplay/htmlDisplay'

interface Props {
    lootInfo: LootInfo,
    rarity: Rarity
}

export default function LootDisplay({ lootInfo, rarity }: Props) {
    const { pleroma, specificLoots, lootnotes } = lootInfo

    return (
        <>
            <h2 className='border'>Loot</h2>
            <SpecificLootDisplay specificLoots={specificLoots} />
            <Body>
                <HTMLDisplay html={lootnotes} />
            </Body>
            <PleromaDisplay pleroma={pleroma} rarity={rarity} />
        </>
    )
}