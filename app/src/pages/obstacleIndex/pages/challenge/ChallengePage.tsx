import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../../../components/loading/Loading"
import axios from "axios"
import { challengeSingleURL } from "../../../../frontend-config"
import { useParams } from "react-router-dom"
import { ChallengeDisplay } from "../../../../components/ObstaclesNChallenges/ChallengeDisplay"
import { Challenge } from "../../../bestiary/beast/interfaces/infoInterfaces/skillInfoInterfaces"

interface Props {
    setLoading?: SetLoadingFunction
}

export default function ChallengePage({ setLoading }: Props) {
    const { challengeId } = useParams()

    const [challenge, setChallenge] = useState<Challenge | null>(null)

    useEffect(() => {
        if (setLoading) {
            axios.get(challengeSingleURL + challengeId).then(({data}) => {
                console.log(data)
                setLoading(data)
                setChallenge(data)
                document.title = data.name + ' - Bonfire Obstacle Index'
            })
        }
    }, [challengeId])

    return (
        <div className='card-background'>
            {challenge && <ChallengeDisplay challenge={challenge} index={0} skillSkulls={0} title="full" />}
            {/* TODO Show notes */}
            {/* TODO check beast view */}
            {/* Links to related monsters */}
        </div>
    )
}