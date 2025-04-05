import './notes.css'

interface Props {
    notes: string
}

export default function NotesDisplay({ notes }: Props) {
    return (
        <div className='notes-shell'>
            {notes}
        </div>
    )
}