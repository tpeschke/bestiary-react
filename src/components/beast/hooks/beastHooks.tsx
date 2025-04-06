import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { beastURL } from "../../../frontend-config";
import PlayerBeastClass from "../models/PlayerBeastClass";
import GMBeastClass from "../models/GMBeastClass";

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