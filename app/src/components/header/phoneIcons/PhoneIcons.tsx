import { Link } from "react-router-dom";
import { accessURL, signInURL, signOutURL } from "../../../frontend-config";
import Icon from "../../icon/Icon";
import AccountInfoIcon from "../accountInfo/AccountInfo";
import EncounterDesignIcon from "../encounterDesignIcon/EncounterDesignIcon";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getSystemPreference, getUserPatreon, updateSystemPreference } from "../../../redux/slices/userSlice";

interface Props {
    userIsLoggedIn: boolean
}

export default function PhoneIcons({ userIsLoggedIn }: Props) {
    const systemPreference = useSelector(getSystemPreference)
    const accessLevel = useSelector(getUserPatreon)
    const dispatch = useDispatch()

    const setSystemPreference = (preference: 0 | 1 | 2) => {
        axios.post(accessURL + '/updatePreference/' + preference).then(_ => {
            dispatch(updateSystemPreference(preference))
        })
    }

    return (
        <div className='header-nav mobile'>
            <div className='account-info-icon'>
                <button className='transparent-white'>
                    <Icon iconName='hamburger' color='white' iconSize='h1' />
                </button>

                <ul className='account-options-dropdown'>
                    <p>Encounter Building Guidelines</p>
                    <li>
                        <Link to="/encounters/confrontations">
                            <Icon iconName='theater-masks' margin='right' /> Confrontations
                        </Link>
                    </li>
                    <li>
                        <Link to="/encounters/combats">
                            <Icon iconName='crossed-swords' margin='right' /> Combats
                        </Link>
                    </li>
                    <li>
                        <Link to="/encounters/challenges">
                            <Icon iconName='brains' margin='right' /> Challenges
                        </Link>
                    </li>
                    <li className='top-border'>
                        <Link to="/treasure">
                            <Icon iconName='treasure' margin='right' /> Treasure Hoards
                        </Link>
                    </li>
                    <p>Kofi Subscription</p>
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
                    {userIsLoggedIn ?
                        <li className='top-border'>
                            <a href={signOutURL}>
                                <Icon iconName='log-out' margin='right' /> Log Out
                            </a>
                        </li>
                        :
                        <li className='top-border'>
                            <a href={signInURL}>
                                <Icon iconName='log-in' margin='right' /> Log In
                            </a>
                        </li>
                    }

                </ul>
            </div>
            {/* <EncounterDesignIcon />
            
            {userIsLoggedIn ?
                <AccountInfoIcon />
                :
                <a href={signInURL}>
                    <button className='transparent-white' data-tooltip-id="my-tooltip" data-tooltip-content='Log In'>
                        <Icon iconName='log-in' color='white' iconSize='h2' />
                    </button>
                </a>
            } */}
        </div>
    )
}