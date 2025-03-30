import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { beastURL } from "../../frontend-config";

import PlayerView from "./playerView";
import GMView from "./gmView";

export default function View() {
    const [beast, useBeast] = useState<any>()
    const navigate = useNavigate()

    useEffect(() => {
        if (!beast) {
            const beastId = window.location.pathname.split('/')[2]
            axios.get(beastURL + '/' + beastId).then(({ data }) => {
                useBeast(data)
                if (data.color === 'red') {
                    navigate(`/`)
                }
            })
        }
    }, []);

    return (
        (beast ?
            <div className='card-background'>
                {beast && beast.notes ?
                    <PlayerView beast={beast} />
                    :
                    <GMView beast={beast} />
                }
            </div>
            :
            <div>
                LOADING
            </div>)
    )
}
