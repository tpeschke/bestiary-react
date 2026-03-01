import getModBySkullIndex from "../../getModBySkullIndex"

export default function calculateDescriptionRank(skullIndex: number = 0): number {
    const rankDictionary = [ 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ]

    return getModBySkullIndex(skullIndex, 0, rankDictionary)
}