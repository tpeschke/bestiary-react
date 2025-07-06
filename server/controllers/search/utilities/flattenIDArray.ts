import _ from 'lodash'

export default function flattenIDArray (idArray: number[][]): number[] {
    const idArrayLength = idArray.length

    if (idArrayLength > 1) {
        console.log(idArray)
        const finalIdArray: number[] = _.intersection(...idArray)
        console.log(finalIdArray)
        return finalIdArray
    } else if (idArray.length === 1) {
        return [...idArray[0]]
    }

    return []
}