import express from 'express'

import { Response, Error, BasicParamsRequest } from "../interfaces/apiInterfaces"

import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import getDatabaseConnection from '../utilities/databaseConnection'
import { getPlayerVersionOfBeast } from '../controllers/player'
import { getMonsterFromCache } from '../controllers/monsterCache'
import { getGMVersionOfBeast } from '../controllers/gameMaster/gameMaster'
import getLoot from '../controllers/loot/loot'
import getRandomEncounter from '../controllers/encounter/encounter'
import { Beast } from '../../common/interfaces/beast/beast'
import { hasAppropriatePatreonLevel } from '../controllers/gameMaster/utilities/getUtilities/utilities/miscInfo/getMiscInfo'

const sendErrorForward = sendErrorForwardNoFile('GM route')

const BeastRoutes = express.Router()

interface gmAuthRequest extends BasicParamsRequest {
    body: ownerAuthBody
}

interface ownerAuthBody {
    beastId: number
}

async function checkIfGameMaster(request: gmAuthRequest, response: Response) {
    const { user, body, params } = request
    const databaseConnection = getDatabaseConnection(request)
    const beastId = body.beastId ?? +params.beastId
    
    const databaseReturn = await databaseConnection.beast.canView(beastId).catch((error: Error) => sendErrorForward('can view', error, response))

    if (databaseReturn?.length > 0) {
        const [viewInfo] = databaseReturn
        const viewType: string = hasAppropriatePatreonLevel(user, viewInfo.patreon, viewInfo.canplayerview)

        if (viewType === 'gm') {
            const beast: Beast | null = getMonsterFromCache(beastId)
            if (beast) {
                // get player stuff
                checkForContentTypeBeforeSending(response, beast)
            } else {
                getGMVersionOfBeast(request, response)
            }
        } else if (viewType === 'player') {
            getPlayerVersionOfBeast(request, response)
        } else {
            checkForContentTypeBeforeSending(response, { color: "red", message: "You need to log on." })
        }

    } else {
        checkForContentTypeBeforeSending(response, { color: "red", message: "You need to log on." })
    }
}

BeastRoutes.get('/:beastId', checkIfGameMaster)
BeastRoutes.get('/encounter/:beastId', getRandomEncounter)

BeastRoutes.post('/loot', getLoot)

export default BeastRoutes