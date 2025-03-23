import { Response, Request } from "../apiInterfaces"

import getDatabaseConnection from "../utilities/databaseConnection"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'

const sendErrorForward = sendErrorForwardNoFile('player controller')

export async function getPlayerVersionOfBeast(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastid: number = +request.params.beastid
    const { user } = request

    let result = await databaseConnection.beast.player.info(beastid).catch((error: Error) => sendErrorForward('player version of beast', error, response))[0]
    if (user) {
        const notes = await databaseConnection.beast.player.getNotes(beastid, user.id).catch((error: Error) => sendErrorForward('player notes of beast', error, response))[0]
        result.notes = notes || {}
        checkForContentTypeBeforeSending(response, result)
    } else {
        checkForContentTypeBeforeSending(response, result)
    }
}

export async function addPlayerNotes(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const { user } = request
    const { beastId, noteId, notes } = request.body

    if (user && noteId) {
        const result = await databaseConnection.beast.player.updateNotes(noteId, notes).catch((error: Error) => sendErrorForward('update beast notes', error, response))[0]
        checkForContentTypeBeforeSending(response, result)
    } else if (user) {
        const count = await databaseConnection.beast.player.numberOfNotes(user.id).catch((error: Error) => sendErrorForward('check user note count', error, response))[0]
        const isAboveDefaultNumberOfNotes = count >= 50
        const isAboveNumberOfNotesForPatrons = count >= (user.patreon * 30) + 50

        if (isAboveDefaultNumberOfNotes || isAboveNumberOfNotesForPatrons) {
            request.status(401).send('You need to upgrade your Patreon to add more notes')
        } else {
            const result = databaseConnection.beast.player.addNotes(beastId, user.id, notes).catch((error: Error) => sendErrorForward('save beast notes', error, response))[0]
            checkForContentTypeBeforeSending(response, result)
        }
    } else {
        request.sendStatus(401)
    }
}