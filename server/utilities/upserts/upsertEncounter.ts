import { Response, Error } from '../../interfaces/apiInterfaces'
import { Encounter, TemperamentObject, Temperament, Group, GroupWeight, SignObject, Sign, VerbObject, Verb, NounObject, Noun, Number } from '../../interfaces/encounterInterfaces';

import { sendErrorForwardNoFile } from "../sendingFunctions"

const sendErrorForward = sendErrorForwardNoFile('upsert encounter')

export default async function upsertEncounters(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, encounters: Encounter) {
    const { temperaments, signs, nouns, verbs, groups, numbers } = encounters;
    upsertTemperaments(promiseArray, databaseConnection, beastId, response, temperaments)
    upsertGroups(promiseArray, databaseConnection, beastId, response, groups)
    upsertNumbers(promiseArray, databaseConnection, beastId, response, numbers)
    upsertSigns(promiseArray, databaseConnection, beastId, response, signs)
    upsertVerbs(promiseArray, databaseConnection, beastId, response, verbs)
    upsertNouns(promiseArray, databaseConnection, beastId, response, nouns)
}

async function upsertTemperaments(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, temperaments: TemperamentObject) {
    temperaments.beastTemperaments.forEach(async (temperament: Temperament) => {
        const { temperament: label, weight, id, beastid: owningBeastId, tooltip, deleted } = temperament

        const itIsInDatabaseButNotConnectedToAnyBeast = id && !beastId
        const itIsInDatabaseButNotConnectedToThisBeast = id && beastId !== owningBeastId
        const itIsInDatabaseAndBelongsToBeast = id && beastId
        const itIsntInDatabase = !id

        if (deleted) {
            promiseArray.push(databaseConnection.encounter.temperament.delete(beastId, id).catch((error: Error) => sendErrorForward('delete temp', error, response)))
        } else if (itIsInDatabaseButNotConnectedToAnyBeast || itIsInDatabaseButNotConnectedToThisBeast) {
            promiseArray.push(databaseConnection.encounter.temperament.add(owningBeastId, id, weight).catch((error: Error) => sendErrorForward('add temp', error, response)))
        } else if (itIsInDatabaseAndBelongsToBeast) {
            promiseArray.push(databaseConnection.encounter.temperament.update(weight, beastId, id).catch((error: Error) => sendErrorForward('update temp', error, response)))
        } else if (itIsntInDatabase) {
            const newTempId = await databaseConnection.encounter.temperament.addAll(label, tooltip).catch((error: Error) => sendErrorForward('add all temp', error, response))[0].id
            promiseArray.push(databaseConnection.encounter.temperament.add(owningBeastId, newTempId, weight).catch((error: Error) => sendErrorForward('add temp 2', error, response)))
        }
    })
}

async function upsertGroups(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, groups: Group[]) {
    groups.forEach(async (group: Group) => {
        const { id: groupid, deleted, label, weights, weight } = group
        if (deleted) {
            await promiseArray.push(databaseConnection.encounter.group.delete(beastId, groupid).catch((error: Error) => sendErrorForward('delete groups', error, response)))
            databaseConnection.encounter.group.deleteRole(beastId, groupid).catch((error: Error) => sendErrorForward('delete group roles', error, response))
        } else {
            let groupIdToUpdate = groupid ? groupid : null
            if (groupIdToUpdate) {
                await databaseConnection.encounter.groups.update(beastId, groupid, label, weight).catch((error: Error) => sendErrorForward('update groups', error, response))
            } else {
                groupIdToUpdate = await databaseConnection.encounter.group.add(beastId, label, weight).catch((error: Error) => sendErrorForward('add groups', error, response))
            }

            weights.forEach((weight: GroupWeight) => {
                const { id: roleid, weight: roleweight, role, deleted } = weight
                if (deleted && roleid) {
                    promiseArray.push(databaseConnection.encounter.group.deleteRole(beastId, roleid).catch((error: Error) => sendErrorForward('delete groups role', error, response)))
                } else if (roleid) {
                    promiseArray.push(databaseConnection.encounter.group.updateRole(beastId, roleid, groupIdToUpdate, roleweight, role).catch((error: Error) => sendErrorForward('update groups role', error, response)))
                } else {
                    promiseArray.push(databaseConnection.encounter.group.addRole(beastId, groupIdToUpdate, roleweight, role).catch((error: Error) => sendErrorForward('add groups role', error, response)))
                }
            })
        }
    })
}

