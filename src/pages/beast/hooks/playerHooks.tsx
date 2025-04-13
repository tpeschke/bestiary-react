import axios from "axios";

import { playerURL } from "../../../frontend-config";
import { Notes } from "../interfaces/viewInterfaces";
import { showPendingAlert } from "../../../components/alert/alerts";

export async function savePlayerNotes(beastId: number, notes: Notes): Promise<number> {
    const data: any = await showPendingAlert(axios.post(playerURL + '/notes', {beastId, notes}))
    return data.noteId
}