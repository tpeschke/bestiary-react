import { ArchetypeInfo } from "@bestiary/common/interfaces/encounterInterfaces"
import { getRandomArchetype, getRandomMonsterArchetypes } from "../../../../db/beast/archetype"
import query from "../../../../db/database"

const getWhetherBeastHasArchetypes = 'select hasArchetypes, hasMonsterArchetypes from bbIndividualBeast where id = $1'

export async function getArchetypes(beastId: number): Promise<ArchetypeInfo | undefined> {
    const [beastArchetypeInfo]: { hasarchetypes: boolean, hasmonsterarchetypes: boolean }[] = await query(getWhetherBeastHasArchetypes, beastId)

    if (beastArchetypeInfo) {
        const { hasarchetypes, hasmonsterarchetypes } = beastArchetypeInfo

        if (hasarchetypes) {
            const normalArchetypeInfo: { archetype: string }[] = await query(getRandomArchetype)
            const chance = Math.floor(Math.random() * 100)

            return {
                type: 'normal',
                archetype: normalArchetypeInfo[0].archetype,
                deviation: chance > 51 && chance < 75,
                reverse: chance >= 75
            }
        } else if (hasmonsterarchetypes) {
            const monsterArchetypeInfo: { archetype: string }[] = await query(getRandomMonsterArchetypes)

            return {
                type: 'monster',
                archetype: monsterArchetypeInfo.map(archetype => archetype.archetype)
            }
        }
    }

    return undefined
}