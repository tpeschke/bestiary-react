import { Beast } from '../interfaces/beastInterfaces/beastInterfaces'
import { consoleLogErrorNoFile } from '../utilities/sendingFunctions'
import { getGMVersionOfBeastFromDB } from './gameMaster/gameMaster'

const consoleLogError = consoleLogErrorNoFile('monster cache')

interface MonsterId {
    beastid: number,
    count?: number
}

interface MonsterCache {
    [key: string]: Beast
}

let monsterCache: MonsterCache = {}

export function getMonsterFromCache(beastId: number): Beast | null {
    return monsterCache[beastId];
}

export async function collectMonsterCache(databaseConnection: any): Promise<void> {
    const freeIds: MonsterId[] = await databaseConnection.cache.monster.free().catch((error: Error) => consoleLogError('get free beasts ids', error))

    const numberOfFavoritesToGet = Math.max(50 - freeIds.length, 0)
    const monsterIds: MonsterId[] = [...freeIds, ...await databaseConnection.cache.monster.favorites(numberOfFavoritesToGet).catch((error: Error) => consoleLogError('get free beasts ids', error))]

    getMonsterFromId(databaseConnection, monsterIds, 0)
}

async function getMonsterFromId(databaseConnection: any, monsterIds: MonsterId[], index: number) {
    const beast: Beast | void = await getGMVersionOfBeastFromDB(databaseConnection, monsterIds[index].beastid, false).catch((error: Error) => consoleLogError('get main', error))

    if (beast) {
        monsterCache[monsterIds[index].beastid] = beast
    }

    if (index === monsterIds.length - 1) {
        console.log('monster cache collected')
    } else {
        console.log(`...Collecting Number ${index + 1} of ${monsterIds.length}`)
        getMonsterFromId(databaseConnection, monsterIds, ++index)
    }
}