import { Link } from "react-router-dom";
import { signInURL } from "../../../frontend-config";
import Icon from "../../icon/Icon";
import AccountInfoIcon from "../accountInfo/AccountInfo";
import EncounterDesignIcon from "../encounterDesignIcon/EncounterDesignIcon";

interface Props {
    userIsLoggedIn: boolean
}

export default function DesktopIcons({ userIsLoggedIn }: Props) {
    return (
        <div className='header-nav desktop'>
            <EncounterDesignIcon />
            <Link to="/treasure">
                <button className='transparent-white' data-tooltip-id="my-tooltip" data-tooltip-content='Treasure Hoards'>
                    <Icon iconName='treasure' color='white' iconSize='h2' />
                </button>
            </Link>
            {userIsLoggedIn ?
                <AccountInfoIcon />
                :
                <a href={signInURL}>
                    <button className='transparent-white' data-tooltip-id="my-tooltip" data-tooltip-content='Log In'>
                        <Icon iconName='log-in' color='white' iconSize='h2' />
                    </button>
                </a>
            }
        </div>
    )
}