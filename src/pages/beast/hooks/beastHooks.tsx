import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import PlayerBeastClass from "../models/PlayerBeastClass";
import GMBeastClass from "../models/GMBeastClass";

import { beastURL } from "../../../frontend-config";
import alertInfo from "../../../components/alert/alerts";

import { cacheMonster, getBeastCache } from "../../../redux/slices/beastCacheSlice";

interface Return {
    beast?: GMBeastClass,
    playerBeast?: PlayerBeastClass
}

export default function beastHooks(): Return {
    const [beast, setBeast] = useState<GMBeastClass>()
    const [playerBeast, setPlayerBeast] = useState<PlayerBeastClass>()

    const { beastId } = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const beastCache = useSelector(getBeastCache)

    useEffect(() => {
        if (beastId) {
            const beast: null | GMBeastClass = beastCache[beastId]
            if (beast) {
                setBeast(beast)
            } else {
                axios.get(beastURL + '/' + beastId).then(({ data }) => {
                    if (data.generalInfo) {
                        setBeast(new GMBeastClass(data))
                        dispatch(cacheMonster(data))
                    } else {
                        setPlayerBeast(new PlayerBeastClass(data))
                    }
                    if (data.color === 'red') {
                        alertInfo(data)
                        navigate(`/`)
                    }
                })
            }
        }
    }, [beastId]);

    return {
        beast,
        playerBeast
    }
}