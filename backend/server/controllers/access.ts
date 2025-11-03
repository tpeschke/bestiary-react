import { checkAccess, checkIfUserCanEditMonster } from '../db/beast/access'
import { getUserCustomMonsterCount } from '../db/beast/custom'
import query from '../db/database'
import { Response, Request, User } from '../interfaces/apiInterfaces'

import { isOwner, isJustMainOwner } from '../utilities/ownerAccess'
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'

const sendErrorForward = sendErrorForwardNoFile('access controller')

export async function checkIfLoggedIn(request: Request, response: Response) {
    checkForContentTypeBeforeSending(response, { 
        isUserLoggedIn: request.user && request.user.id, 
        patreon: request.user?.patreon ? request.user.patreon : 0,
        isOwner: isOwner(request.user?.id)
    })
}

interface BeastAccessRequest extends Request {
    params: {
        beastId: string
    }
}

export async function checkIfPlayerView(request: BeastAccessRequest, response: Response) {
    const beastId: number = +request.params.beastId
    const userId = request.user?.id
    const patreon = request.user?.patreon ? request.user.patreon : 0

    const [{canplayerview}] = await query(checkAccess, beastId)

    const body = {
        canView: isJustMainOwner(userId) || patreon >= 3 || canplayerview
    }
    checkForContentTypeBeforeSending(response, body)
}

export async function canEditMonster(request: BeastAccessRequest, response: Response) {
    const { user } = request

    if (user) {
        const beastId: number = +request.params.beastId
        checkIfUserHasPermissions(request, response, beastId, user)
    } else {
        checkForContentTypeBeforeSending(response, { canEdit: false })
    }
}

async function checkIfUserHasPermissions(request: Request, response: Response, beastId: number, user: User) {
    const [{ userid: beastOwnerId }] = await query(checkIfUserCanEditMonster, beastId)
    const { id, patreon = 0 } = user

    if (beastOwnerId) {
        const body = {
            canEdit: isOwner(id) || id === beastOwnerId
        }
        checkForContentTypeBeforeSending(response, body)
    } else {
        const [{ count }] = await query(getUserCustomMonsterCount, id)

        const canCreate = patreon >= 5 && count <= (5 + (patreon * 2))
        const canEdit = isOwner(id) || canCreate

        if (canEdit) {
            checkForContentTypeBeforeSending(response, { canEdit })
        } else {
            sendErrorForward('add custom monster', { message: "You've hit your limit for monsters. Upgrade your Patreon for more." }, response)
        }
    }
}