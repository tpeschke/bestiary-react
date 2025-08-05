import './Header.css'
import logo from '../../assets/images/BonfireLogo.png'

import { useSelector } from 'react-redux'

import { Link } from "react-router-dom";
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import SearchOptions from './searchOptions/SearchOptions';
import Icon from '../icon/Icon';
import { signInURL, signOutURL } from '../../frontend-config';

export default function Header() {
    const userIsLoggedIn = useSelector(isUserLoggedOn)

    return (
        <>
            <div className='header-background'>
                <Link to="/">
                    <img src={logo} />
                    <h1>Bonfire Bestiary</h1>
                </Link>
                {userIsLoggedIn ?
                    <a href={signOutURL}>
                        <button className='transparent-white'>
                            <Icon iconName='log-out' color='white' margin='right' />
                            Log Out
                        </button>
                    </a>
                    :
                    <a href={signInURL}>
                        <button className='transparent-white'>
                            <Icon iconName='log-in' color='white' margin='right' />
                            Log In
                        </button>
                    </a>
                }
            </div>
            <SearchOptions />
        </>
    )
}
