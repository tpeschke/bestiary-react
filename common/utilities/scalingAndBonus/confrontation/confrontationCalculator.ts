import { Strength } from "../../../interfaces/calculationInterfaces"

export type CharacteristicWithRanks = 'Convictions' | 'Descriptions' | 'Relationships'

// BRODY 
// type TypeBaseObject {
//     [key: CharacteristicWithRanks]: {
//         [key: Strength]: number
//     }
// }
interface SelectedStrengthObject {
    majSt: number,
    minSt: number,
    minWk: number,
    majWk: number,
    x: number
}

interface TypeBaseObject {
    Convictions: SelectedStrengthObject,
    Descriptions: SelectedStrengthObject,
    Relationships: SelectedStrengthObject
}

interface TypeScalingObject {
    Convictions: number,
    Descriptions: number,
    Relationships: number
}


export function calculateRankForCharacteristic(type: CharacteristicWithRanks = 'Convictions', points: number, strength: Strength = 'majWk', adjustment: number = 0): number {
    const typeBase: TypeBaseObject = {
        Descriptions: {
            majSt: 5,
            minSt: 3,
            minWk: 1,
            majWk: 0,
            x: 0
        },
        Convictions: {
            majSt: 4,
            minSt: 3,
            minWk: 2,
            majWk: 1,
            x: 0
        },
        Relationships: {
            majSt: 8,
            minSt: 6,
            minWk: 4,
            majWk: 2,
            x: 0
        }
    }
    
    const typeScalingBonus: TypeScalingObject = {
        Descriptions: 1,
        Convictions: .1,
        Relationships: 1
    }

    const scaling: SelectedStrengthObject = {
        majSt: 1,
        minSt: .75,
        minWk: .5,
        majWk: .25,
        x: 0
    }

    if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        return 5
    } else if (strength === 'noneWk') {
        return 0
    } else if (strength === 'none' || !strength) {
        return 3
    } else {
        return Math.ceil(typeBase[type][strength] + ((scaling[strength] * typeScalingBonus[type]) * (points + adjustment)))
    }
}

export function getDifficultyDie(points: number) {
    if (points <= 0) {
        return '+0'
    } else if (points <= 3) {
        return '+0, roll twice; take highest'
    } else if (points <= 5) {
        return '+d10!'
    } else if (points <= 8) {
        return '+d10!, roll twice; take highest'
    } else if (points <= 10) {
        return '+d20!'
    } else if (points <= 13) {
        return '+d20!, roll twice; take highest'
    } else if (points <= 15) {
        return '+d20!+d10!'
    } else if (points <= 18) {
        return '+d20!+d10!, roll twice; take highest'
    } else if (points <= 20) {
        return '+2d20!'
    } else if (points <= 23) {
        return '+2d20!, roll twice; take highest'
    } else if (points <= 25) {
        return '+2d20!+d10!'
    } else if (points <= 28) {
        return '+2d20!+d10!, roll twice; take highest'
    } else if (points <= 30) {
        return '+3d20!'
    } else if (points <= 33) {
        return '+3d20!, roll twice; take highest'
    } else if (points <= 35) {
        return '+4d20!+d10!'
    } else if (points <= 38) {
        return '+4d20!+d10!, roll twice; take highest'
    } else {
        return '+3d20!'
    }
}