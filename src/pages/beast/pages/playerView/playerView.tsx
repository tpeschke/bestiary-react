import PlayerBeastClass from "../../models/PlayerBeastClass"

import NotesDisplay from "../../components/notes/notesDisplay"
import DoubleColumn from "../../components/UI/doubleColumn/doubleColumn"
import FullImage from "../../components/UI/fullImage/fullImage"
import NameHeader from "../../components/UI/nameHeader/nameHeader"

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