import { ObstacleTile } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import Icon from "../../../components/icon/Icon";

interface Props {
    row: ObstacleTile[]
}

export default function ObstacleRow({ row }: Props) {
    const displayedTitle = row[0].name.substring(0, 1)

    return (
        <div className='row'>
            <h1>{displayedTitle}</h1>
            <div className='tile-row obstacle-tile-row'>
                {row.map((tile: ObstacleTile, index: number) => <Tile key={index} tile={tile} />)}
            </div>
        </div>
    )
}

interface TileProps {
    tile: ObstacleTile
}

function Tile({ tile }: TileProps) {
    const { obstacleid, name } = tile
    return (
        <button className={obstacleid ? "" : "blue"}>
            <Icon iconName={obstacleid ? "warning" : "chart"} color={obstacleid ? null : "white"} margin='right' />
            {name}
        </button>
    )
}