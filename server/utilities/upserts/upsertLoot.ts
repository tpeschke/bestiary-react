import { Response, Error } from '../../interfaces/apiInterfaces'
import { Loot, Scroll, Alm, Item, SpecificLoot } from "../../interfaces/lootInterfaces"

import { sendErrorForwardNoFile } from "../sendingFunctions"

const sendErrorForward = sendErrorForwardNoFile('upsert loot')

export default async function upsertAllLoot(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, specificLoots: SpecificLoot[], carriedLoot: Loot, lairLoot: Loot) {
    upsertSpecificLoot(promiseArray, databaseConnection, beastId, response, specificLoots)

    upsertLairLoot(promiseArray, databaseConnection, beastId, response, lairLoot)
    upsertCarriedLoot(promiseArray, databaseConnection, beastId, response, carriedLoot)
}

async function upsertLairLoot(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, loots: Loot) {
    let { copper, silver, gold, potion, relic, enchanted, scrolls, alms, talisman, items } = loots
    upsertLairBasic(promiseArray, databaseConnection, beastId, response, copper, silver, gold, potion, relic, enchanted, talisman)
    upsertScrollsLair(promiseArray, databaseConnection, beastId, response, scrolls)
    upsertAlmsLair(promiseArray, databaseConnection, beastId, response, alms)
    await upsertItemsLair(databaseConnection, beastId, response, items)
}

async function upsertSpecificLoot(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, loot: SpecificLoot[]) {
    loot.forEach((singleLoot: SpecificLoot) => {
        const { loot, price, id, deleted } = singleLoot
        if (deleted) {
            promiseArray.push(databaseConnection.loot.specific.delete(id).catch((error: Error) => sendErrorForward('delete specific loot', error, response)))
        } else if (!id) {
            promiseArray.push(databaseConnection.loot.specific.add(beastId, loot, price).catch((error: Error) => sendErrorForward('add specific loot', error, response)))
        } else {
            promiseArray.push(databaseConnection.loot.specific.update(beastId, loot, price, id).catch((error: Error) => sendErrorForward('update specific loot', error, response)))
        }
    })
}

async function upsertLairBasic(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, copper: string, silver: string, gold: string, potion: string, relic: string, enchanted: string, talisman: string) {
    if (!beastId) {
        promiseArray.push(databaseConnection.loot.lair.addBasic(beastId, copper, silver, gold, potion, relic, enchanted, talisman).catch((error: Error) => sendErrorForward('add basic lair', error, response)))
    } else {
        promiseArray.push(databaseConnection.loot.lair.updateBasic(beastId, copper, silver, gold, potion, relic, enchanted, talisman).catch((error: Error) => sendErrorForward('update basic lair', error, response)))
    }
}

async function upsertScrollsLair(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, scrolls: Scroll[]) {
    scrolls.forEach((scroll: Scroll) => {
        const { id, number, power, deleted } = scroll
        if (deleted) {
            promiseArray.push(databaseConnection.loot.lair.deleteScroll(beastId, id).catch((error: Error) => sendErrorForward('delete lair scrolls', error, response)))
        } else if (id) {
            promiseArray.push(databaseConnection.loot.lair.updateScroll(id, number, power).catch((error: Error) => sendErrorForward('update lair scrolls', error, response)))
        } else {
            promiseArray.push(databaseConnection.loot.lair.addScroll(beastId, number, power).catch((error: Error) => sendErrorForward('add lair scrolls', error, response)))
        }
    })
}

async function upsertAlmsLair(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, alms: Alm[]) {
    alms.forEach((alm: Alm) => {
        const { id, number, favor, deleted } = alm
        if (deleted) {
            promiseArray.push(databaseConnection.loot.lair.deleteAlm(beastId, id).catch((error: Error) => sendErrorForward('delete lair alms', error, response)))
        } else if (id) {
            promiseArray.push(databaseConnection.loot.lair.updateAlm(id, number, favor).catch((error: Error) => sendErrorForward('update lair alms', error, response)))
        } else {
            promiseArray.push(databaseConnection.loot.lair.addAlm(beastId, number, favor).catch((error: Error) => sendErrorForward('add lair alms', error, response)))
        }
    })
}

