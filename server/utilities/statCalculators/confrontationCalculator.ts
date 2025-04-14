import { Conflict, UnformatedConflict, Strength } from "../../interfaces/beastInterfaces/infoInterfaces/socialInfo"

export function formatCharacteristics(socialpoints: number, characteristic: UnformatedConflict): Conflict {
    const { id, beastid, trait, socialroleid, allroles, type, strength, adjustment } = characteristic

    const typeDictionary = {
        h: 'Descriptions',
        t: 'Convictions',
        c: 'Convictions',
        d: 'Devotions'
    }

    let formatedCharacteristic = {
        id, beastid, trait, socialroleid, allroles
    }

    if (type === 'b' || type === 'f') {
        return formatedCharacteristic
    } else {
        return {
            ...formatedCharacteristic,
            rank: calculateRankForCharacteristic(typeDictionary[type], socialpoints, strength, adjustment)
        }
    }
}

function calculateRankForCharacteristic(type: string = 'Convictions', points: number, strength: Strength, adjustment: number = 0): number {
    const typeBase = {
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
        Devotions: {
            majSt: 8,
            minSt: 6,
            minWk: 4,
            majWk: 2
        }
    }
    
    const typeScalingBonus = {
        Descriptions: 1,
        Convictions: .1,
        Devotions: 1
    }

    const scaling = {
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