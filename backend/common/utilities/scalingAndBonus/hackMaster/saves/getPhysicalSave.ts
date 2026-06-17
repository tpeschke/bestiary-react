import getModBySkullIndex from "../../getModBySkullIndex"

export default function getPhysicalSave(skullIndex: number): string {
    const saveDictionary = [
        -6, -5, -3, -2, 0, 2, 3, 5, 6, 8, 10, 11, 13, 15, 16, 18, 19, 21, 23, 24, 26, 27, 29, 31, 32, 34, 36, 37, 39, 40, 42, 44, 45, 47, 48, 50, 52, 53, 55, 57, 58
    ]

    const rank = getModBySkullIndex(skullIndex, 0, saveDictionary)

    if (rank >= 0) {
        return `+${rank}`
    }
    return `${rank}`
}