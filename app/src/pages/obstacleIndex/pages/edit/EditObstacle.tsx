import './EditObstacle.css'
import { useEffect, useState } from "react"
import { SetLoadingFunction } from "../../../../components/loading/Loading"
import { useNavigate, useParams } from "react-router-dom"
import { obstacleSingleURL } from "../../../../frontend-config"
import axios from "axios"
import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import NameHeader from "../../../bestiary/beast/components/UI/nameHeader/nameHeader"
import SkullSelection from "../../../bestiary/beast/pages/edit/components/editBody/components/SkullSelection"
import { showPendingAlert } from '../../../../components/alert/alerts'

interface Props {
    setLoading?: SetLoadingFunction
}

export default function EditObstacle({ setLoading }: Props) {

    const navigate = useNavigate()
    const { obstacleId } = useParams()

    const [obstacle, setObstacle] = useState<Obstacle | null>(null)

    useEffect(() => {
        if (setLoading) {
            setLoading(false)
            axios.get(obstacleSingleURL + obstacleId).then(({ data }) => {
                setObstacle(data)
                document.title = `Edit "${data.name}" - Bonfire Obstacle Index`
                setLoading(true)
            })
        }
    }, [obstacleId])

    const updateObstacleValue = (key: string, value: string | number) => {
        if (obstacle) {
            const newObstacle: Obstacle = {
                ...obstacle,
                [key]: value
            }

            setObstacle(newObstacle)
        }
    }

    const saveObstacle = () => {
        if (obstacle) {
            showPendingAlert(async () => {
                const { data } = await axios.post(obstacleSingleURL + '/save', obstacle)

                navigate(`/obstacles`)
                if (data.obstacleId) {
                    return { data: { color: 'green', type: 'message', message: 'Obstacle Saved' } }
                }

                return { data }
            })
        }
    }

    return (
        <>
            {obstacle && (
                <div className='card-background obstacle-edit'>
                    <NameHeader name={obstacle.name} />
                    <div className="edit-obstacle-body">
                        <div>
                            <h2>Skull:</h2>
                            <SkullSelection currentSkullValue={obstacle.skull} updateSkull={updateObstacleValue} keyValue="skull" />
                        </div>
                        <div>
                            <h2>Difficulty: </h2>
                            <textarea value={obstacle.difficulty} onChange={event => updateObstacleValue('difficulty', event.target.value)} />
                        </div>
                    </div>
                    <button className='orange' onClick={saveObstacle}>Save</button>
                </div>
            )}
        </>
    )
}