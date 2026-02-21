import { ObstacleTile } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import Icon from "../../../../../../components/icon/Icon"
import { Link } from "react-router-dom"
import alertInfo from "../../../../../../components/alert/alerts"
import { useSelector } from "react-redux"
import { getUserPatreon, isOwner } from "../../../../../../redux/slices/userSlice"

interface TileProps {
    tile: ObstacleTile
}

export default function Tile({ tile }: TileProps) {
    const userIsOwner = useSelector(isOwner)
    const userPatreon = useSelector(getUserPatreon)

    const { obstacleid, challengeid, name } = tile

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
            <div className="obstacle-tile">
                <Link to={`/obstacles/${obstacleid}`}>
                    <button>
                        {name}
                    </button>
                </Link>
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