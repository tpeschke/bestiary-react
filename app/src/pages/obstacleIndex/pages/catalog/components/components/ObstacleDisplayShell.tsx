import { useState, useEffect } from "react"
import { SetLoadingFunction } from "../../../../../../components/loading/Loading"
import ObstacleDisplay from "../../../../../../components/ObstaclesNChallenges/ObstacleDisplay"
import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"

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

    return <ObstacleDisplay obstacle={obstacle} lowerText="Click on the Button to Copy a shortcut to this Obstacle." />
}