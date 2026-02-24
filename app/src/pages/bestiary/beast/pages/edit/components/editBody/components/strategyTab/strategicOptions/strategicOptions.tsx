import './strategicOptions.css'
import { StrategicObstacles, StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { UpdateFunction } from "../../../../../../../hooks/updateUtilities/interfaces/updateInterfaces";
import { useState } from "react";
import ComboBox from 'react-responsive-combo-box'
import axios from "axios";
import { obstacleSearchByNameURL } from "../../../../../../../../../../frontend-config";
import Icon from '../../../../../../../../../../components/icon/Icon';

interface Props {
    options: StrategicOptions,
    updateCombatInfo: UpdateFunction
}

export default function StrategicOptionsDisplay({ options }: Props) {
    const { obstacles } = options

    function addObstacle() {
        // const alteredStrategies = strategiesNLimits.map((strategy, index) => {
        //     if (index === indexToChange) {
        //         return {
        //             ...strategy,
        //             [key]: value
        //         }
        //     }
        //     return strategy
        // })

        // updateCombatInfo('strategiesNLimits', alteredStrategies)
    }

    const newObstacleTemplate = {
        id: 0,
        label: '',
        obstacleid: 0,
        obstaclename: ''
    }

    const [newObstacle, setNewObstacle] = useState<StrategicObstacles>({
        ...newObstacleTemplate
    })

    const [obstacleOptions, setObstacleOptions] = useState<{ obstactleid: number, obstaclename: string }[]>([])
    const [timeOutID, setTimeOutId] = useState<any | null>(null)

    const searchObstacleOptions = async (searchString: string) => {
        clearTimeout(timeOutID)

        if (searchString !== '') {
            setTimeOutId(setTimeout(async () => {
                const result = await axios.get(obstacleSearchByNameURL + searchString)
                setObstacleOptions(result.data)
            }, 500))
        } else {
            setObstacleOptions([])
        }
    }

    const addObstacleInfo = (option: string) => {
        const obstacle = obstacleOptions.find((fullOption) => fullOption.obstaclename === option)
        setNewObstacle({
            ...newObstacle,
            ...obstacle
        })
    }

    return (
        <>
            <h2 className="border">Strategies</h2>
            <h3>Obstacles</h3>
            <span className='add-strategic-obstacles-shell'>
                <input placeholder="Obstacle Label" onChange={event => setNewObstacle({
                    ...newObstacle,
                    label: event.target.value
                })} />
                <ComboBox defaultValue={newObstacle.label ?? ''} onSelect={option => addObstacleInfo(option)} onChange={event => searchObstacleOptions(event.target.value)} placeholder="Obstacle Name" options={obstacleOptions.map(option => option.obstaclename)} enableAutocomplete />
                <button><Icon iconName='plus' tooltip='Add Obstacle' /></button>
            </span>

            <h3>Common Allies</h3>

            <h3>Customs</h3>

            <h3>Other</h3>
        </>
    )
} 