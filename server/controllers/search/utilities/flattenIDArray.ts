import _ from 'lodash'
import { SearchReturn } from '../search'

export default function flattenIDArray (idArray: SearchReturn[][]): SearchReturn[] {
    const idArrayLength = idArray.length

    if (idArrayLength > 1) {
        const finalIdArray: SearchReturn[] = _.intersection(...idArray).slice(0, 25)
        return finalIdArray
    } else if (idArray.length === 1) {
        return [...idArray[0]]
    }

    return []
}