async function upsertNumbers(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, numbers: Number[]) {
    numbers.forEach((number: Number) => {
        const { id, deleted, numbers, miles, weight } = number
        if (deleted) {
            promiseArray.push(databaseConnection.encounter.number.delete(beastId, id).catch((error: Error) => sendErrorForward('delete numbers', error, response)))
        } else if (id) {
            promiseArray.push(databaseConnection.encounter.number.update(beastId, id, numbers, miles, weight).catch((error: Error) => sendErrorForward('update numbers', error, response)))
        } else if (!id) {
            promiseArray.push(databaseConnection.encounter.number.add(beastId, numbers, miles, weight).catch((error: Error) => sendErrorForward('add numbers', error, response)))
        }
    })
}

async function upsertSigns(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, signs: SignObject) {
    signs.beastSigns.forEach(async (sign: Sign) => {
        const { sign: label, weight, id: signid, beastid: owningBeastId, deleted } = sign

        const itIsInDatabaseButNotConnectedToAnyBeast = signid && !beastId
        const itIsInDatabaseButNotConnectedToThisBeast = signid && beastId !== owningBeastId
        const itIsInDatabaseAndBelongsToBeast = signid && beastId
        const itIsntInDatabase = !signid

        if (deleted) {
            promiseArray.push(databaseConnection.encounter.sign.delete(beastId, signid).catch((error: Error) => sendErrorForward('delete sign', error, response)))
        } else if (itIsInDatabaseButNotConnectedToAnyBeast || itIsInDatabaseButNotConnectedToThisBeast) {
            promiseArray.push(databaseConnection.encounter.sign.add(beastId, signid, weight).catch((error: Error) => sendErrorForward('add sign', error, response)))
        } else if (itIsInDatabaseAndBelongsToBeast) {
            promiseArray.push(databaseConnection.encounter.sign.update(weight, beastId, signid).catch((error: Error) => sendErrorForward('update sign', error, response)))
        } else if (itIsntInDatabase) {
            const newSignId = await databaseConnection.encounter.signs.addAll(label).catch((error: Error) => sendErrorForward('all signs', error, response))[0].id
            promiseArray.push(databaseConnection.encounter.sign.add(beastId, newSignId, weight).catch((error: Error) => sendErrorForward('add sign w/ weight', error, response)))
        }
    })
}

async function upsertVerbs(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, verbs: VerbObject) {
    verbs.beastVerbs.forEach(async (verb: Verb) => {
        const { verb: label, id, beastid: owningBeastId, deleted } = verb

        const itIsInDatabaseButNotConnectedToAnyBeast = id && !beastId
        const itIsInDatabaseButNotConnectedToThisBeast = id && beastId !== owningBeastId
        const itIsntInDatabase = !id

        if (deleted) {
            promiseArray.push(databaseConnection.encounter.verb.delete(beastId, id).catch((error: Error) => sendErrorForward('delete verb', error, response)))
        } else if (itIsInDatabaseButNotConnectedToAnyBeast || itIsInDatabaseButNotConnectedToThisBeast) {
            promiseArray.push(databaseConnection.encounter.verb.add(id, beastId).catch((error: Error) => sendErrorForward('add add', error, response)))
        } else if (itIsntInDatabase) {
            const newVerbId = await databaseConnection.encounter.verb.addAll(label).catch((error: Error) => sendErrorForward('add all verbs', error, response))[0].id
            promiseArray.push(databaseConnection.encounter.verb.add(newVerbId, beastId).catch((error: Error) => sendErrorForward('add verb 2', error, response)))
        }
    })
}

async function upsertNouns(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, nouns: NounObject) {
    nouns.beastNouns.forEach(async (noun: Noun) => {
        const { noun: label, id, beastid: owningBeastId, deleted } = noun

        const itIsInDatabaseButNotConnectedToAnyBeast = id && !beastId
        const itIsInDatabaseButNotConnectedToThisBeast = id && beastId !== owningBeastId
        const itIsntInDatabase = !id

        if (deleted) {
            promiseArray.push(databaseConnection.encounter.noun.delete(beastId, id).catch((error: Error) => sendErrorForward('delete noun', error, response)))
        } else if (itIsInDatabaseButNotConnectedToAnyBeast || itIsInDatabaseButNotConnectedToThisBeast) {
            promiseArray.push(databaseConnection.encounter.noun.add(id, beastId).catch((error: Error) => sendErrorForward('add noun', error, response)))
        } else if (itIsntInDatabase) {
            const newNounId = await databaseConnection.encounter.addAll(label).catch((error: Error) => sendErrorForward('all nouns', error, response))[0].id
            promiseArray.push(databaseConnection.add.encounter.noun(newNounId, beastId).catch((error: Error) => sendErrorForward('add noun 2', error, response)))
        }
    })
}
