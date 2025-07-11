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

export interface SearchObject {
    value: string | number,
    id: number
}

export const raritySearchDictionary: SearchObject[] = [
    {
        value: 'Legendary',
        id: 1
    },
    {
        value: 'Rare',
        id: 3
    },
    {
        value: 'Uncommon',
        id: 5
    },
    {
        value: 'Common',
        id: 10
    }
]

export const accessSearchDictionary: SearchObject[] = [
    {
        value: 'Basic',
        id: 0
    },
    {
        value: 'Deluxe',
        id: 3
    },
    {
        value: 'Early Access',
        id: 20
    }
]

export const minSkullSearchDictionary: SearchObject[] = [
    {
        value: 1,
        id: 0
    },
    {
        value: 2,
        id: 5
    },
    {
        value: 3,
        id: 10
    },
    {
        value: 4,
        id: 15
    },
    {
        value: 5,
        id: 20
    },
    {
        value: 6,
        id: 25
    },
    {
        value: 7,
        id: 30
    }
]

export const maxSkullSearchDictionary: SearchObject[] = [
    {
        value: 1,
        id: 3
    },
    {
        value: 2,
        id: 8
    },
    {
        value: 3,
        id: 13
    },
    {
        value: 4,
        id: 18
    },
    {
        value: 5,
        id: 23
    },
    {
        value: 6,
        id: 28
    },
    {
        value: 7,
        id: 35
    }
]