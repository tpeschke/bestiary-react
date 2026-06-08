import { Obstacle } from '@bestiary/common/interfaces/obstacles/obstacleCatalog';
import { Fragment, useState } from 'react';
import './strategicOptions.css'
import { StrategicObstacles, StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Tooltip } from 'react-tooltip';
import ObstacleDisplay from '../../../../../../../../../../components/ObstaclesNChallenges/ObstacleDisplay';
import axios from 'axios';
import alertInfo from '../../../../../../../../../../components/alert/alerts';
import { obstacleSingleURL } from '../../../../../../../../../../frontend-config';
import LoadingIndicator from '../../../../../../../../../../components/loading/components/LoadingIndicator';
import Icon from '../../../../../../../../../../components/icon/Icon';
import obstacleCatalogHook from '../../../../../../../../../obstacleIndex/hooks/obstacleCatalogHook';
import { getSystemPreference } from '../../../../../../../../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { BONFIRE } from '@bestiary/common/utilities/get/getSystemString';
import { Link } from 'react-router-dom';

interface Props {
    options: StrategicOptions,
    skillSkulls: number,
    baseDescriptionRank: number
}

export default function StrategicOptionsDisplay({ options, skillSkulls, baseDescriptionRank }: Props) {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined

    const { obstacles, customs, other } = options

    const { obstacleCache, saveToCache } = obstacleCatalogHook()

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
                saveToCache(data)
            }
        }
    }

    return (
        <div className='strategic-options-component'>
            {obstacles.length > 0 && (
                <>
                    <h3>Obstacles</h3>
                    <div>
                        {obstacles.map(obstacle => {
                            if (!obstacle.obstaclename) return <p key={obstacle.id}>{obstacle.label}</p>

                            return (
                                <Fragment key={obstacle.obstacleid}>
                                    <Link to={`/obstacles/${obstacle.obstacleid}`} target='_blank'>
                                        <button onMouseOver={_ => showPopup(obstacle)} onMouseOut={_ => setObstacleInTooltip(null)} data-tooltip-id={`${obstacle.obstacleid}-strategic-obstacle-tooltip`}>{obstacle.label ? obstacle.label : obstacle.obstaclename}</button>
                                    </Link>
                                    <Tooltip id={`${obstacle.obstacleid}-strategic-obstacle-tooltip`}>
                                        {obstacleInTooltip ? <ObstacleDisplay lowerText='Click the button to be taken to the Obstacle' obstacle={obstacleInTooltip} modifiedSkull={skillSkulls} hideCustomizations={true} hideVariants={true} /> : <LoadingIndicator stylings='' secondary={true} />}
                                    </Tooltip>
                                </Fragment>
                            )
                        })}
                    </div>
                </>
            )}

            {customs.length > 0 && (
                <>
                    <span>
                        <h3>Customs <Icon iconName='info' tooltip='Customs are a way to inflict Emotions on an enemy group (via the Atk Emotion) or themselves (via the Def Emotion)' /></h3>
                        {systemPreference === BONFIRE && <p>Rank {baseDescriptionRank}</p>}
                    </span>
                    <div>
                        {customs.map(({ id, label, attack, defense }) => {
                            if (!attack && !defense) return <p key={id}>{label}</p>
                            return (
                                <button key={id} data-tooltip-id="my-tooltip" data-tooltip-content={`${attack && `Atk: ${attack}`}${(attack && defense) && '\n'}${defense && `Def: ${defense}`}`}>{label}</button>
                            )
                        })}
                    </div>
                </>
            )}

            {other.length > 0 && (
                <>
                    <h3>Other Options</h3>
                    <div>
                        {other.map(({ id, label, tooltip }, index) => {
                            if (tooltip) return <button key={id} data-tooltip-id="my-tooltip" data-tooltip-content={tooltip}>{label}</button>

                            return <p key={id}>{label}</p>
                        })}
                    </div>
                </>
            )}
        </div>
    )
}