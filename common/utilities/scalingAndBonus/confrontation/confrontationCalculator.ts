import { Strength } from "../../../interfaces/calculationInterfaces"

// TODO this can be much less generic
interface TypeBaseObject {
    [key: string]: {
        [key: string]: number
    }
}

interface TypeScalingObject {
    [key: string]: number
}

export function calculateRankForCharacteristic(type: string = 'Convictions', points: number, strength: Strength, adjustment: number = 0): number {
    const typeBase: TypeBaseObject = {
        Descriptions: {
            majSt: 5,
            minSt: 3,
            minWk: 1,
            majWk: 0
        },
        Convictions: {
            majSt: 4,
            minSt: 3,
            minWk: 2,
            majWk: 1
        },
        Relationships: {
            majSt: 8,
            minSt: 6,
            minWk: 4,
            majWk: 2
        }
    }
    
    const typeScalingBonus: TypeScalingObject = {
        Descriptions: 1,
        Convictions: .1,
        Relationships: 1
    }

    const scaling: TypeScalingObject = {
        majSt: 1,
        minSt: .75,
        minWk: .5,
        majWk: .25
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

//TODO This should be an if-else statement to catch in between values
export function getDifficultyDie(points: number) {
    switch (points) {
        case 0:
            return '+0'
        case 3:
            return '+0, roll twice; take highest'
        case 5:
            return '+d10!'
        case 8:
            return '+d10!, roll twice; take highest'
        case 10:
            return '+d20!'
        case 13:
            return '+d20!, roll twice; take highest'
        case 15:
            return '+d20!+d10!'
        case 18:
            return '+d20!+d10!, roll twice; take highest'
        case 20:
            return '+2d20!'
        case 23:
            return '+2d20!, roll twice; take highest'
        case 25:
            return '+2d20!+d10!'
        case 28:
            return '+2d20!+d10!, roll twice; take highest'
        case 30:
            return '+3d20!'
        case 33:
            return '+3d20!, roll twice; take highest'
        case 35:
            return '+4d20!+d10!'
        case 38:
            return '+4d20!+d10!, roll twice; take highest'
        case 40:
            return '+3d20!'
        default:
            return 'Something Went Wrong'
    }
}