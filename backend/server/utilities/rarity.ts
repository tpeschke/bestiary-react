import { Rarity } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

interface RarityDictionaryObject {
    [key: number]: {
        rarityName: string,
        difficulty: string
    }
}

export function getRarity(rarityId: number): Rarity {
    const rarityDictionary: RarityDictionaryObject = {
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

    const rarityInfo = rarityDictionary[rarityId] ?? { rarityName: 'None' }

    return {
        rarityId,
        ...rarityInfo
    }
}