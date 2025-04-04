import { Response, Request } from "../interfaces/apiInterfaces"

import getDatabaseConnection from "../utilities/databaseConnection"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'

const sendErrorForward = sendErrorForwardNoFile('player controller')

interface noteRequest extends Request {
    body: Body
}

interface Body {
    beastId?: number,
    noteId?: number,
    notes?: string
}

export async function getPlayerVersionOfBeast(request: Request, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastid: number = +request.params.beastid
    const { user } = request

    if ( user && user.patreon && user.patreon > 3 ) {
        checkForContentTypeBeforeSending(response, {color: 'green', message: 'You\'re a GM'})
    } else {
        let [playerInfo] = await databaseConnection.beast.player.info(beastid).catch((error: Error) => sendErrorForward('player version of beast', error, response))
        if (user) {
            const [notes] = await databaseConnection.beast.user.notes.get(beastid, user.id).catch((error: Error) => sendErrorForward('player notes of beast', error, response))
            playerInfo.notes = notes || {}
            checkForContentTypeBeforeSending(response, playerInfo)
        } else {
            checkForContentTypeBeforeSending(response, playerInfo)
        }
    }
}

export async function addPlayerNotes(request: noteRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const { user } = request
    const { beastId, noteId, notes } = request.body

    if (user && noteId) {
        const result = await databaseConnection.beast.user.notes.update(noteId, notes).catch((error: Error) => sendErrorForward('update beast notes', error, response))[0]
        checkForContentTypeBeforeSending(response, result)
    } else if (user && user.patreon) {
        const count = await databaseConnection.beast.user.notes.number(user.id).catch((error: Error) => sendErrorForward('check user note count', error, response))[0]
        const isAboveDefaultNumberOfNotes = count >= 50
        const isAboveNumberOfNotesForPatrons = count >= (user.patreon * 30) + 50

        if (isAboveDefaultNumberOfNotes || isAboveNumberOfNotesForPatrons) {
            request.status(401).send('You need to upgrade your Patreon to add more notes')
        } else {
            const result = databaseConnection.beast.user.notes.add(beastId, user.id, notes).catch((error: Error) => sendErrorForward('save beast notes', error, response))[0]
            checkForContentTypeBeforeSending(response, result)
        }
    } else {
        request.sendStatus(401)
    }
}