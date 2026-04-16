import { SystemOption } from "@bestiary/common/interfaces/beast/beast"
import { Rarity } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

interface RarityDictionaryObject {
    [key: number]: {
        rarityName: string,
        difficulty: string
    }
}

const bonfireRarityDictionary: RarityDictionaryObject = {
    1: {
        rarityName: 'Legendary',
        difficulty: '18 - n (d12 / d20+d4 / d2)'
    },
    3: {
        rarityName: 'Rare',
        difficulty: '12 - s1 (d8 / d12 / d6)'
    },
    5: {
        rarityName: 'Uncommon',
        difficulty: '6 - s1 (d4 / d8 / d10)'
    },
    10: {
        rarityName: 'Common',
        difficulty: '0 - s1 (d0 / d6 / d20)'
    }
}

const hackMasterRarityDictionary: RarityDictionaryObject = {
    1: {
        rarityName: 'Legendary',
        difficulty: '+100% to Monster Lore'
    },
    3: {
        rarityName: 'Rare',
        difficulty: '+0% to Monster Lore'
    },
    5: {
        rarityName: 'Uncommon',
        difficulty: '-50% to Monster Lore'
    },
    10: {
        rarityName: 'Common',
        difficulty: '-75% to Monster Lore'
    }
}

export function getRarity(rarityId: number, system: SystemOption = 'Bonfire'): Rarity {
    const rarityDictionary = system === 'Bonfire' ? bonfireRarityDictionary : hackMasterRarityDictionary

    const rarityInfo = rarityDictionary[rarityId] ?? { rarityName: 'None' }

    return {
        rarityId,
        ...rarityInfo
    }
}