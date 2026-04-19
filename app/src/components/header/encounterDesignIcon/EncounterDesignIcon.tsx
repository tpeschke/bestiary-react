import './EncounterDesignIcon.css'
import { Link } from 'react-router-dom'
import Icon from '../../icon/Icon'
import { useSelector } from 'react-redux'
import { getSystemPreference } from '../../../redux/slices/userSlice'
import { BONFIRE } from '@bestiary/common/utilities/get/getSystemString'

export default function EncounterDesignIcon() {
    const systemPreference = useSelector(getSystemPreference) as 0 | 1 | 2 | undefined
    
    return (
        <div className='encounter-design-icon'>
            <button className='transparent-white'>
                <Icon iconName='brush-hammer' color='white' iconSize='h2' />
            </button>

            <ul className='encounter-options-dropdown'>
                <p>Encounter Building Guidelines</p>
                <Link to="/encounters/confrontations">
                    <li><Icon iconName='theater-masks' margin='right' /> {systemPreference === BONFIRE ? 'Confrontations' : 'Social Encounters'}</li>
                </Link>
                <Link to="/encounters/combats">
                    <li><Icon iconName='crossed-swords' margin='right' /> Combats</li>
                </Link>
                <Link to="/encounters/challenges">
                    <li><Icon iconName='brains' margin='right' /> Skill Challenges</li>
                </Link>
            </ul>
        </div>
    )
}