import './AccountInfo.css'
import Icon from '../../icon/Icon'
import { accessURL, signOutURL } from '../../../frontend-config'
import { useDispatch, useSelector } from 'react-redux'
import { getSystemPreference, getUserPatreon, updateSystemPreference } from '../../../redux/slices/userSlice'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AccountInfoIcon() {
    const systemPreference = useSelector(getSystemPreference)
    const accessLevel = useSelector(getUserPatreon)
    const dispatch = useDispatch()

    const setSystemPreference = (preference: 0 | 1 | 2) => {
        axios.post(accessURL + '/updatePreference/' + preference).then(_ => {
            dispatch(updateSystemPreference(preference))
        })
    }

    return (
        <div className='account-info-icon'>
            <button className='transparent-white'>
                <Icon iconName='user' color='white' iconSize='h2' />
            </button>

            <ul className='account-options-dropdown'>
                <li>
                    <Link to={'https://ko-fi.com/bonfirebestiary'} target='_blank'>
                        <Icon iconName='Ko-fi' margin='right' /> {accessLevel}
                    </Link>
                </li>
                <p>System Preference</p>
                <li onClick={_ => setSystemPreference(1)}>{systemPreference === 1 && <Icon iconName='check' margin='right' />} 5.5e</li>
                <li onClick={_ => setSystemPreference(2)}>{systemPreference === 2 && <Icon iconName='check' margin='right' />} HackMaster</li>
                <li onClick={_ => setSystemPreference(0)}>{systemPreference === 0 && <Icon iconName='check' margin='right' />} Bonfire</li>
                <li className='top-border'>
                    <a href="https://discord.gg/gpzyunjGnr">
                        <Icon iconName='Discord' margin='right' /> Bestiary Discord
                    </a>
                </li>
                <li className='top-border'>
                    <a href={signOutURL}>
                        <Icon iconName='log-out' margin='right' /> Log Out
                    </a>
                </li>
            </ul>
        </div>
    )
}