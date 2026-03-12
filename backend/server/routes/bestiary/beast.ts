// @ts-ignore
import express from 'express'

import { Response, BasicParamsRequest } from "../../interfaces/apiInterfaces"

import { checkForContentTypeBeforeSending } from '../../utilities/sendingFunctions'
import { getPlayerVersionOfBeast } from '../../controllers/bestiary/player'
import { getMonsterFromCache } from '../../controllers/bestiary/monsterCache'
import getLoot from '../../controllers/bestiary/loot/loot'
import getRandomEncounter, { getEditRandomEncounter } from '../../controllers/bestiary/encounter/encounter'
import { Beast } from '@bestiary/common/interfaces/beast/beast'
import { hasAppropriatePatreonLevel } from '../../controllers/bestiary/gameMaster/utilities/getUtilities/utilities/generalInfo/miscInfo/getMiscInfo'
import { updateBeast } from '../../controllers/bestiary/gameMaster/utilities/updateUtilities/updateBeast'
import { Notes } from '@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces'
import { getFavorite, getNotes } from '../../controllers/bestiary/gameMaster/utilities/getUtilities/utilities/getPlayerInfo'
import { isOwner } from '../../utilities/ownerAccess'
import query from '../../db/database'
import { checkAccess } from '../../db/beast/access'
import { getGMVersionOfBeast } from '../../controllers/bestiary/gameMaster/gameMaster'
import { Access, getEntryAccessLevel, GM, PLAYER } from '@bestiary/common/utilities/get/getAccessLevel'

const BeastRoutes = express.Router()

interface gmAuthRequest extends BasicParamsRequest {
    body: ownerAuthBody
}

interface ownerAuthBody {
    beastId: number
}

async function checkIfGameMaster(request: gmAuthRequest, response: Response) {
    const { user, body, params } = request
    const beastId = body.beastId ?? +params.beastId

    const databaseReturn = await query(checkAccess, beastId)

    if (databaseReturn?.length > 0) {
        const [viewInfo] = databaseReturn
        const patreon = getEntryAccessLevel(viewInfo.patreon)
        const viewType: Access = hasAppropriatePatreonLevel(user, patreon, viewInfo.canplayerview)

        if (viewType === GM) {
            const beast: Beast | null = getMonsterFromCache(beastId)
            if (beast) {
                let modifiedBeast = { ...beast }
                let promiseArray: any = []

                if (user?.id) {
                    promiseArray.push(getFavorite(modifiedBeast.id, user?.id).then((isFavorite: boolean) => modifiedBeast.playerInfo.favorite = isFavorite))
                    promiseArray.push(getNotes(modifiedBeast.id, user?.id).then((notes: Notes) => modifiedBeast.playerInfo.notes = notes))
                }

                modifiedBeast.generalInfo.canEdit = isOwner(user?.id) || user?.id === modifiedBeast.generalInfo.beastOwnerId

                await Promise.all(promiseArray)

                checkForContentTypeBeforeSending(response, beast)
            } else {
                getGMVersionOfBeast(request, response)
            }
        } else if (viewType === PLAYER) {
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
BeastRoutes.get('/editEncounter/:beastId', getEditRandomEncounter)

BeastRoutes.post('/save', updateBeast)
BeastRoutes.post('/loot', getLoot)

export default BeastRoutes