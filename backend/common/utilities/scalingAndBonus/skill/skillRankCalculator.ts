
export function calculateRankForSkill(skullIndex: number): number {
    const rankDictionary = [ -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ]

    if (skullIndex < 0) {
        return rankDictionary[0]
    }
    if (skullIndex > rankDictionary.length) {
        return rankDictionary[rankDictionary.length - 1]
    }
    return rankDictionary[skullIndex]
}