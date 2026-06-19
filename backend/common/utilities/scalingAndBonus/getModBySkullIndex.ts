export default function getModBySkullIndex<Type = number>(skullIndex: number, roleIndexModifier: number, dictionary: Type[], statModifier: number = 0): Type {
    const modifiedIndex = skullIndex + roleIndexModifier + statModifier

    if (modifiedIndex < 0) {
        return dictionary[0]
    }
    if (modifiedIndex > dictionary.length) {
        return dictionary[dictionary.length - 1]
    }
    return dictionary[modifiedIndex]
}

export function getItemBySkullIndex(skullIndex: number, roleIndexModifier: number, dictionary: string[]): string {
    const modifiedIndex = skullIndex + roleIndexModifier

    if (modifiedIndex < 0) {
        return dictionary[0]
    }
    if (modifiedIndex > dictionary.length) {
        return dictionary[dictionary.length - 1]
    }
    return dictionary[modifiedIndex]
}