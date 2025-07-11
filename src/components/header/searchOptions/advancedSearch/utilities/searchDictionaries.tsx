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

export interface AccessSearchObject {
    access: string,
    id: number
}

export const accessSearchDictionary: AccessSearchObject[] = [
    {
        access: 'Basic',
        id: 0
    },
    {
        access: 'Deluxe',
        id: 3
    },
    {
        access: 'Early Access',
        id: 20
    }
]

export interface SkullNumberObject {
    skulls: number,
    id: number
}

export const minSkullSearchDictionary: SkullNumberObject[] = [
    {
        skulls: 1,
        id: 0
    },
    {
        skulls: 2,
        id: 5
    },
    {
        skulls: 3,
        id: 10
    },
    {
        skulls: 4,
        id: 15
    },
    {
        skulls: 5,
        id: 20
    },
    {
        skulls: 6,
        id: 25
    },
    {
        skulls: 7,
        id: 30
    }
]

export const maxSkullSearchDictionary: SkullNumberObject[] = [
    {
        skulls: 1,
        id: 3
    },
    {
        skulls: 2,
        id: 8
    },
    {
        skulls: 3,
        id: 13
    },
    {
        skulls: 4,
        id: 18
    },
    {
        skulls: 5,
        id: 23
    },
    {
        skulls: 6,
        id: 28
    },
    {
        skulls: 7,
        id: 35
    }
]