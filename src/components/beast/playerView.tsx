import { PlayerBeast } from "./beastInterfaces/viewInterfaces";

interface Props {
    beast: PlayerBeast
}

export default function PlayerView({ beast }: Props) {
    return (
        <>
            <h1>{beast.name}</h1>
            <p>Player View</p>
        </>
    )
}