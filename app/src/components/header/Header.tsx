import './Header.css'

import { useSelector } from 'react-redux'
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import SearchOptions from './searchOptions/SearchOptions';
import AppName from './appName/AppName';
import DesktopIcons from './desktopIcons/DesktopIcons';
import PhoneIcons from './phoneIcons/PhoneIcons';

export default function Header() {
    const userIsLoggedIn = useSelector(isUserLoggedOn)

    return (
        <>
            <div className='header-background'>
                <AppName />
                <DesktopIcons userIsLoggedIn={userIsLoggedIn} />
                <PhoneIcons userIsLoggedIn={userIsLoggedIn} />
            </div>
            <SearchOptions />
        </>
    )
}
