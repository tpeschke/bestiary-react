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
import Icon from '../../../../../../../../../components/icon/Icon';

interface Props {
    options: StrategicOptions,
    skillSkulls: number,
    baseConvictionRank: number
}

export default function StrategicOptionsDisplay({ options, skillSkulls, baseConvictionRank }: Props) {
    const { obstacles, customs } = options

    const [obstacleCache, setObstacleCache] = useState<{ [key: string]: Obstacle }>({})
    const [obstacleInTooltip, setObstacleInTooltip] = useState<Obstacle | null>(null);

    async function showPopup(obstacle: StrategicObstacles) {
        setObstacleInTooltip(null)

        const { obstacleid } = obstacle

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
                    return (
                        <>
                            <button onMouseOver={_ => showPopup(obstacle)} onMouseOut={_ => setObstacleInTooltip(null)} data-tooltip-id={`${obstacle.obstacleid}-strategic-obstacle-tooltip`} key={obstacle.id}>{obstacle.label ? obstacle.label : obstacle.obstaclename}</button>
                            <Tooltip id={`${obstacle.obstacleid}-strategic-obstacle-tooltip`}>
                                {obstacleInTooltip ? <ObstacleDisplay obstacle={obstacleInTooltip} modifiedSkull={skillSkulls} hideCustomizations={true} hideVariants={true} /> : <LoadingIndicator stylings='' secondary={true} />}
                            </Tooltip>
                        </>
                    )
                })}
            </div>
            
            <span>
                <h3>Customs <Icon iconName='info' tooltip='Customs are a way to inflict Emotions on an enemy group (via the Atk Emotion) or themselves (via the Def Emotion)' /></h3>
                <p>Rank {baseConvictionRank}</p>
            </span>
            <div>
                {customs.map(({ id, label, attack, defense }) => {
                    return (
                        <button key={id} data-tooltip-id="my-tooltip" data-tooltip-content={`Atk: ${attack}\nDef: ${defense}`}>{label}</button>
                    )
                })}
            </div>
        </div>
    )
}