import express from 'express'

import { Response, Request, Error } from "../interfaces/apiInterfaces"

import { getGMVersionOfBeast } from '../controllers/gameMaster'

import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import getDatabaseConnection from '../utilities/databaseConnection'
import { hasAppropriatePateronLevel } from '../utilities/gets/getBeast'
import { getPlayerVersionOfBeast } from '../controllers/player'
import { getMonsterFromCache } from '../controllers/monsterCache'
import { Beast } from '../interfaces/beastInterfaces/beastInterfaces'

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
    const beastId = body.beastId ?? +params.beastid

    const [viewInfo] = await databaseConnection.beast.canView(beastId).catch((error: Error) => sendErrorForward('can view', error, response))
    const type: string = hasAppropriatePateronLevel(user, viewInfo.patreon, viewInfo.canplayerview)

    if (type === 'gm') {
        const beast: Beast | null = getMonsterFromCache(+request.params.beastid)
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

BeastRoutes.get('/:beastid', checkIfGameMaster)

export default BeastRoutes