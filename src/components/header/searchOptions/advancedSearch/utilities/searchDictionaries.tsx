import { Size } from "../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces";

export const sizeSearchDictionary: Size[] = [
    'Fine',
    'Diminutive',
    'Tiny',
    'Small',
    'Medium',
    'Large',
    'Huge',
    'Giant',
    'Enormous',
    'Colossal'
]

export interface RaritySearchObject {
    rarity: string,
    id: number
}

export const raritySearchDictionary: RaritySearchObject[] = [
    {
        rarity: 'Legendary',
        id: 1
    },
    {
        rarity: 'Rare',
        id: 3
    },
    {
        rarity: 'Uncommon',
        id: 5
    },
    {
        rarity: 'Common',
        id: 10
    }
]