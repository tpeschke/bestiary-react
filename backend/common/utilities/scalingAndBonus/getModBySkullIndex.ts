export default function getModBySkullIndex(skullIndex: number, roleIndexModifier: number = 0, dictionary: number[]): number {
    const modifiedIndex = skullIndex + roleIndexModifier

    if (modifiedIndex < 0) {
        return dictionary[0]
    }
    if (modifiedIndex > dictionary.length) {
        return dictionary[dictionary.length - 1]
    }
    return dictionary[modifiedIndex]
}