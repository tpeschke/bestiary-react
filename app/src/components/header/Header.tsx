import './Header.css'

import { useSelector } from 'react-redux'

import { Link } from "react-router-dom";
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import SearchOptions from './searchOptions/SearchOptions';
import Icon from '../icon/Icon';
import { signInURL, signOutURL } from '../../frontend-config';
import EncounterDesignIcon from './encounterDesignIcon/EncounterDesignIcon';
import AppName from './appName/AppName';

export default function Header() {
    const userIsLoggedIn = useSelector(isUserLoggedOn)

    return (
        <>
            <div className='header-background'>
                <AppName />
                <div className='header-nav'>
                    <EncounterDesignIcon />
                    <Link to="/treasure">
                        <button className='transparent-white' data-tooltip-id="my-tooltip" data-tooltip-content='Treasure Hoards'>
                            <Icon iconName='treasure' color='white' iconSize='h2' />
                        </button>
                    </Link>
                    {userIsLoggedIn ?
                        <a href={signOutURL}>
                            <button className='transparent-white' data-tooltip-id="my-tooltip" data-tooltip-content='Log Out'>
                                <Icon iconName='log-out' color='white' iconSize='h2' />
                            </button>
                        </a>
                        :
                        <a href={signInURL}>
                            <button className='transparent-white' data-tooltip-id="my-tooltip" data-tooltip-content='Log In'>
                                <Icon iconName='log-in' color='white' iconSize='h2' />
                            </button>
                        </a>
                    }
                </div>
            </div>
            <SearchOptions />
        </>
    )
}
