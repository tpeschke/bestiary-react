import axios from "axios";

import { playerURL } from "../../../frontend-config";
import alertInfo, { showPendingAlert } from "../../../components/alert/alerts";
import { Notes } from "@bestiary/common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces";
import { FavoriteReturn } from "./beastHooks";

export async function savePlayerNotes(beastId: number, notes: Notes): Promise<number> {
    const data: any = await showPendingAlert(axios.post(playerURL + '/notes', { beastId, notes }))
    return data.noteId
}

export async function updateFavoriteStatus(beastID: number, newStatus: boolean): Promise<FavoriteReturn> {
    const {data}: any = await axios.post(playerURL + '/favorite', { beastID, newStatus })

    if (data.beastID) {
        alertInfo({ color: 'green', message: 'Entry has been removed from your Favorites', type: 'message' })
        return {
            type: 'delete',
            beastID: data
        }
    } else {
        alertInfo({ color: 'green', message: 'Entry has been added to your Favorites', type: 'message' })
        return {
            type: 'add',
            beastInfo: data
        }
    }
}