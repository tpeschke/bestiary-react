import './ObstacleCatalog.css'
import { useEffect, useState } from 'react'
import { Obstacle, ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'
import ObstacleRow from './components/ObstacleRow'
import ObstacleTooltip from './components/ObstacleTooltip'
import { SetLoadingFunction } from '../../../../components/loading/Loading'
import obstacleCatalogHook from '../../hooks/obstacleCatalogHook'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { obstacleSingleURL } from '../../../../frontend-config'
import ObstacleDisplay from '../../../../components/ObstaclesNChallenges/ObstacleDisplay'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function ObstacleCatalog({ setLoading }: Props) {
    document.title = 'Bonfire Obstacle Index'

    const navigate = useNavigate()
    const { obstacleId } = useParams()
    const { catalogItems } = obstacleCatalogHook()

    useEffect(() => {
        if (setLoading) {
            setLoading(catalogItems.length > 0)
        }
    }, [catalogItems])

    const [obstacleShortcut, setObstacleShortcut] = useState<Obstacle | null>(null)
    const [showDialog, setShowDialog] = useState(true)

    useEffect(() => {
        if (obstacleId) {
            axios.get(obstacleSingleURL + obstacleId).then(({ data }) => setObstacleShortcut(data))
        }
    }, [obstacleId])

    const closeDialog = () => {
        setShowDialog(false)
        navigate(`/obstacles`)
    }

    const [obstacleToDisplay, setObstacleToDisplay] = useState<Promise<Obstacle | null>>(new Promise(resolve => resolve(null)))

    return (
        <>
            <div className='card-background catalog'>
                {catalogItems.reduce((filteredArray: any[], catalogItem: ObstacleTile[], index: number) => {
                    if (catalogItem.length > 0) {
                        filteredArray.push(<ObstacleRow key={index} row={catalogItem} setObstacleToDisplay={setObstacleToDisplay} />)
                    }
                    return filteredArray
                }, [])}

                <ObstacleTooltip obstacleToDisplay={obstacleToDisplay} />
            </div>
            {obstacleShortcut && showDialog && (
                <div className='obstacle-shortcut-dialog' onClick={closeDialog}>
                    <ObstacleDisplay obstacle={obstacleShortcut} />
                </div>
            )}
        </>
    )
}