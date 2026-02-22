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

    const updateObstacleComplications = (index: number, value: string) => {
        if (obstacle) {
            const newObstacle: Obstacle = {
                ...obstacle,
                complications: obstacle.complications?.map(complication => {
                    if (index === complication.index) {
                        return {
                            ...complication,
                            body: value
                        }
                    }
                    return complication
                })
            }

            setObstacle(newObstacle)
        }
    }

    const addObstacleComplications = (event: any) => {
        const { value } = event.target

        if (value !== "" && obstacle && obstacle.complications) {
            const newObstacle: Obstacle = {
                ...obstacle,
                complications: [
                    ...obstacle.complications,
                    {
                        name: `${obstacle.complications.length + 1}`,
                        body: value,
                        index: obstacle.complications.length,
                        stringid: '',
                        id: 0
                    }
                ]
            }

            setObstacle(newObstacle)
        } else if (value !== "" && obstacle) {
            const newObstacle: Obstacle = {
                ...obstacle,
                complications: [{
                    name: `1`,
                    body: value,
                    index: 0,
                    stringid: '',
                    id: 0
                }]
            }

            setObstacle(newObstacle)
        }

        event.target.value = null
    }

    const updateObstacleSkullVariant = (index: number, key: string, value: string) => {
        if (obstacle) {
            const newObstacle: Obstacle = {
                ...obstacle,
                skullVariants: obstacle.skullVariants?.map((variant, variantIndex) => {
                    if (index === variantIndex) {
                        return {
                            ...variant,
                            [key]: key === "skullValue" ? +value : value
                        }
                    }
                    return variant
                })
            }

            setObstacle(newObstacle)
        }
    }

    const addObstacleSkullVariant = (key: string, event: any) => {
        const { value } = event.target

        if (value !== "" && obstacle && obstacle.skullVariants) {
            const newObstacle: Obstacle = {
                ...obstacle,
                skullVariants: [
                    ...obstacle.skullVariants,
                    {
                        body: "",
                        skullValue: 0,
                        stringid: '',
                        id: 0,
                        [key]: key === "skullValue" ? +value : value
                    }
                ]
            }

            setObstacle(newObstacle)
        } else if (value !== "" && obstacle) {
            const newObstacle: Obstacle = {
                ...obstacle,
                skullVariants: [{
                    body: "",
                    skullValue: 0,
                    stringid: '',
                    id: 0,
                    [key]: key === "skullValue" ? +value : value
                }]
            }

            setObstacle(newObstacle)
        }

        event.target.value = null
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
                            <div>
                                <h2>Name</h2>
                                <input value={obstacle.name} onChange={event => updateObstacleValue('name', event.target.value)} />
                            </div>
                            <div>
                                <h2>Skull</h2>
                                <SkullSelection currentSkullValue={obstacle.skull} updateSkull={updateObstacleValue} keyValue="skull" />
                            </div>
                            <div>
                                <h2>Difficulty</h2>
                                <textarea value={obstacle.difficulty} onChange={event => updateObstacleValue('difficulty', event.target.value)} />
                            </div>
                            <div>
                                <h2>Time</h2>
                                <input value={obstacle.time} onChange={event => updateObstacleValue('time', event.target.value)} />
                            </div>
                            {/* Pair Two */}
                            <div>
                                <h2>Ease</h2>
                                <input value={obstacle.threshold} onChange={event => updateObstacleValue('threshold', event.target.value)} />
                            </div>
                            <h2>Complications</h2>
                            <div className='obstacle-table'>
                                {obstacle.complications?.map(({ index, body }) => {
                                    return (
                                        <div key={index}>
                                            <p>{index + 1}</p>
                                            <input onChange={event => updateObstacleComplications(index, event.target.value)} value={body} />
                                        </div>
                                    )
                                })}
                                <div>
                                    <input onBlur={event => addObstacleComplications(event)} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2>Skull Variants</h2>
                            <div className='obstacle-table skull-variants'>
                                {obstacle.skullVariants?.map(({ id, skullValue, body }, index) => {
                                    return (
                                        <div key={index}>
                                            <input onChange={event => updateObstacleSkullVariant(index, "skullValue", event.target.value)} value={skullValue} type='number' />
                                            <input onChange={event => updateObstacleSkullVariant(index, "body", event.target.value)} value={body} />
                                        </div>
                                    )
                                })}
                                <div>
                                    <input onBlur={event => addObstacleSkullVariant("skullValue", event)} placeholder='Skull' />
                                    <input onBlur={event => addObstacleSkullVariant("body", event)} placeholder='Variants' />
                                </div>
                            </div>
                            <div>
                                <h2>Failure</h2>
                                <input value={obstacle.failure} onChange={event => updateObstacleValue('failure', event.target.value)} />
                            </div>
                            <div>
                                <h2>Success</h2>
                                <input value={obstacle.success} onChange={event => updateObstacleValue('success', event.target.value)} />
                            </div>
                            {/* Pair Two Table */}
                            <div>
                                <h2>Notes</h2>
                                <textarea value={obstacle.notes} onChange={event => updateObstacleValue('notes', event.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button className='orange' onClick={saveObstacle}>Save</button>
                </div>
            )}
        </>
    )
}