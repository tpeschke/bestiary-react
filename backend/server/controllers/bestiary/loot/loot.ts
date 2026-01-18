import axios from 'axios'

import { Response, Request, Error } from "../../../interfaces/apiInterfaces"
import { LootObject, ReturnedLoot } from "./interfaces/lootInterfaces";

import { getGenericLoot, getLootFromReliquary } from "./utilities/formatLoot";
import { treasureEndpoint } from '../../../server-config';

import { sendErrorForwardNoFile, checkForContentTypeBeforeSending } from '../../../utilities/sendingFunctions';
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
        const queryReturn: any | null = await axios.post(treasureEndpoint, { requestArray: [carriedLootRequestBody] }).catch((error: Error) => sendErrorForward('carried loot', error, response))

        if (queryReturn && queryReturn.data && queryReturn.data[0]) {
            const { data } = queryReturn
            if (data && data[0].length > 0) {
                totalCarriedLoot = [...totalCarriedLoot, ...data[0]]
            }
        }
    }

    let totalLairLoot: ReturnedLoot[] = []
    if (lairLoot) {
        totalLairLoot = [...getGenericLoot(timesToRoll, lairLoot, maxPoints, 3)]

        const lairLootRequestBody = getLootFromReliquary(timesToRoll, lairLoot, maxPoints, 1.5, 2)
        const queryReturn: any | null = await axios.post(treasureEndpoint, { requestArray: [lairLootRequestBody] }).catch((error: Error) => sendErrorForward('lair loot', error, response))

        if (queryReturn && queryReturn.data && queryReturn.data[0]) {
            const { data } = queryReturn
            if (data && data[0].length > 0) {
                totalLairLoot = [...totalLairLoot, ...data[0]]
            }
        }
    }

    checkForContentTypeBeforeSending(response, { carriedLoot: totalCarriedLoot, lairLoot: totalLairLoot, type: 'data' })
}