import { Beast } from '@bestiary/common/interfaces/beast/beast'
import { consoleLogErrorNoFile } from '../utilities/sendingFunctions'
import { getGMVersionOfBeastFromDB } from './gameMaster/utilities/getUtilities/getBeast'
import { getFavoriteMonsters, getFreeAndUpdating } from '../db/cache/monster'
import query from '../db/database'

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

export async function reCacheMonsterIfItExists(beastID: number) {
    if (monsterCache[beastID]) {
        const beast: Beast | void = await getGMVersionOfBeastFromDB(beastID, {isEditing: false}).catch((error: Error) => consoleLogError('get main', error))
        if (beast) {
            monsterCache[beastID] = beast
            console.log('RE-CACHE COMPLETE')
        }
    }

    return true
}

export async function collectMonsterCache(gearCache: any): Promise<void> {
    const freeIds: MonsterId[] = await query(getFreeAndUpdating)

    const numberOfFavoritesToGet = Math.max(100 - freeIds.length, 0)
    const monsterIds: MonsterId[] = [...freeIds, ...await query(getFavoriteMonsters, numberOfFavoritesToGet)]

    getMonsterFromId(monsterIds, 0, gearCache)
}

async function getMonsterFromId(monsterIds: MonsterId[], index: number, gearCache: any) {
    const beast: Beast | void = await getGMVersionOfBeastFromDB(monsterIds[index].beastid, {isEditing: false, gearCache}).catch((error: Error) => consoleLogError('get main', error))

    if (beast) {
        monsterCache[monsterIds[index].beastid] = beast
    }

    if (index === monsterIds.length - 1) {
        console.log('------------------------- ')
        console.log('---- Cache Collected ---- ')
        console.log('------------------------- ')
    } else {
        console.log(`...Collecting Number ${index + 1} of ${monsterIds.length}`)
        getMonsterFromId(monsterIds, ++index, gearCache)
    }
}