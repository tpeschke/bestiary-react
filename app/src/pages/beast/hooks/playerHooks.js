import axios from "axios";
import { playerURL } from "../../../frontend-config";
import alertInfo, { showPendingAlert } from "../../../components/alert/alerts";
export async function savePlayerNotes(beastId, notes) {
    const data = await showPendingAlert(axios.post(playerURL + '/notes', { beastId, notes }));
    return data.noteId;
}
export async function updateFavoriteStatus(beastID, newStatus) {
    const { data } = await axios.post(playerURL + '/favorite', { beastID, newStatus });
    if (data.beastID) {
        alertInfo({ color: 'green', message: 'Entry has been removed from your Favorites', type: 'message' });
        return {
            type: 'delete',
            beastID: data
        };
    }
    else {
        alertInfo({ color: 'green', message: 'Entry has been added to your Favorites', type: 'message' });
        return {
            type: 'add',
            beastInfo: data
        };
    }
}
