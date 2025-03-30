import './Header.css'

import { Link } from "react-router-dom";

export default function Header() {
    return (
        <div className='header-background'>
            <Link to="/"><h1>Bonfire Bestiary</h1></Link>
        </div>
    )
}
