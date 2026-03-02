import { ObstacleTile } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import alertInfo from "../../../../../components/alert/alerts"
import Icon from "../../../../../components/icon/Icon"
import { obstacleSingleURL, challengeSingleURL } from "../../../../../frontend-config"
import { isOwner, getUserPatreon } from "../../../../../redux/slices/userSlice"
import obstacleCatalogHook from "../../../hooks/obstacleCatalogHook"

interface TileProps {
    tile: ObstacleTile
}

export default function ResultTile({ tile }: TileProps) {
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
                    <button>
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
        <Link to={`/obstacles/challenge/${challengeid}`} onMouseEnter={_ => prefetchChallenge(challengeid)}>
            <button className="blue" disabled={userPatreon < 5}>
                <Icon iconName="chart" color="white" margin='right' />
                {name}
            </button>
        </Link>
    )
}