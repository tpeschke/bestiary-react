import { Tooltip } from "react-tooltip"
import Loading from "../../../../../components/loading/Loading"
import { Obstacle } from "../../../../bestiary/beast/interfaces/infoInterfaces/skillInfoInterfaces"
import ObstacleDisplayShell from "./components/ObstacleDisplayShell"

interface Props {
    obstacleToDisplay: Promise<Obstacle | null>
}

export default function ObstacleTooltip({ obstacleToDisplay }: Props) {
    return (
        <Tooltip id="catalog-obstacle-tooltip">
            <Loading secondary={true}>
                <ObstacleDisplayShell obstacleToDisplay={obstacleToDisplay} />
            </Loading>
        </Tooltip>
    )
}