import { getMonsterPlayerInfo } from "../db/beast/player"
import query from "../db/database"
import { addMonsterToUserFavorites, getSingleUserFavorite, getUserFavorites, removeMonsterFromUserFavoriates } from "../db/user/favorites"
import { addUserNotes, getCountOfUserNotes, getUserNotesForMonster, updateUserNotes } from "../db/user/notes"
import { Response, Request, BasicParamsRequest } from "../interfaces/apiInterfaces"

import { checkForContentTypeBeforeSending, sendErrorForwardNoFile } from '../utilities/sendingFunctions'
import { getArtistInfo } from "./gameMaster/utilities/getUtilities/utilities/generalInfo/miscInfo/getMiscInfo"

const sendErrorForward = sendErrorForwardNoFile('player controller')

export async function getPlayerVersionOfBeast(request: BasicParamsRequest, response: Response) {
    const beastId: number = +request.params.beastId
    const { user } = request

    if (user && user.patreon && user.patreon > 3) {
        checkForContentTypeBeforeSending(response, { color: 'green', message: 'You\'re a GM' })
    } else {
        let [playerInfo] = await query(getMonsterPlayerInfo, beastId)

        const artistInfo = await getArtistInfo(playerInfo.id, false)
        playerInfo.artistInfo = artistInfo.genericArtistInfo

        if (user) {
            const [notes] = await query(getUserNotesForMonster, [beastId, user.id])
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
    const { user } = request
    const { beastId, notes } = request.body

    if (user && notes.id) {
        await query(updateUserNotes, [notes.id, notes.notes])
        checkForContentTypeBeforeSending(response, { color: 'green', message: 'Notes Saved!', noteId: notes.id })
    } else if (user) {
        const [count] = await query(getCountOfUserNotes, user.id)

        const isAboveDefaultNumberOfNotes = count >= 50
        const patreon = user.patreon ?? 0
        const isAboveNumberOfNotesForPatrons = count >= (patreon * 30) + 50

        if (isAboveDefaultNumberOfNotes || isAboveNumberOfNotesForPatrons) {
            request.status(401).send('You need to upgrade your Patreon to add more notes')
        } else {
            const [result] = await query(addUserNotes, [beastId, user.id, notes.notes])
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
    const userID = request.user?.id
    const { beastID, newStatus } = request.body

    if (newStatus) {
        await query(addMonsterToUserFavorites, [userID, beastID])
        const [newFavoriteCatalog] = await query(getSingleUserFavorite, [userID, beastID])
        checkForContentTypeBeforeSending(response, newFavoriteCatalog)
    } else {
        await query(removeMonsterFromUserFavoriates, [userID, beastID])
        checkForContentTypeBeforeSending(response, {beastID: beastID})
    }
}

export async function getFavorites(userID: number) {
    return await query(getUserFavorites, userID)
}