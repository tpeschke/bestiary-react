import { Response, Request, Error } from '../apiInterfaces'

import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import getDatabaseConnection from '../utilities/databaseConnection'
import { ownerId, jeremyId } from '../server-config'

const sendErrorForward = sendErrorForwardNoFile('access controller')

export async function checkIfPlayerView(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastid : number = +request.params.beastid
    const { id: userid, patreon } = request.user

    const { canplayerview } = await databaseConnection.beast.canView(beastid).catch((error: Error) => sendErrorForward('player can view', error, response))[0]
    
    const body = {
        canView: userid === ownerId || patreon >= 3 || canplayerview
    }
    checkForContentTypeBeforeSending(response, body)
}

export async function canEditMonster(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastid: number = +request.params.beastid
    const { user } = request

    if (user) {
        const { userid } = await databaseConnection.beast.canEdit(beastid).catch((error: Error) => sendErrorForward('custom monster check', error, response))[0]

        if (userid) {
            const body = {
                canEdit: isOwner(user.id) || user.id === userid
            }
            checkForContentTypeBeforeSending(response, body)
        } else {
            const { count } = await databaseConnection.beast.custom.count(user.id).catch((error: Error) => sendErrorForward('number of user\'s custom monsters', error, response))[0]

            const canCreate = user.patreon >= 5 && count <= (5 + (user.patreon * 2))
            const canEdit = isOwner(user.id) || canCreate

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

function isOwner(userId: number) : boolean {
    return userId === ownerId || userId === jeremyId
}