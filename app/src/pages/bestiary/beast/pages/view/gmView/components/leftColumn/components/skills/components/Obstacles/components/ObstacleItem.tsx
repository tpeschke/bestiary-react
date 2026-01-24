import { Tooltip } from "react-tooltip"
import ObstacleDisplay from "../../../../../../../../../../../../../components/ObstaclesNChallenges/ObstacleDisplay"
import Icon from "../../../../../../../../../../../../../components/icon/Icon"
import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"

interface Props {
    obstacle: Obstacle,
}

export default function ObstacleItem({ obstacle }: Props) {
    return (
        <>
            <p data-tooltip-id={obstacle.stringid}>
                {obstacle.name}
                <Icon iconName="eye" margin='left' />
            </p>
            <Tooltip id={obstacle.stringid}>
                <ObstacleDisplay obstacle={obstacle} />
            </Tooltip>
        </>
    )
}