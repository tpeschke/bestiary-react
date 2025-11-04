import { Conflict } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces"
import { calculateRankForCharacteristic } from "@bestiary/common/utilities/scalingAndBonus/confrontation/calculateRankForCharacteristic"

export interface UnformatedConflict {
    id: number,
    beastid: number,
    trait: string,
    value: string,
    type: string,
    socialroleid: string,
    socialrole: string,
    allroles: boolean,
    severity: number,
    strength: Strength,
    adjustment: number,
    deleted?: boolean
}

export function formatCharacteristics(skullIndex: number, characteristic: UnformatedConflict, role: string): Conflict {
    const { id, beastid, trait, socialroleid: socialRoleID, allroles: allRoles, type, strength, adjustment } = characteristic

    const typeDictionary: any = {
        'h': 'Descriptions',
        't': 'Convictions',
        'c': 'Convictions', 
        'd': 'Relationships'
    }

    let formatedCharacteristic = {
        id, beastid, trait, socialRoleID, allRoles, strength, adjustment
    }

    if (type === 'b' || type === 'f') {
        return formatedCharacteristic
    } else {
        return {
            ...formatedCharacteristic,
            rank: calculateRankForCharacteristic(typeDictionary[type], skullIndex, role)
        }
    }
}