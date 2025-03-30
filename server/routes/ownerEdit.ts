import express from 'express'

import { Response, Request, Error } from "../interfaces/apiInterfaces"

import { updateBeast } from '../controllers/gameMaster'
import { isOwner } from '../utilities/ownerAccess'

import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
const sendErrorForward = sendErrorForwardNoFile('edit route')

const ownerEditRoutes = express.Router()

interface ownAuthRequest extends Request {
    body: ownerAuthBody
}

interface ownerAuthBody {
    id: number
}

async function checkIfOwnsBeast(request: ownAuthRequest, response: Response, next: Function) {
    const { user, body, params } = request
    if (!user) {
        checkForContentTypeBeforeSending(response, { color: "red", message: "You need to log on." })
    } else {
        const databaseConnection = request.app.get('db')
        const beastId = body.id ? body.id : params.id
        if (beastId) {
            const userid = await databaseConnection.get.canEdit(beastId).catch((error: Error) => sendErrorForward('can edit save', error, response))[0].userid
            if (isOwner(user.id) || user.id === userid) {
                next()
            } else {
                checkForContentTypeBeforeSending(response, { color: "red", message: "This isn't your monster" })
            }
        } else {
            if (isOwner(user.id) || user.patreon >= 5) {
                next()
            } else {
                checkForContentTypeBeforeSending(response, { color: "red", message: "You need to upgrade your Patreon" })
            }
        }
    }
}

ownerEditRoutes.post('/upsert', checkIfOwnsBeast, updateBeast)

export default ownerEditRoutes