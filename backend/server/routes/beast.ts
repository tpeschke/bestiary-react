// @ts-ignore
import express from 'express'

import { Response, Error, BasicParamsRequest } from "../interfaces/apiInterfaces"

import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import getDatabaseConnection from '../utilities/databaseConnection'
import { getPlayerVersionOfBeast } from '../controllers/player'
import { getMonsterFromCache } from '../controllers/monsterCache'
import { getGMVersionOfBeast } from '../controllers/gameMaster/gameMaster'
import getLoot from '../controllers/loot/loot'
import getRandomEncounter from '../controllers/encounter/encounter'
import { Beast } from '@bestiary/common/interfaces/beast/beast'
import { hasAppropriatePatreonLevel } from '../controllers/gameMaster/utilities/getUtilities/utilities/miscInfo/getMiscInfo'
import { updateBeast } from '../controllers/gameMaster/utilities/updateUtilities/updateBeast'
import { Notes } from '@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces'
import { getFavorite, getNotes } from '../controllers/gameMaster/utilities/getUtilities/utilities/getPlayerInfo'
import { isOwner } from '../utilities/ownerAccess'

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
                let modifiedBeast = { ...beast }
                let promiseArray: any = []

                if (user?.id) {
                    promiseArray.push(getFavorite(databaseConnection, modifiedBeast.id, user?.id).then((isFavorite: boolean) => modifiedBeast.playerInfo.favorite = isFavorite))
                    promiseArray.push(getNotes(databaseConnection, modifiedBeast.id, user?.id).then((notes: Notes) => modifiedBeast.playerInfo.notes = notes))
                }

                modifiedBeast.generalInfo.canEdit = isOwner(user?.id) || user?.id === modifiedBeast.generalInfo.beastOwnerId

                await Promise.all(promiseArray)

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

BeastRoutes.post('/save', updateBeast)
BeastRoutes.post('/loot', getLoot)

export default BeastRoutes