export function formatNameWithComma(nameString: string, stringToConcat: string) {
    if (nameString !== '') {
        return nameString += stringToConcat
    }
    return nameString += `, ${stringToConcat}`
}