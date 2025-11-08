import { DrawerObject } from "../../../../../../../../../../../../components/drawers/Drawers"
import Pair from "../../../../../../../../../../components/UI/pair/Pair"
import calculatePrice from "./calculatePrice"
import formatHarvest from "./formatHarvest"
import { Pleroma } from '@bestiary/common/interfaces/beast/infoInterfaces/lootInfoInterfaces'
import { Rarity } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

export default function formatPleroma({ name, harvestDifficulty, spell, positionModifier }: Pleroma, { difficulty, rarityId }: Rarity): DrawerObject {
    return {
        label: name,
        subtitle: `ID Diff: ${difficulty} ${positionModifier}`,
        innards: (
            <div className='pleroma-description-shell'>
                <Pair title="Spell" info={spell} />
                <Pair title="Harvest Diff" info={formatHarvest(harvestDifficulty, positionModifier, difficulty)} />
                <Pair title="SP Bonus" info={calculateSpellPointBonus(rarityId)} />
                <Pair title="Check Bonus" info={calculateCheckBonus(rarityId)} />
                <Pair title="Price" info={calculatePrice(harvestDifficulty, positionModifier, difficulty)} />
            </div>
        )
    }
}

function calculateSpellPointBonus(rarityId: number): string {
    switch (rarityId) {
        case 1:
            return '+32';
        case 3:
            return '+16';
        case 5:
            return '+8';
        case 10:
            return '+4';
        default:
            return '+0'
    }
}

function calculateCheckBonus(rarityId: number): string {
    switch (rarityId) {
        case 1:
            return '+16';
        case 3:
            return '+8';
        case 5:
            return '+4';
        case 10:
            return '+2';
        default:
            return '+0'
    }
}