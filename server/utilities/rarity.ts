import { Rarity } from "../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

export function getRarity(rarityId: number): Rarity {
    const rarityDictionary = {
        1: {
            rarityName: 'Legendary',
            modifier: '2d20'
        },
        3: {
            rarityName: 'Rare',
            modifier: 'd20'
        },
        5: {
            rarityName: 'Uncommon',
            modifier: 'd10'
        },
        10: {
            rarityName: 'Common',
            modifier: '0'
        }
    }

    const rarityInfo = rarityDictionary[rarityId] ?? { rarityName: 'None' }

    return {
        rarityId,
        ...rarityInfo
    }
}