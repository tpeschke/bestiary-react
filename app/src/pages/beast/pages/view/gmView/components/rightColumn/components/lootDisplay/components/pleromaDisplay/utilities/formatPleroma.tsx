import { DrawerObject } from "../../../../../../../../../../../../components/drawers/Drawers"
import { Rarity } from "../../../../../../../../../../interfaces/infoInterfaces/generalInfoInterfaces"
import { Pleroma } from "../../../../../../../../../../interfaces/infoInterfaces/lootInfoInterfaces"
import Pair from "../../../../../../../../../../components/UI/pair/Pair"
import calculatePrice from "./calculatePrice"
import formatHarvest from "./formatHarvest"

export default function formatPleroma({ name, difficulty, spell, harvest }: Pleroma, { modifier, rarityId }: Rarity): DrawerObject {
    return {
        label: name,
        subtitle: `ID Risk: +${difficulty}+${modifier}`,
        innards: (
            <div className='pleroma-description-shell'>
                <Pair title="Spell" info={spell} />
                <Pair title="Harvest Risk" info={formatHarvest(harvest, difficulty)} />
                <Pair title="SP Bonus" info={calculateSpellPointBonus(rarityId)} />
                <Pair title="Check Bonus" info={calculateCheckBonus(rarityId)} />
                <Pair title="Price" info={calculatePrice(harvest, difficulty, modifier)} />
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