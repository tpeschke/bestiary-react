import './ObstacleCatalog.css'
import { useEffect, useState } from 'react'
import { Obstacle, ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'
import ObstacleRow from './components/ObstacleRow'
import ObstacleTooltip from './components/ObstacleTooltip'
import { SetLoadingFunction } from '../../../../components/loading/Loading'
import obstacleCatalogHook from '../../hooks/obstacleCatalogHook'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { obstacleSingleURL } from '../../../../frontend-config'
import ObstacleDisplay from '../../../../components/ObstaclesNChallenges/ObstacleDisplay'
import { useSelector } from 'react-redux'
import { getUserPatreon, isUserLoggedOn } from '../../../../redux/slices/userSlice'
import alertInfo from '../../../../components/alert/alerts'
import LoadingIndicator from '../../../../components/loading/components/LoadingIndicator'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function ObstacleCatalog({ setLoading }: Props) {
    document.title = 'Bonfire Obstacle Index'

    const userLoggedIn = useSelector(isUserLoggedOn)
    const userPatreon = useSelector(getUserPatreon)

    const navigate = useNavigate()
    const { obstacleId } = useParams()
    const { catalogItems } = obstacleCatalogHook()

    useEffect(() => {
        if (setLoading) {
            setLoading(catalogItems.length > 0)
        }
    }, [catalogItems])

    const [searchParams] = useSearchParams();

    const [obstacleShortcut, setObstacleShortcut] = useState<Obstacle | null>(null)
    const [modifiedSkull, setModifiedSkull] = useState<null | number>(null)
    const [showDialog, setShowDialog] = useState(true)

    useEffect(() => {
        if (obstacleId) {
            setShowDialog(true)

            const skullFromParam = searchParams.get("skull")
            if (skullFromParam && !isNaN(+skullFromParam)) {
                setModifiedSkull(+skullFromParam)
            } else {
                setModifiedSkull(null)
            }

            axios.get(obstacleSingleURL + obstacleId).then(({ data }) => {
                if (data.message) {
                    alertInfo(data)
                } else {
                    setObstacleShortcut(data)
                }
            })
        }
    }, [obstacleId])

    const closeDialog = () => {
        setShowDialog(false)
        setObstacleShortcut(null)
        navigate(`/obstacles`)
    }

    return (
        <>
            <div className='card-background catalog obstacle-catalog'>
                {!userLoggedIn && <h2 className='warning'>You Need to be Logged On to View the Obstacles & Challenges on this Pages</h2>}
                {(userLoggedIn && userPatreon < 5) && <h2 className='warning'>You Need to Upgrade Your Patreon to View the Obstacles & Challenges on this Pages</h2>}

                {catalogItems.reduce((filteredArray: any[], catalogItem: ObstacleTile[], index: number) => {
                    if (catalogItem.length > 0) {
                        filteredArray.push(<ObstacleRow key={index} row={catalogItem} />)
                    }
                    return filteredArray
                }, [])}
            </div>
            {showDialog && (
                <div className='obstacle-shortcut-dialog' onClick={closeDialog}>
                    {!obstacleShortcut && <LoadingIndicator stylings={''} secondary={false} />}
                    {obstacleShortcut && <ObstacleDisplay obstacle={obstacleShortcut} modifiedSkull={modifiedSkull} />}
                </div>
            )}
        </>
    )
}