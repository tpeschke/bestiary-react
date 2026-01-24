export function getDifficultyBySkullValue(skullValue: number = 0) {
    const difficultyDictionary = [
        '0 - s1 (d0 / d4 / d20)',
        '3 - s1 (d2 / d6 / d12)',
        '6 - s1 (d4 / d8 / d10)',
        '9 - s1 (d6 / d10 / d8)',
        '12 - s1 (d8 / d12 / d6)',
        '15 - n (d10 / d20 / d4)',
        '18 - n (d12 / d20+d4 / d2)',
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