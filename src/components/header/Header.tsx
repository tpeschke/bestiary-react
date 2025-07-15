import './Header.css'
import logo from '../../assets/images/BonfireLogo.png'

import { useSelector } from 'react-redux'

import { Link } from "react-router-dom";
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import SearchOptions from './searchOptions/SearchOptions';
import Icon from '../icon/Icon';

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
                    <Icon iconName='log-out' tooltip='Log Out' color='white' iconSize='h1' />
                    :
                    <Icon iconName='log-in' tooltip='Log In' color='white' iconSize='h1' />
                }
            </div>
            <SearchOptions />
        </>
    )
}
