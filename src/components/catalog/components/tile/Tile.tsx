import './Tile.css'

import { Link } from "react-router-dom";

import { CatalogTile } from '../../catalogInterfaces'
import { imageBase } from '../../../../frontend-config'
import TileIcon from './components/TileIcon';

interface Props {
    tile: CatalogTile
}

export default function Tile({ tile }: Props) {
    const { id, thumbnail, name, canplayerview, patreon, notupdating } = tile

    return (
        <Link to={`/beast/${id}`}>
            <div className={notupdating ? 'tile not-updating' : 'tile'}>
                <div className='image-frame'>
                    <img src={imageBase + id} style={{ 'objectPosition': thumbnail ? thumbnail : 'top' }}></img>
                </div>
                <span className='name-frame'>
                    <TileIcon canplayerview={canplayerview} patreon={patreon} />
                    <h2>{name}</h2>
                </span>
            </div>
        </Link>
    )
}