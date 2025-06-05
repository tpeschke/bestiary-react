import './ObstaclesDisplay.css'

import Body from "../../../../../../../../components/UI/body/Body"
import { Obstacle } from "../../../../../../../../interfaces/infoInterfaces/skillInfoInterfaces"
import ObstacleDisplay from "./component/ObstacleDisplay"

interface Props {
    obstacles: Obstacle[]
}

export default function ObstaclesDisplay({ obstacles }: Props) {
    return (
        <div className='obstacles-display-shell'>
            <h3>Obstacles</h3>
            <Body>
                <>
                    {obstacles.map((obstacle, index) => <ObstacleDisplay key={index} obstacle={obstacle} />)}
                </>
            </Body>
        </div>
    )
}