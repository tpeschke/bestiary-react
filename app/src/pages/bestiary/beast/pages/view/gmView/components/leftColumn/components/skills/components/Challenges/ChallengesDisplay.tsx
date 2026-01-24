import "./ChallengesDisplay.css"
import { ChallengeDisplay } from "../../../../../../../../../../../../components/ObstaclesNChallenges/ChallengeDisplay";
import Body from "../../../../../../../../../components/UI/body/Body";
import { Challenge } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";

interface Props {
    challenges: Challenge[]
}

export default function ChallengesDisplay({ challenges }: Props) {
    return (
        <>
            <h3>Challenges</h3>
            <Body>
                <>
                    {challenges.map((challenge: Challenge, index: number) => <ChallengeDisplay key={index} challenge={challenge} index={index} />)}
                </>
            </Body>
        </>
    )
}