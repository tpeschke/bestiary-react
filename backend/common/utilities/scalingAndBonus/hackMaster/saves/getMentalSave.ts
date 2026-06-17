import getModBySkullIndex from "../../getModBySkullIndex"

export default function getMentalSave(skullIndex: number): string {
    const saveDictionary = [
        -5, -4, -3, -1, 0, 1, 3, 4, 5, 7, 8, 9, 11, 12, 13, 15, 16, 17, 19, 20, 21, 23, 24, 25, 27, 28, 29, 31, 32, 33, 35, 36, 37, 38, 40, 41, 42, 44, 45, 46, 48
    ]

    const rank = getModBySkullIndex(skullIndex, 0, saveDictionary)

    if (rank >= 0) {
        return `+${rank}`
    }
    return `${rank}`
}