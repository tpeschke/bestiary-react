import _ from 'lodash'
import { SearchReturn } from '../search'

export default function flattenIDArray (idArray: SearchReturn[][]): SearchReturn[] {
    const idArrayLength = idArray.length

    if (idArrayLength > 1) {
        return _.intersectionWith(idArray, compareIDArray)[0]
    } else if (idArray.length === 1) {
        return [...idArray[0]]
    }

    return []
}

function compareIDArray(one: SearchReturn, two: SearchReturn): boolean {
    return one.id === two.id
}