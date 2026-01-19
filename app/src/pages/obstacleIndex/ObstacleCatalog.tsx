import { useEffect, useState } from 'react'
import Loading, { SetLoadingFunction } from '../../components/loading/Loading'
import './ObstacleCatalog.css'
import obstacleCatalogHook from './hooks/obstacleCatalogHook'
import { ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'
import ObstacleRow from './components/ObstacleRow'
import { Tooltip } from 'react-tooltip'
import { Obstacle } from '../bestiary/beast/interfaces/infoInterfaces/skillInfoInterfaces'
import ObstacleDisplay from '../../components/ObstaclesNChallenges/ObstacleDisplay'
import ObstacleTooltip from './components/ObstacleTooltip'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function ObstacleCatalog({ setLoading }: Props) {
    document.title = 'Bonfire Obstacle Index'

    const { catalogItems } = obstacleCatalogHook()

    useEffect(() => {
        if (setLoading) {
            setLoading(catalogItems.length > 0)
        }
    }, [catalogItems])

    const [obstacleToDisplay, setObstacleToDisplay] = useState<Promise<Obstacle | null>>(new Promise(resolve => resolve(null)))

    return (
        <div className='card-background catalog'>
            {catalogItems.reduce((filteredArray: any[], catalogItem: ObstacleTile[], index: number) => {
                if (catalogItem.length > 0) {
                    filteredArray.push(<ObstacleRow key={index} row={catalogItem} setObstacleToDisplay={setObstacleToDisplay} />)
                }
                return filteredArray
            }, [])}

            <ObstacleTooltip obstacleToDisplay={obstacleToDisplay}/>
        </div>
    )
}