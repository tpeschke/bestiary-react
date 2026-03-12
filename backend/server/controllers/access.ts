import { checkAccess, checkIfUserCanEditMonster } from '../db/beast/access'
import { getUserCustomMonsterCount } from '../db/beast/custom'
import query from '../db/database'
import { Response, Request } from '../interfaces/apiInterfaces'
import getAccessLevel, { GM, PLAYER } from "@bestiary/common/utilities/get/getAccessLevel"
import { isOwner, isJustMainOwner } from '../utilities/ownerAccess'
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import { User } from '@bestiary/common/interfaces/userInterfaces'

const sendErrorForward = sendErrorForwardNoFile('access controller')

export async function checkIfLoggedIn(request: Request, response: Response) {
    checkForContentTypeBeforeSending(response, {
        isUserLoggedIn: request.user && request.user.id,
        patreon: request.user?.patreon ? request.user.patreon : 0,
        koFi:  request.user?.koFi ? request.user.koFi : 0,
        isOwner: isOwner(request.user?.id),
        system: request.user?.system
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
    const patreon = getAccessLevel(request.user)

    const [{ canplayerview }] = await query(checkAccess, beastId)

    const body = {
        canView: isJustMainOwner(userId) || patreon >= GM || canplayerview
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

async function checkIfUserHasPermissions(_: Request, response: Response, beastId: number, user: User) {
    const [{ userid: beastOwnerId }] = await query(checkIfUserCanEditMonster, beastId)
    const { id, patreon = 0 } = user
    const patreonAccess = getAccessLevel(user)

    if (beastOwnerId) {
        const body = {
            canEdit: isOwner(id) || id === beastOwnerId
        }
        checkForContentTypeBeforeSending(response, body)
    } else {
        const [{ count }] = await query(getUserCustomMonsterCount, id)

        const canCreate = patreonAccess !== PLAYER && count <= (5 + (patreon * 2))
        const canEdit = isOwner(id) || canCreate

        if (canEdit) {
            checkForContentTypeBeforeSending(response, { canEdit })
        } else {
            sendErrorForward('add custom monster', { message: "You've hit your limit for monsters. Upgrade your Ko-Fi for more." }, response)
        }
    }
}

const updatePlayerPreferenceSQL = `update usersAuth
set system = $2
where id = $1`

interface PlayerPreference extends Request {
    params: {
        preference: string
    }
}

export async function updatePlayerPreference(request: PlayerPreference, response: Response) {
    const preference: number = +request.params.preference
    const userId = request.user?.id

    await query(updatePlayerPreferenceSQL, [userId, preference])

    checkForContentTypeBeforeSending(response, { updated: true })
}