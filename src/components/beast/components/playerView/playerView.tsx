import PlayerBeastClass from "../../models/PlayerBeastClass"

import NameHeader from "../nameHeader/nameHeader"
import DoubleColumn from "../doubleColumn/doubleColumn"
import FullImage from "../fullImage/fullImage"
import NotesDisplay from "../notes/notesDisplay"

interface Props {
    beast: PlayerBeastClass
}

export default function PlayerView({ beast }: Props) {

    function setPlayerNotes(value: string) {
        beast.setNotes(value)
    }

    return (
        <>
            <NameHeader name={beast.name} />
            <DoubleColumn 
                LeftColumn={FullImage({ imageParam: beast.id, altText: beast.name })}
                RightColumn={NotesDisplay({notes: beast.notes, setPlayerNotes})}
            />
        </>
    )
}