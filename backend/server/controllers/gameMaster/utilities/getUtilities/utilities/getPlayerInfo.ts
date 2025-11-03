import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"
import query from "../../../../../db/database"
import { getWhetherMonsterIsFavorite } from "../../../../../db/user/favorites"
import { getUserNotesForMonster } from "../../../../../db/user/notes"

export async function getFavorite(beastId: number, userId: number): Promise<boolean> {
    if (userId) {
        const result = await query(getWhetherMonsterIsFavorite, [userId, beastId])
        return result.length > 0
    } else {
        return false
    }
}

export async function getNotes(beastId: number, userId: number): Promise<Notes> {
    const [userNotes] = await query(getUserNotesForMonster, [beastId, userId])
    if (userNotes) {
        return userNotes
    }

    return {
        notes: ''
    }
}