import '../EncounterDisplay.css'
import { ObjectiveObject } from '../interfaces/EncounterInterfaces'

interface Props {
    objectives: ObjectiveObject
}

export default function ObjectivesDisplay({ objectives }: Props) {
    const { player, enemy } = objectives
    return (
        <div className='objectives-shell'>
            <div className='objective-pair'>
                <h3>Enemy Objective</h3>
                <p>{enemy}</p>
            </div>
            <div className='objective-pair'>
                <h3>Player Objective</h3>
                <p>{player}</p>
            </div>
        </div>
    )
}