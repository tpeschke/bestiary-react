import './Tile.css'

import { Link } from "react-router-dom";

import { CatalogTile } from '../catalogInterfaces'
import { imageBase } from '../../../frontend-config'

interface Props {
    tile: CatalogTile
}

export default function Tile({ tile }: Props) {
    const { id, thumbnail, name } = tile

    return (
        <Link to={`/beast/${id}`}>
            <div className='tile'>
                <div className='image-frame'>
                    <img src={imageBase + id} style={{ 'objectPosition': thumbnail ? thumbnail : 'top' }}></img>
                </div>
                <h2>{name}</h2>
            </div>
        </Link>
    )
}