import { ObstacleTile } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import Icon from "../../../../../../components/icon/Icon"
import { Link } from "react-router-dom"
import alertInfo from "../../../../../../components/alert/alerts"
import { useSelector } from "react-redux"
import { getUserPatreon, isOwner } from "../../../../../../redux/slices/userSlice"
import axios from "axios"
import { challengeSingleURL, obstacleSingleURL } from "../../../../../../frontend-config"
import obstacleCatalogHook from "../../../../hooks/obstacleCatalogHook"

interface TileProps {
    tile: ObstacleTile
}

export default function Tile({ tile }: TileProps) {
    const { saveToCache, saveChallengeToCache } = obstacleCatalogHook()
    const userIsOwner = useSelector(isOwner)
    const userPatreon = useSelector(getUserPatreon)

    const { obstacleid, challengeid, name } = tile

    const prefetchObstacle = (obstacleId: number) => {
        axios.get(obstacleSingleURL + obstacleId).then(({ data }) => {
            if (data.message) {
                alertInfo(data)
            } else {
                saveToCache(data)
            }
        })
    }

    const prefetchChallenge = (challengeId: number | null) => {
        if (challengeId) {
            axios.get(challengeSingleURL + challengeId).then(({ data }) => {
                if (data.message) {
                    alertInfo(data)
                } else {
                    saveChallengeToCache(data)
                }
            })
        }
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
            <div className="obstacle-tile">
                <Link to={`/obstacles/${obstacleid}`} onMouseEnter={_ => prefetchObstacle(obstacleid)}>
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
        <Link to={`/obstacles/challenge/${challengeid}`} onMouseEnter={_ => prefetchChallenge(challengeid)}>
            <button className="blue" disabled={userPatreon < 5}>
                <Icon iconName="chart" color="white" margin='right' />
                {name}
            </button>
        </Link>
    )
}