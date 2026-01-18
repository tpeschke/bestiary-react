import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

import { Encounter } from "../interfaces/EncounterInterfaces";
import alertInfo from "../../../../../../../../../../../components/alert/alerts";
import { encounterURL } from "../../../../../../../../../../../frontend-config";

interface Return {
    encounterInfo: Encounter | null,
    generateEncounter: Function
}

export default function encounterHooks(): Return {
    const [encounterInfo, setEncounterInfo] = useState<Encounter | null>(null)

    const { beastId } = useParams()

    useEffect(() => {
        if (!encounterInfo) {
            generateEncounter()
        }
    }, [beastId]);

    async function generateEncounter() {
        axios.get(encounterURL + beastId).then(({ data }: any) => {
            if (data.color === 'red') {
                alertInfo(data)
            } else {
                setEncounterInfo(data)
            }
        })
    }

    return {
        encounterInfo,
        generateEncounter
    }
}