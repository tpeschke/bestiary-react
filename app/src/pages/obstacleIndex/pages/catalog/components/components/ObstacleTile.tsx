import { ObstacleTile } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import axios from "axios"
import Icon from "../../../../../../components/icon/Icon"
import { obstacleSingleURL } from "../../../../../../frontend-config"
import { Link } from "react-router-dom"
import alertInfo from "../../../../../../components/alert/alerts"
import { useSelector } from "react-redux"
import { getUserPatreon, isOwner } from "../../../../../../redux/slices/userSlice"

interface TileProps {
    tile: ObstacleTile,
    setObstacleToDisplay: Function
}

export default function Tile({ tile, setObstacleToDisplay }: TileProps) {
    const userIsOwner = useSelector(isOwner)
    const userPatreon = useSelector(getUserPatreon)

    const { obstacleid, challengeid, name } = tile

    const setObstacle = () => {
        setObstacleToDisplay(axios.get(obstacleSingleURL + obstacleid).then(({ data }) => {
            if (data.message) {
                alertInfo(data)
                return null
            } else {
                return data
            }
        }))
    }

    const copyQuickLink = () => {
        let textArea = getTextArea()
        const url = getURL()

        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            alertInfo({ color: "green", message: `"${name}" shortcut successfully copied`, type: 'message' })
        } catch (err) {
            alertInfo({ color: "red", message: `Unable to copy "${name}" shortcut`, type: 'message' })
        }
        document.body.removeChild(textArea);
    }

    const getTextArea = () => {
        let textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = '0';
        textArea.style.left = '0';

        return textArea
    }

    const getURL = () => {
        const { origin, pathname } = window.location
        return `${origin}${pathname}/${obstacleid}`
    }

    if (obstacleid && userPatreon < 5) {
        return (
            <div className="obstacle-tile">
                <button disabled={true}>
                    {name}
                </button>
            </div>
        )
    } else if (obstacleid) {
        return (
            <div className="obstacle-tile" onMouseEnter={_ => setObstacle()} data-tooltip-id="catalog-obstacle-tooltip">
                <button onClick={_ => copyQuickLink()}>
                    {name}
                </button>
                {userIsOwner && (
                    <Link to={`edit/${obstacleid}`}>
                        <button><Icon iconName="edit" /></button>
                    </Link>
                )}
            </div>
        )
    }

    return (
        <Link to={`/obstacles/challenge/${challengeid}`}>
            <button className="blue" disabled={userPatreon < 5}>
                <Icon iconName="chart" color="white" margin='right' />
                {name}
            </button>
        </Link>
    )
}