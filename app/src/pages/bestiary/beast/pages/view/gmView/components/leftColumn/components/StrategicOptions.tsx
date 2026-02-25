import { Obstacle } from '@bestiary/common/interfaces/obstacles/obstacleCatalog';
import { useState } from 'react';
import './strategicOptions.css'
import { StrategicObstacles, StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Tooltip } from 'react-tooltip';
import ObstacleDisplay from '../../../../../../../../../components/ObstaclesNChallenges/ObstacleDisplay';
import axios from 'axios';
import alertInfo from '../../../../../../../../../components/alert/alerts';
import { obstacleSingleURL } from '../../../../../../../../../frontend-config';
import LoadingIndicator from '../../../../../../../../../components/loading/components/LoadingIndicator';

interface Props {
    options: StrategicOptions,
    skillSkulls: number
}

export default function StrategicOptionsDisplay({ options, skillSkulls }: Props) {
    const { obstacles } = options

    const [obstacleCache, setObstacleCache] = useState<{ [key: string]: Obstacle }>({})
    const [obstacleInTooltip, setObstacleInTooltip] = useState<Obstacle | null>(null);

    async function showPopup(obstacle: StrategicObstacles) {
        const { obstacleid } = obstacle
        setObstacleInTooltip(null)

        if (obstacleCache[obstacleid]) {
            setObstacleInTooltip(obstacleCache[obstacleid])
        } else {
            const { data }: any = await axios.get(obstacleSingleURL + obstacleid)

            if (data.message) {
                alertInfo(data)
            } else {
                setObstacleInTooltip(data)
                setObstacleCache({
                    ...obstacleCache,
                    [data.id]: data
                })
            }
        }
    }

    return (
        <div className='strategic-options-component'>
            <h3>Obstacles</h3>
            <div>
                {obstacles.map(obstacle => {
                    return <button onMouseOver={_ => showPopup(obstacle)} onMouseLeave={_ => setObstacleInTooltip(null)} data-tooltip-id='strategic-obstacle-tooltip' key={obstacle.id}>{obstacle.label ? obstacle.label : obstacle.obstaclename}</button>
                })}
                <Tooltip id={`strategic-obstacle-tooltip`}>
                    {obstacleInTooltip ? <ObstacleDisplay obstacle={obstacleInTooltip} modifiedSkull={skillSkulls} hideCustomizations={true} hideVariants={true} hideLinks={true} /> : <LoadingIndicator stylings='' secondary={true} />}
                </Tooltip>
            </div>
        </div>
    )
}