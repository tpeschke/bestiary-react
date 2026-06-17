import getModBySkullIndex from "../../getModBySkullIndex"

export default function getDodgeSave(skullIndex: number): string {
    const saveDictionary = [
        -5, -4, -2, -1, 0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 27, 28, 29, 30, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 44
    ]

    const rank = getModBySkullIndex(skullIndex, 0, saveDictionary)

    if (rank >= 0) {
        return `+${rank}`
    }
    return `${rank}`
}