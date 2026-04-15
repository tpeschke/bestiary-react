import getModBySkullIndex from "../../getModBySkullIndex"

export default function getDodgeSave(skullIndex: number): string {
    const saveDictionary = [
        -3, -2, -2, -1, 0, 1, 2, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10, 11, 11, 12, 13, 14, 15, 15, 16, 17, 18, 19, 19, 20, 21, 22, 23, 23, 24, 25, 26, 27, 27, 28, 29
    ]

    const rank = getModBySkullIndex(skullIndex, 0, saveDictionary)

    if (rank >= 0) {
        return `+${rank}`
    }
    return `${rank}`
}