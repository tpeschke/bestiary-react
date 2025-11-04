import { Conflict } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces"
import { calculateRankForCharacteristic } from "@bestiary/common/utilities/scalingAndBonus/confrontation/confrontationCalculator"

export interface UnformatedConflict {
    id: number,
    beastid: number,
    trait: string,
    value: string,
    type: string,
    socialroleid: string,
    socialrole: string,
    socialpoints: number,
    allroles: boolean,
    severity: number,
    strength: Strength,
    adjustment: number,
    deleted?: boolean
}

export function formatCharacteristics(mainSocialPoints: number, characteristic: UnformatedConflict): Conflict {
    const { id, beastid, trait, socialroleid, socialpoints, allroles, type, strength, adjustment } = characteristic

    const typeDictionary: any = {
        'h': 'Descriptions',
        't': 'Convictions',
        'c': 'Convictions', 
        'd': 'Relationships'
    }

    let formatedCharacteristic = {
        id, beastid, trait, socialroleid, allroles, strength, adjustment
    }

    if (type === 'b' || type === 'f') {
        return formatedCharacteristic
    } else {
        const pointsToUse = socialpoints ? socialpoints : mainSocialPoints

        return {
            ...formatedCharacteristic,
            rank: calculateRankForCharacteristic(typeDictionary[type], pointsToUse, strength, adjustment)
        }
    }
}