import express from 'express'

import { Response, Request, Error } from "../interfaces/apiInterfaces"


import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import getDatabaseConnection from '../utilities/databaseConnection'
import { getPlayerVersionOfBeast } from '../controllers/player'
import { getMonsterFromCache } from '../controllers/monsterCache'
import { Beast } from '../interfaces/beastInterfaces/beastInterfaces'
import { getGMVersionOfBeast } from '../controllers/gameMaster/gameMaster'
import { hasAppropriatePatreonLevel } from '../controllers/gameMaster/utilities/getBeast'
import getLoot from '../controllers/loot/loot'

const sendErrorForward = sendErrorForwardNoFile('GM route')

const BeastRoutes = express.Router()

interface gmAuthRequest extends Request {
    body: ownerAuthBody
}

interface ownerAuthBody {
    beastId: number
}

async function checkIfGameMaster(request: gmAuthRequest, response: Response) {
    const { user, body, params } = request
    const databaseConnection = getDatabaseConnection(request)
    const beastId = body.beastId ?? +params.beastId

    const [viewInfo] = await databaseConnection.beast.canView(beastId).catch((error: Error) => sendErrorForward('can view', error, response))
    const type: string = hasAppropriatePatreonLevel(user, viewInfo.patreon, viewInfo.canplayerview)

    if (type === 'gm') {
        const beast: Beast | null = getMonsterFromCache(beastId)
        if (beast) {
            checkForContentTypeBeforeSending(response, beast)
        } else {
            getGMVersionOfBeast(request, response)
        }
    } else if (type === 'player') {
        getPlayerVersionOfBeast(request, response)
    } else {
        checkForContentTypeBeforeSending(response, { color: "red", message: "You need to log on." })
    }
}

BeastRoutes.get('/:beastId', checkIfGameMaster)

BeastRoutes.post('/loot', getLoot)

export default BeastRoutes