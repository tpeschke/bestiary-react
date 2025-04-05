import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { beastURL } from "../../../frontend-config";

export default function beastHooks() {
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

    return { beast, useBeast }
}