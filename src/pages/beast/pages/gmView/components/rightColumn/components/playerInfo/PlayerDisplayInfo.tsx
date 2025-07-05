import { Notes } from "../../../../../../../../../common/interfaces/beast/infoInterfaces/playerSpecificInfoInterfaces"
import NotesDisplay, { SetPlayerNotes } from "../../../../../../components/notes/notesDisplay"
import Body from "../../../../../../components/UI/body/Body"

export interface PlayerDisplayInfoProps {
    updateNotes: SetPlayerNotes,
    notes: Notes
}

export default function PlayerDisplayInfo({ notes, updateNotes }: PlayerDisplayInfoProps) {
    return (
        <div className='player-display-shell'>
            <h2 className='border'>Notes</h2>
            <Body>
                <NotesDisplay notes={notes} setPlayerNotes={updateNotes} />
            </Body>
        </div>
    )
}