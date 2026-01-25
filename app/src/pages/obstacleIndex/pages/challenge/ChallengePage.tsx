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
            setLoading(false)
            axios.get(challengeSingleURL + challengeId).then(({ data }) => {
                setLoading(data)
                setChallenge(data)
                document.title = data.name + ' - Bonfire Obstacle Index'
            })
        }
    }, [challengeId])

    const hasRelatedBeasts = challenge?.relatedBeasts && challenge?.relatedBeasts?.length > 0

    return (
        <div className='challenge-page-shell'>
            <div className='card-background'>
                {challenge && <ChallengeDisplay challenge={challenge} index={0} title="full" />}
                {hasRelatedBeasts && (
                    <>
                        <h2 className="border">Related Bestiary Entries</h2>
                        <div className="related-beasts">
                            {challenge?.relatedBeasts?.map(({ beastid, name }, index) => {
                                return (
                                    <Link key={index} to={`/beast/${beastid}`} target="_blank">
                                        <button>{name}</button>
                                    </Link>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}