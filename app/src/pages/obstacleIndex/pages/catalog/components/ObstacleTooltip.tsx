import { Tooltip } from "react-tooltip"
import Loading from "../../../../../components/loading/Loading"
import ObstacleDisplayShell from "./components/ObstacleDisplayShell"
import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"

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