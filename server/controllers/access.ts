import { Response, Request, Error } from '../interfaces/apiInterfaces'

import getDatabaseConnection from '../utilities/databaseConnection'
import { isOwner, isJustMainOwner } from '../utilities/ownerAccess'
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'

const sendErrorForward = sendErrorForwardNoFile('access controller')

export async function checkIfLoggedIn(request: Request, response: Response) {
    checkForContentTypeBeforeSending(response, { isUserLoggedIn: request.user && request.user.id, patreon: request.user ? request.user.patreon : 0 })
}

export async function checkIfPlayerView(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastid: number = +request.params.beastid
    const { id: userid, patreon = 0 } = request.user

    const { canplayerview } = await databaseConnection.beast.canView(beastid).catch((error: Error) => sendErrorForward('player can view', error, response))[0]

    const body = {
        canView: isJustMainOwner(userid) || patreon >= 3 || canplayerview
    }
    checkForContentTypeBeforeSending(response, body)
}

export async function canEditMonster(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastid: number = +request.params.beastid
    const { user } = request

    if (user) {
        const { userid } = await databaseConnection.beast.canEdit(beastid).catch((error: Error) => sendErrorForward('custom monster check', error, response))[0]
        const { id, patreon = 0 } = user

        if (userid) {
            const body = {
                canEdit: isOwner(id) || id === userid
            }
            checkForContentTypeBeforeSending(response, body)
        } else {
            const { count } = await databaseConnection.beast.custom.count(id).catch((error: Error) => sendErrorForward('number of user\'s custom monsters', error, response))[0]

            const canCreate = patreon >= 5 && count <= (5 + (patreon * 2))
            const canEdit = isOwner(id) || canCreate

            if (canEdit) {
                checkForContentTypeBeforeSending(response, { canEdit })
            } else {
                sendErrorForward('add custom monster', { message: "You've hit your limit for monsters. Upgrade your Patreon for more." }, response)
            }
        }
    } else {
        checkForContentTypeBeforeSending(response, { canEdit: false })
    }
}