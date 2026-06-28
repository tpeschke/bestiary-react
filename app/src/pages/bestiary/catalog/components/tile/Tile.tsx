import './Tile.css'
import ImageNotFound from '../../../../../assets/images/404.png'

import { Link } from "react-router-dom";

import { CatalogTile } from '../../catalogInterfaces'
import { beastURL, imageBase, thumbnailImageBase } from '../../../../../frontend-config'
import TileIcon from './components/TileIcon';
import { cacheMonster } from '../../../../../redux/slices/bestiary/beastCache/beastCacheSlice';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    tile: CatalogTile
}

export default function Tile({ tile }: Props) {
    const { id, thumbnail, name, canplayerview, patreon, roles } = tile

    function handleImageError({ currentTarget }: any) {
        currentTarget.onerror = null
        if (currentTarget.src === thumbnailImageBase + 'thumbnail-' + id) {
            currentTarget.src = imageBase + id
        } else {
            currentTarget.src = ImageNotFound
        }
    }

    const beastCache = useSelector((state: any) => state.beastCache.cache)
    const [timeOutID, setTimeOutID] = useState<any | null>(null)

    const dispatch = useDispatch()

    function preloadEntryInfo(beastID: number) {
        clearTimeout(timeOutID)
        setTimeOutID(setTimeout(() => {
            if (!beastCache[beastID])
                dispatch(cacheMonster({
                    id: beastID,
                    beastInfo: axios.get(beastURL + '/' + beastID).then(({ data }) => data)
                }))
        }, 100))
    }

    return (
        <Link to={`/beast/${id}`} onMouseEnter={_ => preloadEntryInfo(id)} onMouseLeave={_ => clearTimeout(timeOutID)}>
            <div className={patreon === 20 ? 'tile early-access' : 'tile'}>
                <div className='image-frame'>
                    <div className='icon-frame'>
                        <TileIcon canplayerview={canplayerview} patreon={patreon} />
                    </div>
                    <img src={thumbnailImageBase + 'thumbnail-' + id} style={{ 'objectPosition': thumbnail ?? 'top' }} onError={handleImageError}></img>
                </div>
                <span className='name-frame'>
                    <h2>{name}</h2>
                    {(roles && roles.length > 0) && <p>{roles.length} Roles</p>}
                </span>
            </div>
        </Link>
    )
}