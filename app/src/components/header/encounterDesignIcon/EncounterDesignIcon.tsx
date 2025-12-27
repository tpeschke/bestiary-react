import './EncounterDesignIcon.css'
import { Link } from 'react-router-dom'
import Icon from '../../icon/Icon'

export default function EncounterDesignIcon() {
    return (
        <div className='encounter-design-icon'>
            <Link to="/encounters">
                <button className='transparent-white'>
                    <Icon iconName='brush-hammer' color='white' tooltip='Encounter Design Guidelines' iconSize='h2' />
                </button>
            </Link>

            <ul className='encounter-options-dropdown'>
                <Link to="/encounters/confrontations">
                    <li><Icon iconName='theater-masks' margin='right' /> Confrontations</li>
                </Link>
                <Link to="/encounters/combats">
                    <li><Icon iconName='crossed-swords' margin='right' /> Combats</li>
                </Link>
                <Link to="/encounters/challenges">
                    <li><Icon iconName='brains' margin='right' /> Challenges</li>
                </Link>
            </ul>
        </div>
    )
}