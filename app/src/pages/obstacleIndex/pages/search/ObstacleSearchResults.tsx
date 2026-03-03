import { useEffect, useState } from 'react'
import { Obstacle, ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'
import { SetLoadingFunction } from '../../../../components/loading/Loading'
import ObstacleDisplay from '../../../../components/ObstaclesNChallenges/ObstacleDisplay'
import { useSelector } from 'react-redux'
import { getUserPatreon, isUserLoggedOn } from '../../../../redux/slices/userSlice'
import LoadingIndicator from '../../../../components/loading/components/LoadingIndicator'
import ObstacleSearchHooks from './ObstacleSearchHook'
import ResultTile from './resultTile/resultTile'
import obstacleCatalogHook from '../../hooks/obstacleCatalogHook'
import axios from 'axios'
import alertInfo from '../../../../components/alert/alerts'
import { obstacleSingleURL } from '../../../../frontend-config'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function ObstacleSearchResults({ setLoading }: Props) {
    document.title = 'Search Results - Bonfire Obstacle Index'

    const userLoggedIn = useSelector(isUserLoggedOn)
    const userPatreon = useSelector(getUserPatreon)

    const searchResults = ObstacleSearchHooks()
    const { saveToCache, obstacleCache } = obstacleCatalogHook()

    useEffect(() => {
        if (setLoading) {
            setLoading(!!searchResults)
        }
    }, [searchResults])

    const [obstacleShortcut, setObstacleShortcut] = useState<Obstacle | null>(null)
    const [showDialog, setShowDialog] = useState(false)

    const showObstacle = (obstacleID: number) => {
        setShowDialog(true)

        if (obstacleCache[obstacleID]) {
            setObstacleShortcut(obstacleCache[obstacleID])
        } else {
            axios.get(obstacleSingleURL + obstacleID).then(({ data }) => {
                if (data.message) {
                    alertInfo(data)
                } else {
                    saveToCache(data)
                    setObstacleShortcut(data)
                }
            })
        }
    }

    const closeDialog = () => {
        setShowDialog(false)
        setObstacleShortcut(null)
    }

    return (
        <>
            <div className='obstacle-catalog obstacle-search-results'>
                <div className='catalog card-background'>
                    {!userLoggedIn && <h2 className='warning'>You Need to be Logged On to View the Obstacles & Challenges on this Pages</h2>}
                    {(userLoggedIn && userPatreon < 5) && <h2 className='warning'>You Need to Upgrade Your Patreon to View the Obstacles & Challenges on this Pages</h2>}

                    <div className='row'>
                        <h1>Results</h1>
                        <div className='tile-row obstacle-tile-row'>
                            {searchResults && searchResults.length > 0 ? searchResults.map((tile: ObstacleTile, index: number) => <ResultTile key={index} tile={tile} showObstacle={showObstacle} />) : (
                                <p className='warning'>No results returned</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {showDialog && (
                <div className='obstacle-shortcut-dialog' onClick={closeDialog}>
                    {!obstacleShortcut && <LoadingIndicator stylings={''} secondary={false} />}
                    {obstacleShortcut && <ObstacleDisplay obstacle={obstacleShortcut} />}
                </div>
            )}
        </>
    )
}