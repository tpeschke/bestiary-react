import './notes.css'

import TextEditor from '../textEditor/textEditor'

import { Notes } from '../../interfaces/viewInterfaces'

type SetPlayerNotes = (value: string) => void

interface Props {
    notes: Notes,
    setPlayerNotes: SetPlayerNotes
}

export default function NotesDisplay({ notes, setPlayerNotes }: Props) {
    return (
        <div className='notes-shell'>
            <TextEditor content={notes} captureCallBack={setPlayerNotes} />
        </div>
    )
}