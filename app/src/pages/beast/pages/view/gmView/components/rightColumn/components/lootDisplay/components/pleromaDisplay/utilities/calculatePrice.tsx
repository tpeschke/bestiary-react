export default function calculatePrice(harvestDifficulty: string | null, positionModifier: string, difficulty?: string): string {
    if (positionModifier?.toUpperCase() === 'N/A' && harvestDifficulty?.toUpperCase() === 'N/A') {
        return 'Priceless'
    }

    if (!harvestDifficulty && difficulty) {
        harvestDifficulty = difficulty
    } else if (!harvestDifficulty) {
        harvestDifficulty = '0 - s1 (d0 / d6 / d20)'
    }

    return (getObstacleSCValue(harvestDifficulty) + getPositionSCValue(positionModifier)) + ' sc'
}

function getObstacleSCValue(harvestDifficulty: string) {
    const difficultyDictionary: { [key: string]: number } = {
        '0 - s1 (d0 / d6 / d20)': 5,
        '6 - s1 (d4 / d8 / d12)': 10,
        '9 - s1 (d6 / d10 / d10)': 15,
        '12 - s1 (d8 / d12 / d8)': 20,
        '15 - n (d10 / d20 / d6)': 25,
        '18 - n (d12 / d20+d4 / d4)': 30,
        '30 - n (d20 / d20+d6 / d0)': 35
    }

    return difficultyDictionary[harvestDifficulty]
}

function getPositionSCValue(positionModifier: string) {
    const positionDictionary: { [key: string]: number } = {
        '': 0,
        '+1 Pos': 2,
        '+2 Pos': 5,
        '+3 Pos': 8,
        '+4 Pos': 10,
        '+5 Pos': 13,
        '+6 Pos': 15,
    }

    return positionDictionary[positionModifier]
}