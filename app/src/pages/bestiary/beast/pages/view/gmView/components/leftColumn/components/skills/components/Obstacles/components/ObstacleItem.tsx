import { Tooltip } from "react-tooltip"
import ObstacleDisplay from "../../../../../../../../../../../../../components/ObstaclesNChallenges/ObstacleDisplay"
import Icon from "../../../../../../../../../../../../../components/icon/Icon"
import { Obstacle } from "../../../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces"

interface Props {
    obstacle: Obstacle,
    skillSkulls: number
}

export default function ObstacleItem({ obstacle, skillSkulls }: Props) {
    return (
        <>
            <p data-tooltip-id={obstacle.stringid}>
                {obstacle.name}
                <Icon iconName="eye" margin='left' />
            </p>
            <Tooltip id={obstacle.stringid}>
                <ObstacleDisplay obstacle={obstacle} skillSkulls={skillSkulls} />
            </Tooltip>
        </>
    )
}