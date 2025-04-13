import PlayerBeastClass from "../../models/PlayerBeastClass"

import NameHeader from "../../components/nameHeader/nameHeader"
import DoubleColumn from "../../components/doubleColumn/doubleColumn"
import FullImage from "../../components/fullImage/fullImage"
import NotesDisplay from "../../components/notes/notesDisplay"

interface Props {
    beast: PlayerBeastClass
}

export default function PlayerView({ beast }: Props) {
    return (
        <>
            <NameHeader name={beast.name} />
            <DoubleColumn 
                LeftColumn={FullImage({ imageParam: beast.id, altText: beast.name, artistInfo: beast.artistInfo })}
                RightColumn={NotesDisplay({notes: beast.notes, setPlayerNotes: beast.setNotes})}
            />
        </>
    )
}