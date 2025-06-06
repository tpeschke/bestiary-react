import { Tooltip } from "react-tooltip"
import Icon from "../../../../../../../../../../../components/icon/Icon"
import { Obstacle } from "../../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces"
import ObstacleDisplay from "./ObstacleDisplay"

interface Props {
    obstacle: Obstacle
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