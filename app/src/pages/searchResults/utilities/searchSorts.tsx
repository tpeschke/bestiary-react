import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { SearchResult } from "@bestiary/common/interfaces/search"
import { SortingDirection, SortingOptionAlphabetical, SortingOptions } from "../SearchHooks"

export type ResultSortingFunction = (a: SearchResult, b: SearchResult) => number

export default function sortResults(sortingMethod: SortingOptions, sortingDirection: SortingDirection): ResultSortingFunction {
    if (['maxcombat', 'maxsocial', 'maxskill'].includes(sortingMethod)) {
        return sortByNumber(sortingMethod, sortingDirection)
    } else if (sortingMethod === 'name') {
        return sortByAlphabet(sortingMethod, sortingDirection)
    } else if (sortingMethod === 'size') {
        return sortBySize(sortingDirection)
    } else if (sortingMethod === 'rarity') {
        return sortByRarity(sortingDirection)
    }
    return (a: SearchResult, b: SearchResult): number => a.id - b.id
}

function sortByRarity(sortingDirection: SortingDirection): ResultSortingFunction {
    return (a: SearchResult, b: SearchResult): number => {
        if (sortingDirection === 'dsc') {
            if (a.rarity.rarityId < b.rarity.rarityId) {
                return -1;
            } else if (a.rarity.rarityId > b.rarity.rarityId) {
                return 1;
            }
        } else {
            if (a.rarity.rarityId < b.rarity.rarityId) {
                return 1;
            } else if (a.rarity.rarityId > b.rarity.rarityId) {
                return -1;
            }
        }

        return 0
    }
}

function sortByNumber(sortingMethod: SortingOptions, sortingDirection: SortingDirection): ResultSortingFunction {
    return (a: SearchResult, b: SearchResult): number => {
        if (sortingDirection === 'dsc') {
            if (a[sortingMethod] < b[sortingMethod]) {
                return -1;
            } else if (a[sortingMethod] > b[sortingMethod]) {
                return 1;
            }
        } else {
            if (a[sortingMethod] < b[sortingMethod]) {
                return 1;
            } else if (a[sortingMethod] > b[sortingMethod]) {
                return -1;
            }
        }

        return 0
    }
}


function sortByAlphabet(sortingMethod: SortingOptionAlphabetical, sortingDirection: SortingDirection): ResultSortingFunction {
    return (a: SearchResult, b: SearchResult): number => {
        const upperA = a[sortingMethod].toUpperCase()
        const upperB = b[sortingMethod].toUpperCase()

        if (sortingDirection === 'dsc') {
            if (upperA < upperB) {
                return -1;
            } else if (upperA > upperB) {
                return 1;
            }
        } else {
            if (upperA < upperB) {
                return 1;
            } else if (upperA > upperB) {
                return -1;
            }
        }

        return 0
    }
}

function sortBySize(sortingDirection: SortingDirection): ResultSortingFunction {
    return (a: SearchResult, b: SearchResult): number => {
        const listToSortBy: Size[] = ['Fine', 'Diminutive', 'Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Giant', 'Enormous', 'Colossal']
        const aIndex = listToSortBy.indexOf(a.size)
        const bIndex = listToSortBy.indexOf(b.size)

        if (sortingDirection === 'dsc') {
            if (aIndex < bIndex) {
                return -1;
            } else if (aIndex > bIndex) {
                return 1;
            }
        } else {
            if (aIndex < bIndex) {
                return 1;
            } else if (aIndex > bIndex) {
                return -1;
            }
        }

        return 0
    }
}