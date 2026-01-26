import { Link, useLocation } from "react-router-dom";
import logo from '../../../assets/images/BonfireLogo.png'
import Icon from "../../icon/Icon";

export default function AppName() {
    const location = useLocation();

    const isObstacleIndex = location.pathname.substring(1, 10) === "obstacles"

    return (
        <div className="app-name-component">
            <Link to={isObstacleIndex ? "/obstacles" : "/"}>
                <img src={logo} />
                <h1>Bonfire {isObstacleIndex ? 'Obstacle Index' : 'Bestiary'}</h1>
            </Link>

            <Link to={isObstacleIndex ? "/" : "/obstacles"}>
                <button className='transparent-white' data-tooltip-id="my-tooltip" data-tooltip-content={isObstacleIndex ? 'Bestiary' : 'Obstacle Index'}>
                    <Icon iconName={isObstacleIndex ? 'monster' : 'book'} color='white' iconSize='h2' />
                </button>
            </Link>

            {isObstacleIndex && (
                <Link to={"/obstacles/edit/0"}>
                    <button className='transparent-white' data-tooltip-id="my-tooltip" data-tooltip-content='Add Obstacle'>
                        <Icon iconName='plus' color='white' iconSize='h2' />
                    </button>
                </Link>
            )}
        </div>
    )
}