import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../../../components/loading/Loading"
import { useParams } from "react-router-dom"
import { obstacleSingleURL } from "../../../../frontend-config"
import axios from "axios"
import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import NameHeader from "../../../bestiary/beast/components/UI/nameHeader/nameHeader"

interface Props {
    setLoading?: SetLoadingFunction
}

export default function EditObstacle({ setLoading }: Props) {
    document.title = 'Edit Obstacle - Bonfire Obstacle Index'

    const { obstacleId } = useParams()

    const [obstacle, setObstacle] = useState<Obstacle | null>(null)

    useEffect(() => {
        if (setLoading) {
            setLoading(false)
            axios.get(obstacleSingleURL + obstacleId).then(({ data }) => {
                setObstacle(data)
                setLoading(true)
            })
        }
    }, [obstacleId])

    console.log(obstacle)
    const example = {
        "id": 104,
        "skull": 0,
        "difficulty": "Universal",
        "name": "Alerting the Spider",
        "complicationsingle": null,
        "failure": "The spider is alerted and begins to hunt the party. Start the Spider Tracking Obstacle.",
        "information": null,
        "notes": "<p>Note when the players fail this Obstacle with a small description.</p>",
        "success": null,
        "threshold": "6",
        "time": null,
        "type": "obstacle",
        "stringid": "PCbBqrRcKtodRZ3UaWK6u9IElDik7BimHlOipbfqEP7QZe1BBx",
        "complications": [],
        "pairsOne": [],
        "pairsTwo": []
    }

    return (
        <>
            {obstacle && (
                <div className='card-background'>
                    <NameHeader name={obstacle.name} />
                    {/* Skull */}
                    {/* Difficulty */}
                </div>
            )}
        </>
    )
}