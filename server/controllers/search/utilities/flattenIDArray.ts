import { SearchReturn } from '../search'

export default function flattenIDArray(idArray: SearchReturn[][]): number[] {
    const idArrayLength = idArray.length
    let idCountObj = {}
    let intersectionArray: number[] = []

    idArray.forEach((innerIDArray: SearchReturn[]) => {
        innerIDArray.forEach(({ id }: SearchReturn) => {
            if (idCountObj[id]) {
                idCountObj[id] += 1
            } else if (!idCountObj[id]) {
                idCountObj[id] = 1
            }

            if (idCountObj[id] >= idArrayLength) {
                intersectionArray.push(id)
            }
        })
    })

    return intersectionArray
}