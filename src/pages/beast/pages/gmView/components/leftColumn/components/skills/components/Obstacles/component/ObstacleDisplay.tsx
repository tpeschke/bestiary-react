import Icon from "../../../../../../../../../../../components/icon/Icon"
import { Obstacle } from "../../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces"

interface Props {
    obstacle: Obstacle
}

export default function ObstacleDisplay({ obstacle }: Props) {
    const { name } = obstacle
    return (
        <p>
            {name} 
            <Icon iconName="link" tooltip="Click to Reveal Obstacle" margin='left' />
        </p>
    )
}