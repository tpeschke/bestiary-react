import PlayerBeastClass from "../../models/PlayerBeastClass"

import NameHeader from "../../components/nameHeader/nameHeader"
import DoubleColumn from "../../components/doubleColumn/doubleColumn"
import FullImage from "../../components/fullImage/fullImage"
import NotesDisplay from "../../components/notes/notesDisplay"

interface Props {
    beast: PlayerBeastClass
}

export default function PlayerView({ beast }: Props) {
    const { id, name, notes } = beast

    function setPlayerNotes(value: string) {
        beast.notes = value
    }

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