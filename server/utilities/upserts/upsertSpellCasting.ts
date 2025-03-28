import { Response, Error } from '../../interfaces/apiInterfaces'
import { Casting, Spell } from '../../interfaces/beastInterfaces'

import { sendErrorForwardNoFile } from "../sendingFunctions"

const sendErrorForward = sendErrorForwardNoFile('upsert spell casting')

export default async function upsertSpellCasting(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, casting: Casting, deletedSpellList: number[], spells: Spell[]) {
    upsertCasting(promiseArray, databaseConnection, beastId, response, casting)
    deleteFromSpellList(promiseArray, databaseConnection, beastId, response, deletedSpellList)
    upsertSpells(promiseArray, databaseConnection, beastId, response, spells)
}

async function upsertCasting(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, casting: Casting) {
    if (casting.beastid) {
        const { augur, wild, vancian, spellnumberdie, manifesting, commanding, bloodpact, defaulttype } = casting
        promiseArray.push(databaseConnection.beast.casting.update(augur, wild, vancian, spellnumberdie, manifesting, commanding, bloodpact, defaulttype, beastId).catch((error: Error) => sendErrorForward('update casting', error, response)))
    } else {
        promiseArray.push(databaseConnection.beast.casting.update(null, null, null, 'd4', null, null, null, null, beastId).catch((error: Error) => sendErrorForward('update casting 2', error, response)))
    }
}

async function deleteFromSpellList(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, deletedSpellList: number[]) {
    deletedSpellList.forEach((spellId: number) => {
        promiseArray.push(databaseConnection.beast.spell.delete(spellId, beastId).catch((error: Error) => sendErrorForward('delete spell', error, response)))
    })
}

async function upsertSpells(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, spells: Spell[]) {
    spells.forEach((spell: Spell) => {
        const { id, name, origin, shape, range, interval, effect, allroles, roleid, resist } = spell
        if (id) {
            promiseArray.push(databaseConnection.beast.spell.update(id, name, origin, shape, range, interval, effect, beastId, allroles, roleid, resist).catch((error: Error) => sendErrorForward('update spell', error, response)))
        } else {
            promiseArray.push(databaseConnection.beast.spell.add(id, name, origin, shape, range, interval, effect, beastId, allroles, roleid, resist).catch((error: Error) => sendErrorForward('add spell', error, response)))
        }
    })
}