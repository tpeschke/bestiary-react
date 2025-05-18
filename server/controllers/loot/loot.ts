// lootTables.itemCategories.forEach(category => {
//     this.itemCategories[category.id] = category.label
// })

import axios from 'axios'

import { Response, Request, Error } from "../../interfaces/apiInterfaces"
import { LootObject, ReturnedLoot } from "./interfaces/lootInterfaces";

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

    let totalCarriedLoot: ReturnedLoot[] = []
    if (carriedLoot) {
        totalCarriedLoot = [...getGenericLoot(timesToRoll, carriedLoot, maxPoints, 1)]

        const carriedLootRequestBody = getLootFromReliquary(timesToRoll, carriedLoot, maxPoints, 1, 1)
        const { data: treasureResponse } = await axios.post(treasureEndpoint, { requestArray: [carriedLootRequestBody] })

        if (treasureResponse[0].length > 0) {
            totalCarriedLoot = [...totalCarriedLoot, ...treasureResponse[0]]
        }
    }

    let totalLairLoot: ReturnedLoot[] = []
    if (lairLoot) {
        totalLairLoot = [...getGenericLoot(timesToRoll, lairLoot, maxPoints, 3)]

        const lairLootRequestBody = getLootFromReliquary(timesToRoll, lairLoot, maxPoints, 1.5, 2)
        const { data: treasureResponse } = await axios.post(treasureEndpoint, { requestArray: [lairLootRequestBody] })

        if (treasureResponse[0].length > 0) { 
            totalLairLoot = [...totalLairLoot, ...treasureResponse[0]]
        }
    }

    checkForContentTypeBeforeSending(response, {carriedLoot: totalCarriedLoot, lairLoot: totalLairLoot})
}