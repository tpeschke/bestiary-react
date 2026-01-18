import { useEffect } from 'react'
import { SetLoadingFunction } from '../../components/loading/Loading'
import './ObstacleCatalog.css'
import obstacleCatalogHook from './obstacleCatalogHook'

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
        <div>
            Hello!
        </div>
    )
}