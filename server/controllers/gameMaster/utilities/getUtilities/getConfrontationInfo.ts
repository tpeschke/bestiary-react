import { ConflictObject } from "../../../../interfaces/beastInterfaces/beastInterfaces"
import { MonsterArchetypeObject, NormalArchetypeObject, UnformatedConflict } from "../../../../interfaces/beastInterfaces/infoInterfaces/socialInfo"
import { sortByRank, sortOutAnyToTheBottom } from "../../../../utilities/sorts"
import { formatCharacteristics } from "../statCalculators/confrontationCalculator"

interface archetypeInfo {
    archetype: string
}

export interface GetArchetypesReturn {
    normalArchetypes: NormalArchetypeObject,
    monsterArchetypes: MonsterArchetypeObject
}

export async function getArchetypes(databaseConnection: any, isEditing: boolean): Promise<GetArchetypesReturn> {
    const normalArchetypeInfo: archetypeInfo[] = await databaseConnection.beast.archetype.get()

    const chance = Math.floor(Math.random() * 100)

    const monsterArchetypeInfo: archetypeInfo[] = await databaseConnection.beast.archetype.getMonster();

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

export async function getConflict(databaseConnection: any, beastId: number, isEditing: boolean,
    traitlimit: number, relationshiplimit: number, flawlimit: number, socialpoints: number): Promise<ConflictObject> {

    let conflict: ConflictObject = { descriptions: [], convictions: [], relationships: [], flaws: [], burdens: [] }

    if (isEditing) {
        const characteristics: UnformatedConflict[] = await databaseConnection.beast.conflict.getEdit(beastId)

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
        const characteristics: UnformatedConflict[] = await databaseConnection.beast.conflict.get(beastId)

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