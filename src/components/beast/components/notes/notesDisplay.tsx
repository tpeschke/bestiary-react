import './notes.css'

import TextEditor from '../textEditor/textEditor'
import { SetPlayerNotes } from '../../interfaces/viewInterfaces'

interface Props {
    notes: string,
    setPlayerNotes: SetPlayerNotes
}

export default function NotesDisplay({ notes, setPlayerNotes }: Props) {
    return (
        <div className='notes-shell'>
            <TextEditor content={notes} captureCallBack={setPlayerNotes} />
        </div>
    )
}