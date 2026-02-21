import { ObstacleTile } from "@bestiary/common/interfaces/obstacles/obstacleCatalog";
import Tile from "./components/ObstacleTile";

interface Props {
    row: ObstacleTile[],
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