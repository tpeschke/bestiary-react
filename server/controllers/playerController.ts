import { Response, Request } from "../apiInterfaces"

import getDatabaseConnection from "../utilities/databaseConnection"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'

const sendErrorForward = sendErrorForwardNoFile('player controller')

export async function getPlayerVersionOfBeast(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastid : number = +request.params.beastid
    const { user } = request

    let result = await databaseConnection.beast.player.info(beastid).catch((error : Error) => sendErrorForward('player version of beast', error, response))[0]
    if (user) {
        const notes = await databaseConnection.beast.player.notes(beastid, user.id).catch((error : Error) => sendErrorForward('player notes of beast', error, response))[0]
        result.notes = notes || {}
        checkForContentTypeBeforeSending(response, result)
    } else {
        checkForContentTypeBeforeSending(response, result)
    }
}