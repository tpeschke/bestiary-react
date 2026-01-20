import './ChallengePage.css'
import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../../../components/loading/Loading"
import axios from "axios"
import { challengeSingleURL } from "../../../../frontend-config"
import { Link, useParams } from "react-router-dom"
import { ChallengeDisplay } from "../../../../components/ObstaclesNChallenges/ChallengeDisplay"
import { Challenge } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"

interface Props {
    setLoading?: SetLoadingFunction
}

export default function ChallengePage({ setLoading }: Props) {
    const { challengeId } = useParams()

    const [challenge, setChallenge] = useState<Challenge | null>(null)

    useEffect(() => {
        if (setLoading) {
            axios.get(challengeSingleURL + challengeId).then(({ data }) => {
                console.log(data)
                setLoading(data)
                setChallenge(data)
                document.title = data.name + ' - Bonfire Obstacle Index'
            })
        }
    }, [challengeId])

    return (
        <div className='challenge-page-shell'>
            <div className='card-background'>
                {challenge && <ChallengeDisplay challenge={challenge} index={0} skillSkulls={0} title="full" />}
                <h2 className="border">Related Bestiary Entries</h2>
                <div className="related-beasts">
                    {challenge?.relatedBeasts?.map(({ beastid, name }) => {
                        return (
                            <Link to={`/beast/${beastid}`}>
                                <button>{name}</button>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}