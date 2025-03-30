import express from 'express'

import { Response, Request, Error } from "../interfaces/apiInterfaces"

import { getGMVersionOfBeast } from '../controllers/beast'
import { isOwner } from '../utilities/ownerAccess'

import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
const sendErrorForward = sendErrorForwardNoFile('GM route')

const GMRoutes = express.Router()

interface gmAuthRequest extends Request {
    body: ownerAuthBody
}

interface ownerAuthBody {
    id: number
}

async function checkIfGameMaster(request: gmAuthRequest, response: Response, next: Function) {
    const { user, body, params } = request
    if (!user) {
        checkForContentTypeBeforeSending(response, { color: "red", message: "You need to log on." })
    } else {
        const databaseConnection = request.app.get('db')
        const beastId = body.id ? body.id : params.id
        if (beastId) {
            if (isOwner(user.id) || user.patreon >= 3) {
                next()
            } else {
                const canplayerview = await databaseConnection.get.canView(beastId).catch((error: Error) => sendErrorForward('can view', error, response))[0].canplayerview
                if (canplayerview) {
                    next()
                } else {
                    checkForContentTypeBeforeSending(response, { color: "red", message: "You need to upgrade your Patreon" })
                }
            }
        }
    }
}

GMRoutes.get('/:beastid', checkIfGameMaster, getGMVersionOfBeast)

export default GMRoutes