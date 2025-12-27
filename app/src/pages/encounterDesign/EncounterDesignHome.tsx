import './EncounterDesignHome.css'

import confrontationImage from '../../assets/images/encounters/confrontation.jpg'
import combatImage from '../../assets/images/encounters/combat.jpg'
import challengeImage from '../../assets/images/encounters/challenge.jpg'
import { Link } from 'react-router-dom'

export default function EncounterDesignHome() {
    return (
        <div className='encounter-design-home'>
            <div className='card-background'>
                <Link to="/encounters/confrontations">
                    <img src={confrontationImage} />
                    <h1>Confrontations</h1>
                </Link>
            </div>
            <div className='card-background'>
                <Link to="/encounters/combats">
                    <img src={combatImage} />
                    <h1>Combats</h1>
                </Link>
            </div>
            <div className='card-background'>
                <Link to="/encounters/challenges">
                    <img src={challengeImage} />
                    <h1>Challenges</h1>
                </Link>
            </div>
        </div>
    )
}