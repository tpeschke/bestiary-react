import './Tile.css'
import ImageNotFound from '../../../../../assets/images/404.png'

import { Link } from "react-router-dom";

import { CatalogTile } from '../../catalogInterfaces'
import { beastURL, imageBase } from '../../../../../frontend-config'
import TileIcon from './components/TileIcon';
import { cacheMonster } from '../../../../../redux/slices/bestiary/beastCacheSlice';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    tile: CatalogTile
}

export default function Tile({ tile }: Props) {
    const { id, thumbnail, name, canplayerview, patreon, notupdating } = tile

    function handleImageError({ currentTarget }: any) {
        currentTarget.onerror = null
        currentTarget.src = ImageNotFound
    }

    const beastCache = useSelector((state: any) => state.beastCache.cache)
    const [timeOutID, setTimeOutID] = useState<any | null>(null)

    const dispatch = useDispatch()

    function preloadCharacterInfo(beastID: number) {
        clearTimeout(timeOutID)
        setTimeOutID(setTimeout(() => {
            if (!beastCache[beastID])
                dispatch(cacheMonster({
                    id: beastID,
                    beastInfo: axios.get(beastURL + '/' + beastID).then(({data}) => data)
                }))
        }, 100))
    }

    const tooltip = notupdating ? "This entry isn't being updated currently. If you need it, let Peschke know and he'll update it for you. \nYou can still view it." : null
    return (
        <Link to={`/beast/${id}`} onMouseEnter={_ => preloadCharacterInfo(id)} onMouseLeave={_ => clearTimeout(timeOutID)}>
            <div className={notupdating ? 'tile not-updating' : 'tile'} data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>
                <div className='image-frame'>
                    <div className='icon-frame'>
                        <TileIcon canplayerview={canplayerview} patreon={patreon} />
                    </div>
                    <img src={imageBase + id} style={{ 'objectPosition': thumbnail ?? 'top' }} onError={handleImageError}></img>
                </div>
                <span className='name-frame'>
                    <h2>{name}</h2>
                </span>
            </div>
        </Link>
    )
}