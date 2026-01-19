import { useState, useEffect } from "react"
import { SetLoadingFunction } from "../../../../components/loading/Loading"
import ObstacleDisplay from "../../../../components/ObstaclesNChallenges/ObstacleDisplay"
import { Obstacle } from "../../../bestiary/beast/interfaces/infoInterfaces/skillInfoInterfaces"

interface DisplayShellProps {
    setLoading?: SetLoadingFunction,
    obstacleToDisplay: Promise<Obstacle | null>
}

export default function ObstacleDisplayShell({ setLoading, obstacleToDisplay }: DisplayShellProps) {
    const [obstacle, setObstacle] = useState<Obstacle | null>(null)

    useEffect(() => {
        if (setLoading) {
            obstacleToDisplay?.then(obstacle => {
                setObstacle(obstacle)
                setLoading(!!obstacle)
            })
        }
    }, [setLoading])

    return <ObstacleDisplay obstacle={obstacle} skillSkulls={0} />
}