import './notes.css'

import TextEditor from '../textEditor/textEditor'

import { Notes } from '../../interfaces/viewInterfaces'
import { useSelector } from 'react-redux'
import { isUserLoggedOn } from '../../../../redux/slices/userSlice'

type SetPlayerNotes = (value: string) => void

interface Props {
    notes: Notes,
    setPlayerNotes: SetPlayerNotes
}

export default function NotesDisplay({ notes, setPlayerNotes }: Props) {
    const userIsLoggedIn = useSelector(isUserLoggedOn)

    return (
        <>
            {userIsLoggedIn ?
                <div className='notes-shell'>
                    <TextEditor content={notes} captureCallBack={setPlayerNotes} />
                </div>
                :
                <p className='warning'>You need to be logged in to leave notes</p>
            }
        </>
    )
}