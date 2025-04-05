import { PlayerBeast, PlayerSetInfo } from "../../interfaces/viewInterfaces"

import NameHeader from "../../components/nameHeader/nameHeader"
import DoubleColumn from "../../components/doubleColumn/doubleColumn"
import FullImage from "../../components/fullImage/fullImage"
import NotesDisplay from "../../components/notes/notesDisplay"

interface Props {
    beast?: PlayerBeast,
    setInfo: PlayerSetInfo
}

export default function PlayerView({ beast = { id: 0, name: '', notes: ''}, setInfo }: Props) {
    const { id, name, notes } = beast
    const { setPlayerNotes } = setInfo

    return (
        <>
            <NameHeader name={name} />
            <DoubleColumn 
                LeftColumn={FullImage({ imageParam: id, altText: name })}
                RightColumn={NotesDisplay({notes, setPlayerNotes})}
            />
        </>
    )
}