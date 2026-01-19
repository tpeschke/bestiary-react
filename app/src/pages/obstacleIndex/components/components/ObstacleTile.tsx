import { ObstacleTile } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import axios from "axios"
import Icon from "../../../../components/icon/Icon"
import { obstacleSingleURL } from "../../../../frontend-config"

interface TileProps {
    tile: ObstacleTile,
    setObstacleToDisplay: Function
}

export default function Tile({ tile, setObstacleToDisplay }: TileProps) {
    const { obstacleid, name } = tile

    const setObstacle = () => {
        setObstacleToDisplay(axios.get(obstacleSingleURL + obstacleid).then(({data}) => data))
    }

    if (obstacleid) {
        return (
            <>
                <button onMouseEnter={_ => setObstacle()} data-tooltip-id="catalog-obstacle-tooltip">
                    <Icon iconName="warning" margin='right' />
                    {name}
                </button>
            </>
        )
    }

    return (
        <button className="blue">
            <Icon iconName="chart" color="white" margin='right' />
            {name}
        </button>
    )
}