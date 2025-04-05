import { PlayerBeast } from "../../interfaces/viewInterfaces"

import NameHeader from "../../components/nameHeader/nameHeader"
import DoubleColumn from "../../components/doubleColumn/doubleColumn"
import FullImage from "../../components/fullImage/fullImage"
import NotesDisplay from "../../components/notes/notesDisplay"

interface Props {
    beast: PlayerBeast
}

export default function PlayerView({ beast }: Props) {
    const { id, name, notes } = beast

    return (
        <>
            <NameHeader name={name} />
            <DoubleColumn 
                LeftColumn={FullImage({ imageParam: id, altText: name })}
                RightColumn={NotesDisplay({notes})}
            />
        </>
    )
}