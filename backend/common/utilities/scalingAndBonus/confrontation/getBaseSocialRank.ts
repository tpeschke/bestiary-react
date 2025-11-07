import getModBySkullIndex from "@bestiary/common/utilities/scalingAndBonus/getModBySkullIndex"

export default function getBaseSocialRank(skullIndex: number = 0): number {
    const rankDictionary = [ -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ]

    return getModBySkullIndex(skullIndex, 0, rankDictionary)
}