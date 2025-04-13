import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import PlayerBeastClass from "../models/PlayerBeastClass";
import GMBeastClass from "../models/GMBeastClass";

import { beastURL } from "../../../frontend-config";
import alertInfo from "../../../components/alert/alerts";

interface Return {
    beast?: GMBeastClass,
    playerBeast?: PlayerBeastClass
}

export default function beastHooks(): Return {
    const [beast, setBeast] = useState<GMBeastClass>()
    const [playerBeast, setPlayerBeast] = useState<PlayerBeastClass>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!beast) {
            const beastId = window.location.pathname.split('/')[2]
            axios.get(beastURL + '/' + beastId).then(({ data }) => {
                if (data.generalInfo) {
                    setBeast(new GMBeastClass(data))
                } else {
                    setPlayerBeast(new PlayerBeastClass(data))
                }
                if (data.color === 'red') {
                    alertInfo(data)
                    navigate(`/`)
                }
            })
        }
    }, []);

    return {
        beast,
        playerBeast
    }
}