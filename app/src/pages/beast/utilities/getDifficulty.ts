export function getDifficultyBySkullValue(skullValue: number) {
    const difficultyDictionary = [
        null,
        '0 - s1 (d0 / d6 / d20)',
        '6 - s1 (d4 / d8 / d12)',
        '9 - s1 (d6 / d10 / d10)',
        '12 - s1 (d8 / d12 / d8)',
        '15 - n (d10 / d20 / d6)',
        '18 - n (d12 / d20+d4 / d4)',
        '30 - n (d20 / d20+d6 / d0)'
    ]

    if (!skullValue || skullValue < 1) {
        return difficultyDictionary[1]
    }
    if (skullValue > difficultyDictionary.length) {
        return difficultyDictionary[difficultyDictionary.length - 1]
    }

    return difficultyDictionary[skullValue]
}