export function grabRandomElementFromArray(array: any[]) {
    return array[Math.floor(Math.random() * array.length)]
}

export function grabRandomElementFromArrayWithIndex(array: any[]) {
    const index = Math.floor(Math.random() * array.length)
    return {
        index,
        array: array[index]
    }
}