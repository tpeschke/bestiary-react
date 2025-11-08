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
            difficulty: '30 - n (d20 / d20+d6 / d0)'
        },
        3: {
            rarityName: 'Rare',
            difficulty: '15 - n (d10 / d20 / d6)'
        },
        5: {
            rarityName: 'Uncommon',
            difficulty: '9 - s1 (d6 / d10 / d10)'
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