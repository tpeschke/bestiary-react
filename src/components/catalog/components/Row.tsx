import '../Catalog.css'

import { CatalogTile } from '../catalogInterfaces'

import Tile from './tile/Tile'

interface Props {
    title?: string,
    catalogTiles: CatalogTile[]
}

export default function Row({ title, catalogTiles }: Props) {
    const displayedTitle = title ? title : catalogTiles[0].name.substring(0, 1)
    return (
        <div className='row'>
            <h1>{displayedTitle}</h1>
            <div className='tile-row'>
                {catalogTiles.map((tile: CatalogTile, index: number) => <Tile key={index} tile={tile} />)}
            </div>
        </div>
    )
}