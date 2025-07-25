import { Response, Request, BasicParamsRequest } from "../interfaces/apiInterfaces"

import getDatabaseConnection from "../utilities/databaseConnection"
import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import { getArtistInfo } from "./gameMaster/utilities/getUtilities/utilities/miscInfo/getMiscInfo"

const sendErrorForward = sendErrorForwardNoFile('player controller')

export async function getPlayerVersionOfBeast(request: BasicParamsRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const beastId: number = +request.params.beastId
    const { user } = request

    if (user && user.patreon && user.patreon > 3) {
        checkForContentTypeBeforeSending(response, { color: 'green', message: 'You\'re a GM' })
    } else {
        let [playerInfo] = await databaseConnection.beast.player.info(beastId).catch((error: Error) => sendErrorForward('player version of beast', error, response))

        const artistInfo = await getArtistInfo(databaseConnection, playerInfo.id, false)
        playerInfo.artistInfo = artistInfo.genericArtistInfo

        if (user) {
            const [notes] = await databaseConnection.user.notes.get(beastId, user.id).catch((error: Error) => sendErrorForward('player notes of beast', error, response))
            playerInfo.notes = notes || ''
            checkForContentTypeBeforeSending(response, playerInfo)
        } else {
            checkForContentTypeBeforeSending(response, playerInfo)
        }
    }
}

interface NoteRequest extends Request {
    body: Body
}

interface Body {
    beastId?: number,
    notes: {
        id?: number,
        notes: string
    }
}

export async function addPlayerNotes(request: NoteRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const { user } = request
    const { beastId, notes } = request.body

    if (user && notes.id) {
        await databaseConnection.user.notes.update(notes.id, notes.notes).catch((error: Error) => sendErrorForward('update notes', error, response))
        checkForContentTypeBeforeSending(response, { color: 'green', message: 'Notes Saved!', noteId: notes.id })
    } else if (user) {
        const [count] = await databaseConnection.user.notes.number(user.id).catch((error: Error) => sendErrorForward('check user note count', error, response))

        const isAboveDefaultNumberOfNotes = count >= 50
        const patreon = user.patreon ?? 0
        const isAboveNumberOfNotesForPatrons = count >= (patreon * 30) + 50

        if (isAboveDefaultNumberOfNotes || isAboveNumberOfNotesForPatrons) {
            request.status(401).send('You need to upgrade your Patreon to add more notes')
        } else {
            const [result] = await databaseConnection.user.notes.add(beastId, user.id, notes.notes).catch((error: Error) => sendErrorForward('save notes', error, response))
            checkForContentTypeBeforeSending(response, { color: 'green', message: 'Notes Saved!', noteId: result.id })
        }
    } else {
        sendErrorForward('notes', { message: 'something has gone terrible wrong RUN RUN AS FAST YOU CAN' }, response)
    }
}

interface FavoriteRequest extends Request {
    body: Body
}

interface Body {
    beastID: number,
    newStatus: boolean
}

export async function updateFavoriteStatus(request: FavoriteRequest, response: Response) {
    const databaseConnection = getDatabaseConnection(request)
    const userID = request.user?.id
    const { beastID, newStatus } = request.body

    if (newStatus) {
        await databaseConnection.user.favorite.add(userID, beastID)
        const [newFavoriteCatalog] = await databaseConnection.user.favorite.getOne(userID, beastID)
        checkForContentTypeBeforeSending(response, newFavoriteCatalog)
    } else {
        await databaseConnection.user.favorite.delete(userID, beastID)
        checkForContentTypeBeforeSending(response, {beastID: beastID})
    }
}

export async function getFavorites(databaseConnection: any, userID: number) {
    return await databaseConnection.user.favorite.getAll(userID)
}