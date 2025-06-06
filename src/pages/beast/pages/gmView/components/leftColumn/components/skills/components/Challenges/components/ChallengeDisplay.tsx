import { Challenge } from "../../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces"

interface Props {
    challenge: Challenge
}

export function ChallengeDisplay({ challenge }: Props) {
    const { name, flowchart } = challenge
    return (
        <>
            <h6>{name}</h6>
        </>
    )
}