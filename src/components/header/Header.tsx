import './Header.css'

import { useSelector } from 'react-redux'

import { Link } from "react-router-dom";
import { isUserLoggedOn } from '../../redux/slices/userSlice';
import SearchOptions from './components/searchOptions/searchOptions';

export default function Header() {
    const userIsLoggedIn = useSelector(isUserLoggedOn)

    return (
        <>
            <div className='header-background'>
                <Link to="/"><h1>Bonfire Bestiary</h1></Link>
                {userIsLoggedIn ?
                    <p>Logged In</p>
                    :
                    <p>Logged Out</p>
                }
            </div>
            <SearchOptions />
        </>
    )
}
