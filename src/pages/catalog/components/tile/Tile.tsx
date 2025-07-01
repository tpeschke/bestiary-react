import './Tile.css'
import ImageNotFound from '../../../../assets/images/404.png'

import { Link } from "react-router-dom";

import { CatalogTile } from '../../catalogInterfaces'
import { imageBase } from '../../../../frontend-config'
import TileIcon from './components/TileIcon';

interface Props {
    tile: CatalogTile
}

export default function Tile({ tile }: Props) {
    const { id, thumbnail, name, canplayerview, patreon, notupdating } = tile

    function handleImageError({currentTarget}: any) {
        currentTarget.onerror = null
        currentTarget.src = ImageNotFound
    }

    const tooltip = notupdating ? "This entry isn't being updated currently. If you need it, let Peschke know and he'll update it for you. \nYou can still view it." : null
    return (
        <Link to={`/beast/${id}`}>
            <div className={notupdating ? 'tile not-updating' : 'tile'} data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>
                <div className='image-frame'>
                    <img src={imageBase + id} style={{ 'objectPosition': thumbnail ?? 'top' }} onError={handleImageError}></img>
                </div>
                <span className='name-frame'>
                    <TileIcon canplayerview={canplayerview} patreon={patreon} />
                    <h2>{name}</h2>
                </span>
            </div>
        </Link>
    )
}