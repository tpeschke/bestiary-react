import { useEffect, useState } from "react"
import { CatalogTile } from "../../catalogInterfaces"
import Row from "../row/Row"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { beastURL } from "../../../../../frontend-config"
import { cacheMonster } from "../../../../../redux/slices/bestiary/beastCacheSlice"

interface Props {
    userIsLoggedIn: boolean,
    favorites: CatalogTile[]
}

export default function FavoritesDisplay({ userIsLoggedIn, favorites }: Props) {
    if (!userIsLoggedIn) {
        return <></>
    }

    const beastCache = useSelector((state: any) => state.beastCache.cache)
    const [timeOutID, setTimeOutID] = useState<any | null>(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (favorites.length > 0) {
            favorites.forEach(({ id }) => {
                preloadEntryInfo(id)
            })
        }
    }, [favorites])

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
        <>
            {favorites.length > 0 ? (
                <Row catalogTiles={favorites} title={'Favorites'} />
            ) : (
                <div className='row'>
                    <h1>Favorites</h1>
                    <div className='tile-row'>
                        <p className='warning paragraph-padding'>You have no Favorites (yet)</p>
                    </div>
                </div>
            )}
        </>
    )
}