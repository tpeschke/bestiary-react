import axios from "axios";

import { showPendingAlert } from "../../alert/alerts";

import { playerURL } from "../../../frontend-config";
import { Notes } from "../interfaces/viewInterfaces";

export async function savePlayerNotes(beastId: number, notes: Notes): Promise<number> {
    const data: any = await showPendingAlert(axios.post(playerURL + '/notes', {beastId, notes}))
    return data.noteId
}