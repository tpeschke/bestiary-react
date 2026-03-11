import { Challenge } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import alertInfo from "../../../../../components/alert/alerts";
import { SetLoadingFunction } from "../../../../../components/loading/Loading";
import { ChallengeDisplay } from "../../../../../components/ObstaclesNChallenges/ChallengeDisplay";
import { challengeSingleURL } from "../../../../../frontend-config";
import obstacleCatalogHook from "../../../hooks/obstacleCatalogHook";
import NameHeader from "../../../../bestiary/beast/components/UI/nameHeader/nameHeader";
import getObstacleFromChallengeFlowchart from "@bestiary/common/utilities/get/getObstaclesFromChallengeFlowchart"

interface Props {
    setLoading?: SetLoadingFunction
}

export default function ChallengeEditPage({ setLoading }: Props) {
    const { challengeCache, saveChallengeToCache } = obstacleCatalogHook()

    const { challengeId } = useParams()
    const navigate = useNavigate()

    const [challenge, setChallenge] = useState<Challenge | null>(null)
    const [obstacleList, setObstacleList] = useState<string[]>([])

    useEffect(() => {
        if (setLoading) {
            setLoading(false)

            if (challengeId && challengeCache[+challengeId]) {
                const challenge = challengeCache[+challengeId]
                setLoading(true)
                setObstacleList(getObstacleFromChallengeFlowchart(challenge.flowchart))
                setChallenge(challenge)
                document.title = challenge.name + ' - Bonfire Obstacle Index'
            } else {
                axios.get(challengeSingleURL + challengeId).then(({ data }) => {
                    if (data.message) {
                        alertInfo(data)
                        navigate('/obstacles')
                    } else {
                        setLoading(data)
                        saveChallengeToCache(data)
                        setChallenge(data)
                        document.title = data.name + ' - Bonfire Obstacle Index'
                    }
                })
            }
        }
    }, [challengeId])

    const hasRelatedBeasts = challenge?.relatedBeasts && challenge?.relatedBeasts?.length > 0

    const updateFlowChart = (newValue: string) => {
        if (challenge) {
            const newChallenge = {
                ...challenge,
                flowchart: newValue
            }

            setObstacleList(getObstacleFromChallengeFlowchart(newChallenge.flowchart))

            setChallenge(newChallenge)
        }
    }

    return (
        <div className='challenge-page-shell'>
            <div className='card-background'>
                <NameHeader name={`Editing ${challenge?.name}`} />

                {challenge && (
                    <div className="editable-shell">
                        <div className="editable-info">
                            <textarea onChange={event => updateFlowChart(event.target.value)} defaultValue={challenge.flowchart} />
                            <ul>
                                {obstacleList.map((obstacle, index) => <li key={index}>{obstacle}</li>)}
                            </ul>
                        </div>
                        <div>
                            <ChallengeDisplay challenge={challenge} index={0} />
                        </div>
                    </div>
                )}
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