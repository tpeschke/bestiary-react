import '../Catalog.css'

import Icon from '../../../components/icon/Icon'
import { CatalogTile } from '../catalogInterfaces'
import Tile from './tile/Tile'

interface Props {
    title?: string,
    catalogTiles: CatalogTile[]
}

export default function Row({ title, catalogTiles }: Props) {
    const displayedTitle = title ?? catalogTiles[0].name.substring(0, 1)
    return (
        <div className='row'>
            <h1>{displayedTitle} {displayedTitle === 'Templates' && <Icon iconName='info' tooltip="A template is the purist expression of a monster - a platonic version, if you will. It is, in fact, so pure that they do not exist in the game world. Templates monsters are baselines that you can use to improve monsters that are not in the Bestiary on the fly." />}</h1>
            <div className='tile-row'>
                {catalogTiles.map((tile: CatalogTile, index: number) => <Tile key={index} tile={tile} />)}
            </div>
        </div>
    )
}