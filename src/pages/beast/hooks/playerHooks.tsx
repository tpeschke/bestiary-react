import axios from "axios";

import { playerURL } from "../../../frontend-config";
import { showPendingAlert } from "../../../components/alert/alerts";
import { Notes } from "../../../../common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces";

export async function savePlayerNotes(beastId: number, notes: Notes): Promise<number> {
    const data: any = await showPendingAlert(axios.post(playerURL + '/notes', {beastId, notes}))
    return data.noteId
}