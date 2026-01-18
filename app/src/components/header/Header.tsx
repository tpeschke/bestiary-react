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
                        <button className='transparent-white'>
                            <Icon iconName='treasure' color='white' tooltip='Treasure Hoards' iconSize='h2' />
                        </button>
                    </Link>
                    {userIsLoggedIn ?
                        <a href={signOutURL}>
                            <button className='transparent-white'>
                                <Icon iconName='log-out' color='white' tooltip='Log Out' iconSize='h2' />
                            </button>
                        </a>
                        :
                        <a href={signInURL}>
                            <button className='transparent-white'>
                                <Icon iconName='log-in' color='white' tooltip='Log In' iconSize='h2' />
                            </button>
                        </a>
                    }
                </div>
            </div>
            <SearchOptions />
        </>
    )
}
