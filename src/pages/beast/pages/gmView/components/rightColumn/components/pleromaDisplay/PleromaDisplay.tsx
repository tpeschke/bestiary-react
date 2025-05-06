import { Pleroma } from "../../../../../../interfaces/infoInterfaces.ts/lootInfoInterfaces"

import Drawers, { DrawerObject } from "../../../../../../../../components/drawers/Drawers"
import { Rarity } from "../../../../../../interfaces/infoInterfaces.ts/generalInfoInterfaces"
import Pair from "../../../../../../components/UI/pair/Pair"

interface Props {
    pleroma: Pleroma[],
    rarity: Rarity
}

export default function PleromaDisplay({ pleroma, rarity }: Props) {
    const formatedPleroma = pleroma.map((singlePleroma: Pleroma) => formatPleroma(singlePleroma, rarity))
    return (
        <div className='pleroma-display-shell'>
            <h2 className='border'>Pleroma</h2>
            <Drawers drawerInnards={formatedPleroma} />
        </div>
    )
}

function formatPleroma({ name, difficulty, spell, harvest }: Pleroma, { modifier, rarityId }: Rarity): DrawerObject {
    return {
        label: name,
        subtitle: `ID Risk: +${difficulty}+${modifier}`,
        innards: (
            <div className='pleroma-description-shell'>
                <Pair title="Spell" info={spell} />
                <Pair title="Harvest Risk" info={`+${harvest ?? difficulty}`} />
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

function calculatePrice(difficulty: string, harvest: string, rarityModifier?: string): string {
    if (difficulty?.toUpperCase() === 'N/A' && harvest?.toUpperCase() === 'N/A') {
        return 'Priceless'
    }

    if (!harvest && !difficulty) {
        difficulty = '1d0'
    } else if (!difficulty) {
        difficulty = harvest
    }
    if (!harvest) { harvest = '1d0' }
    if (!rarityModifier) { rarityModifier = '1d0' }

    const totaledArray = [rarityModifier, ...harvest.split('+'), ...difficulty.split('+')]

    const totalPrice = totaledArray.reduce(collectAverage, 0)

    if (totalPrice <= 0) {
        return '0 sc'
    }

    return totalPrice + ' sc'
}

function collectAverage(total: number, value: string): number {
    if (value.substring(value.length - 1) === '!') { value = value.substring(0, value.length - 1) }

    const [number, maxDiceValue] = value.split('d')
    return total + ((number ? +number : 1) * (+maxDiceValue / 2))
}