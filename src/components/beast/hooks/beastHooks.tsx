import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { beastURL } from "../../../frontend-config";
import { Beast, PlayerBeast, PlayerSetInfo } from "../interfaces/viewInterfaces";

interface Return {
    beast?: Beast,
    playerBeast?: PlayerBeast,
    playerSetInfo: PlayerSetInfo
}

export default function beastHooks(): Return {
    const [beast, setBeast] = useState<Beast>()
    const [playerBeast, setPlayerBeast] = useState<PlayerBeast>()
    const navigate = useNavigate()

    function setPlayerNotes (value: string ) {
        if (playerBeast) {
            const newPlayerBeast = {...playerBeast, notes: value}
            setPlayerBeast(newPlayerBeast)
        }
    }

    useEffect(() => {
        if (!beast) {
            const beastId = window.location.pathname.split('/')[2]
            axios.get(beastURL + '/' + beastId).then(({ data }) => {
                if (data.generalInfo) {
                    setBeast(data)
                } else {
                    setPlayerBeast(data)
                }
                if (data.color === 'red') {
                    navigate(`/`)
                }
            })
        }
    }, []);

    return { 
        beast,
        playerBeast, 
        playerSetInfo: {
            setPlayerNotes
        } }
}