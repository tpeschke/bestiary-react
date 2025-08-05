import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import alertInfo from "../../../../../../../../../../components/alert/alerts";
import { encounterURL } from "../../../../../../../../../../frontend-config";
export default function encounterHooks() {
    const [encounterInfo, setEncounterInfo] = useState(null);
    const { beastId } = useParams();
    useEffect(() => {
        if (!encounterInfo) {
            generateEncounter();
        }
    }, [beastId]);
    async function generateEncounter() {
        axios.get(encounterURL + beastId).then(({ data }) => {
            if (data.color === 'red') {
                alertInfo(data);
            }
            else {
                setEncounterInfo(data);
            }
        });
    }
    return {
        encounterInfo,
        generateEncounter
    };
}
