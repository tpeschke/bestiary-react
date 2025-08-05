import { useState } from "react";
import axios from "axios";
import { lootURL } from "../../../../../../../../../../../../frontend-config";
import alertInfo from "../../../../../../../../../../../../components/alert/alerts";
export default function LootHooks() {
    const [carriedLoot, setCarriedLoot] = useState(null);
    const [lairLoot, setLairLoot] = useState(null);
    const [timesToRoll, setTimesToRoll] = useState(1);
    async function generateLoot(carriedLoot, lairLoot, maxPoints, timesToRollParam = 1) {
        return axios.post(lootURL, { loot: { carriedLoot, lairLoot }, maxPoints, timesToRoll: timesToRollParam }).then(({ data }) => {
            if (data.type === 'message') {
                alertInfo(data);
            }
            else if (data.type === 'data') {
                const { carriedLoot, lairLoot } = data;
                setCarriedLoot(carriedLoot);
                setLairLoot(lairLoot);
            }
            return true;
        });
    }
    return {
        carriedLoot,
        lairLoot,
        generateLoot,
        timesToRoll,
        setTimesToRoll
    };
}