async function upsertItemsLair(databaseConnection: any, beastId: number, response: Response, items: any) {
    let idArray: number[] = []
    for (let key in items) {
        const { id, itemcategory, materialrarity, detailing, wear, chance, number }: Item = items[key]

        let idToPush: number = id ? id : 0
        if (idToPush) {
            await databaseConnection.loot.lair.updateItem(id, itemcategory, materialrarity, detailing, wear, chance, number).catch((error: Error) => sendErrorForward('update lair items', error, response))
        } else {
            idToPush = await databaseConnection.loot.lair.addItem(beastId, itemcategory, materialrarity, detailing, wear, chance, number).catch((error: Error) => sendErrorForward('add lair items', error, response))[0].id
        }

        idArray.push(idToPush)
    }
    databaseConnection.delete.loot.lairitems([beastId, [0, ...idArray]]).catch((error: Error) => sendErrorForward('delete lair items', error, response))
}

async function upsertCarriedLoot(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, loots: Loot) {
    let { copper, silver, gold, potion, relic, enchanted, scrolls, alms, items, talisman } = loots
    upsertBasicCarried(promiseArray, databaseConnection, beastId, response, copper, silver, gold, potion, relic, enchanted, talisman)
    upsertScrollsCarried(promiseArray, databaseConnection, beastId, response, scrolls)
    upsertAlmsCarried(promiseArray, databaseConnection, beastId, response, alms)
    await upsertItemsCarried(databaseConnection, beastId, response, items)
}

async function upsertBasicCarried(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, copper: string, silver: string, gold: string, potion: string, relic: string, enchanted: string, talisman: string) {
    if (!beastId) {
        promiseArray.push(databaseConnection.loot.carried.addBasic(beastId, copper, silver, gold, potion, relic, enchanted, talisman).catch((error: Error) => sendErrorForward('add basic carried', error, response)))
    } else {
        promiseArray.push(databaseConnection.loot.carried.updateBasic(beastId, copper, silver, gold, potion, relic, enchanted, talisman).catch((error: Error) => sendErrorForward('update basic carried', error, response)))
    }
}

async function upsertScrollsCarried(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, scrolls: Scroll[]) {
    scrolls.forEach((scroll: Scroll) => {
        const { id, number, power, deleted } = scroll
        if (deleted) {
            promiseArray.push(databaseConnection.loot.carried.deleteScroll(beastId, id).catch((error: Error) => sendErrorForward('delete carried scrolls', error, response)))
        } else if (id) {
            promiseArray.push(databaseConnection.loot.carried.updateScroll(id, number, power).catch((error: Error) => sendErrorForward('update carried scrolls', error, response)))
        } else {
            promiseArray.push(databaseConnection.loot.carried.addScroll(beastId, number, power).catch((error: Error) => sendErrorForward('add carried scrolls', error, response)))
        }
    })
}

async function upsertAlmsCarried(promiseArray: any[], databaseConnection: any, beastId: number, response: Response, alms: Alm[]) {
    alms.forEach((alm: Alm) => {
        const { id, number, favor, deleted } = alm
        if (deleted) {
            promiseArray.push(databaseConnection.loot.carried.deleteAlm(beastId, id).catch((error: Error) => sendErrorForward('delete carried alms', error, response)))
        } else if (id) {
            promiseArray.push(databaseConnection.loot.carried.updateAlm(id, number, favor).catch((error: Error) => sendErrorForward('update carried alms', error, response)))
        } else {
            promiseArray.push(databaseConnection.loot.carried.addAlm(beastId, number, favor).catch((error: Error) => sendErrorForward('add carried alms', error, response)))
        }
    })
}

async function upsertItemsCarried(databaseConnection: any, beastId: number, response: Response, items: any) {
    let idArray: number[] = []
    for (let key in items) {
        const { id, itemcategory, materialrarity, detailing, wear, chance, number }: Item = items[key]

        let idToPush: number = id ? id : 0
        if (idToPush) {
            await databaseConnection.loot.carried.updateItem(id, itemcategory, materialrarity, detailing, wear, chance, number).catch((error: Error) => sendErrorForward('update carried items', error, response))
        } else {
            idToPush = await databaseConnection.loot.carried.addItem(beastId, itemcategory, materialrarity, detailing, wear, chance, number).catch((error: Error) => sendErrorForward('add carried items', error, response))[0].id
        }

        idArray.push(idToPush)
    }
    databaseConnection.delete.loot.carrieditems([beastId, [0, ...idArray]]).catch((error: Error) => sendErrorForward('delete carried items', error, response))
}