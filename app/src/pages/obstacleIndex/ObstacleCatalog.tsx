import { useEffect } from 'react'
import { SetLoadingFunction } from '../../components/loading/Loading'
import './ObstacleCatalog.css'
import obstacleCatalogHook from './hooks/obstacleCatalogHook'
import { ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'
import ObstacleRow from './components/ObstacleRow'

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

    return (
        <div className='card-background catalog'>
            {catalogItems.reduce((filteredArray: any[], catalogItem: ObstacleTile[], index: number) => {
                if (catalogItem.length > 0) {
                    filteredArray.push(<ObstacleRow key={index} row={catalogItem} />)
                }
                return filteredArray
            }, [])}
        </div>
    )
}