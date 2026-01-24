import { Obstacle } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'
import Body from '../../../../../../../../../components/UI/body/Body'
import './ObstaclesDisplay.css'

import ObstacleItem from "./components/ObstacleItem"

interface Props {
    obstacles: Obstacle[]
}

export default function ObstaclesDisplay({ obstacles }: Props) {
    return (
        <div className='obstacles-display-shell'>
            <h3>Obstacles</h3>
            <Body>
                <>
                    {obstacles.map((obstacle, index) => <ObstacleItem key={index} obstacle={obstacle} />)}
                </>
            </Body>
        </div>
    )
}