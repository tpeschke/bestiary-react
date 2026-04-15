import getModBySkullIndex from "../../getModBySkullIndex"

export default function getPhysicalSave(skullIndex: number): string {
    const saveDictionary = [
        -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39
    ]

    const rank = getModBySkullIndex(skullIndex, 0, saveDictionary)

    if (rank >= 0) {
        return `+${rank}`
    }
    return `${rank}`
}