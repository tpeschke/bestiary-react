// lootTables.itemCategories.forEach(category => {
//     this.itemCategories[category.id] = category.label
// })

import axios from 'axios'

import { Response, Request, Error } from "../../interfaces/apiInterfaces"
import { LootObject } from "./interfaces/lootInterfaces";

import { getGenericLoot, getLootFromReliquary } from "./utilities/formatLoot";
import { treasureEndpoint } from '../../server-config';

import { sendErrorForwardNoFile, checkForContentTypeBeforeSending } from '../../utilities/sendingFunctions';
const sendErrorForward = sendErrorForwardNoFile('main loot controller')

interface LootRequest extends Request {
    body: Body
}

interface Body {
    timesToRoll: number,
    loot: LootBody,
    maxPoints: number
}

interface LootBody {
    carriedLoot?: LootObject
    lairLoot?: LootObject
}

export default async function getLoot(request: LootRequest, response: Response) {
    const { timesToRoll, loot, maxPoints } = request.body
    const { carriedLoot, lairLoot } = loot

    // TODO: create interfaces for the Reliquaries' Responses so I have a better idea of what I'm getting
    let totalCarriedLoot: any[] = []
    if (carriedLoot) {
        const genericCarriedLoot = getGenericLoot(timesToRoll, carriedLoot, maxPoints, 1)

        const carriedLootRequestBody = getLootFromReliquary(timesToRoll, carriedLoot, maxPoints, 1, 1)
        const { data: treasureResponse } = await axios.post(treasureEndpoint, { requestArray: [carriedLootRequestBody] })

        totalCarriedLoot = [...genericCarriedLoot, ...treasureResponse]
    }

    let totalLairLoot: any[] = []
    if (lairLoot) {
        const genericLairLoot = getGenericLoot(timesToRoll, lairLoot, maxPoints, 3)

        const lairLootRequestBody = getLootFromReliquary(timesToRoll, lairLoot, maxPoints, 1.5, 2)
        const { data: treasureResponse } = await axios.post(treasureEndpoint, { requestArray: [lairLootRequestBody] })

        totalLairLoot = [...genericLairLoot, ...treasureResponse]
    }

    checkForContentTypeBeforeSending(response, [totalCarriedLoot, totalLairLoot])
}