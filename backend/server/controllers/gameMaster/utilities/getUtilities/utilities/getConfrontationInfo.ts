import { NormalArchetypeObject, MonsterArchetypeObject, ConflictObject, Conflict } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces";
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";
import { calculateRankForCharacteristic } from "@bestiary/common/utilities/scalingAndBonus/confrontation/confrontationCalculator";
import { sortByRank, sortOutAnyToTheBottom } from "../../../../../utilities/sorts";
import query from "../../../../../db/database";
import { getCharacteristicsForEdit, getMonsterCharacteristics } from "../../../../../db/beast/conflict";
import { getRandomArchetype, getRandomMonsterArchetypes } from "../../../../../db/beast/archetype";

interface archetypeInfo {
    archetype: string
}

export interface GetArchetypesReturn {
    normalArchetypes: NormalArchetypeObject,
    monsterArchetypes: MonsterArchetypeObject
}

export async function getArchetypes(isEditing: boolean): Promise<GetArchetypesReturn> {
    isEditing
    const normalArchetypeInfo: archetypeInfo[] = await query(getRandomArchetype)

    const chance = Math.floor(Math.random() * 100)

    const monsterArchetypeInfo: archetypeInfo[] = await query(getRandomMonsterArchetypes)

    return {
        normalArchetypes: {
            type: 'normal',
            archetype: normalArchetypeInfo[0].archetype,
            deviation: chance > 51 && chance < 75,
            reverse: chance >= 75
        },
        monsterArchetypes: {
            type: 'monster',
            archetype: monsterArchetypeInfo.map(archetype => archetype.archetype)
        }
    }
}

export async function getConflict(beastId: number, isEditing: boolean,
    traitlimit: number, relationshiplimit: number, flawlimit: number, socialpoints: number): Promise<ConflictObject> {

    let conflict: ConflictObject = { descriptions: [], convictions: [], relationships: [], flaws: [], burdens: [] }

    if (isEditing) {
        const characteristics: UnformatedConflict[] = await query(getCharacteristicsForEdit, beastId)

        characteristics.forEach((characteristic: UnformatedConflict) => {
            if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
                conflict.convictions.push(characteristic)
            } else if (characteristic.type === 'd') {
                conflict.relationships.push(characteristic)
            } else if (characteristic.type === 'f') {
                conflict.flaws.push(characteristic)
            } else if (characteristic.type === 'b') {
                conflict.burdens.push(characteristic)
            } else if (characteristic.type === 'h') {
                conflict.descriptions.push(characteristic)
            }
        })
        return conflict
    } else {
        const characteristics: UnformatedConflict[] = await query(getMonsterCharacteristics, beastId)

        characteristics.forEach((characteristic: UnformatedConflict) => {
            if (characteristic.type === 't' || characteristic.type === 'c' || !characteristic.type) {
                if (traitlimit && conflict.convictions.length < traitlimit) {
                    conflict.convictions.push(formatCharacteristics(socialpoints, characteristic))
                } else if (!traitlimit) {
                    conflict.convictions.push(formatCharacteristics(socialpoints, characteristic))
                }
            } else if (characteristic.type === 'd') {
                if (relationshiplimit && conflict.relationships.length < relationshiplimit) {
                    conflict.relationships.push(formatCharacteristics(socialpoints, characteristic))
                } else if (!relationshiplimit) {
                    conflict.relationships.push(formatCharacteristics(socialpoints, characteristic))
                }
            } else if (characteristic.type === 'f') {
                if (flawlimit && conflict.flaws.length < flawlimit) {
                    conflict.flaws.push(formatCharacteristics(socialpoints, characteristic))
                } else if (!flawlimit) {
                    conflict.flaws.push(formatCharacteristics(socialpoints, characteristic))
                }
            } else if (characteristic.type === 'b') {
                conflict.burdens.push(formatCharacteristics(socialpoints, characteristic))
            } else if (characteristic.type === 'h') {
                conflict.descriptions.push(formatCharacteristics(socialpoints, characteristic))
            }
        })

        conflict.descriptions = conflict.descriptions.sort(sortByRank)
        conflict.convictions = conflict.convictions.sort(sortByRank)
        conflict.flaws = conflict.flaws.sort(sortOutAnyToTheBottom)
        conflict.burdens = conflict.burdens.sort(sortOutAnyToTheBottom)

        return conflict
    }
}

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