import Body from '../../../../../../../../../components/UI/body/Body'
import { Obstacle } from '../../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces'
import './ObstaclesDisplay.css'

import ObstacleItem from "./components/ObstacleItem"

interface Props {
    obstacles: Obstacle[],
    skillSkulls: number
}

export default function ObstaclesDisplay({ obstacles, skillSkulls }: Props) {
    return (
        <div className='obstacles-display-shell'>
            <h3>Obstacles</h3>
            <Body>
                <>
                    {obstacles.map((obstacle, index) => <ObstacleItem key={index} obstacle={obstacle} skillSkulls={skillSkulls} />)}
                </>
            </Body>
        </div>
    )
}