import { Challenge } from "../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces";
import { ChallengeDisplay } from "./components/ChallengeDisplay";

interface Props {
    challenges: Challenge[]
}

export default function ChallengesDisplay({challenges}: Props) {
    return (
        <>
            <h3>Challenges</h3>
            {challenges.map(challenge => <ChallengeDisplay challenge={challenge} />)}
        </>
    )
}