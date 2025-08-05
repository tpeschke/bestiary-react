import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"

export async function getFavorite(databaseConnection: any, beastId: number, userId: number): Promise<boolean> {
    if (userId) {
        const result = await databaseConnection.user.favorite.get(userId, beastId)
        return result.length > 0
    } else {
        return false
    }
}

export async function getNotes(databaseConnection: any, beastId: number, userId: number): Promise<Notes> {
    const [userNotes] = await databaseConnection.user.notes.get(beastId, userId)
    if (userNotes) {
        return userNotes
    }

    return {
        notes: ''
    }
}