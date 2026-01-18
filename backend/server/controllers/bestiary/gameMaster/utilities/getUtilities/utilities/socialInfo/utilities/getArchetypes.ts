import { NormalArchetypeObject, MonsterArchetypeObject } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { getRandomArchetype, getRandomMonsterArchetypes } from "../../../../../../../../db/beast/archetype"
import query from "../../../../../../../../db/database"

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