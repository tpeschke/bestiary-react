import { PlayerBeast } from "../interfaces/viewInterfaces"

import NameHeader from "../components/nameHeader/nameHeader"
import DoubleColumn from "../components/doubleColumn/doubleColumn"
import FullImage from "../components/fullImage/fullImage"
import Notes from "../components/notes/notes"

interface Props {
    beast: PlayerBeast
}

export default function PlayerView({ beast }: Props) {
    const { id, name } = beast

    return (
        <>
            <NameHeader name={name} />
            <DoubleColumn 
                LeftColumn={FullImage({ imageParam: id, altText: name })}
                RightColumn={Notes()}
            />
        </>
    )
}